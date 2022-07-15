import { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import LitJsSdk from "lit-js-sdk";
import { Web3Context } from "../context/Web3Context";
import { vetoDelegateBadgeId } from "../services/litProtocol";
import { ellipseAddress } from "../lib/utilities";
import secretDelayArtifact from "../contracts/secretDelay";
import bacArtifact from "../contracts/roles";

const Transactions = (props) => {
  const [txNonce, setTxNonce] = useState();

  const {
    fn,
    setFn,
    status,
    setStatus,
    litAuth,
    transactions,
    getTransactions,
    mdBalance,
    vdBalance,
  } = props;
  const { state } = useContext(Web3Context);
  const { web3Provider } = state;

  const { abi, address } = secretDelayArtifact;

  useEffect(async () => {
    if (!web3Provider) return;

    const secretDelay = new ethers.Contract(address, abi, web3Provider);
    setTxNonce(await secretDelay.txNonce());

    await getTransactions();
  }, [litAuth]);

  const handleExecute = async (e) => {
    // find transaction to be executed from list of available proposals
    const transaction = transactions.find(
      (t) => t.transactionHash === e.target.name
    );

    // get transaction params for that transaction
    const txParams = transaction.ipfsContent.hashParams;

    // get instance of Secret Delay
    const secretDelayInstance = new ethers.Contract(
      secretDelayArtifact.address,
      secretDelayArtifact.abi,
      await web3Provider.getSigner()
    );

    // execute transaction by using the same transaction parameters that were used when transaction was proposed
    const tx = await secretDelayInstance.executeNextSecretTx(
      txParams.to,
      txParams.value,
      txParams.data,
      txParams.operation,
      txParams.salt,
      { gasLimit: 200_000 } // solves some weirdness with metamask failing to correctly estimate gas, could require some more research
    );

    setStatus("waiting for blockchain, tx hash: ", tx.hash);
    await tx.wait();
    setStatus();
    setTxNonce(await secretDelayInstance.txNonce());
    await getTransactions();
  };

  const handleVeto = async (e) => {
    // find transaction to be vetoed from list of available proposals
    const transaction = transactions.find(
      (t) => t.transactionHash === e.target.name
    );

    // get queueNonce of that transaction
    const queueNonce = transaction.queueNonce;

    // get instance of SecretDelay contract
    const secretDelayInstance = new ethers.Contract(
      secretDelayArtifact.address,
      secretDelayArtifact.abi,
      await web3Provider.getSigner()
    );

    // get instance of BAC contract
    const bacInstance = new ethers.Contract(
      bacArtifact.address,
      bacArtifact.abi,
      await web3Provider.getSigner()
    );

    // get data parameter
    // ..which encodes the function `setTxNonce` on the SecretDelay contract
    // ..which is the function that is used for vetoing
    const { data } = await secretDelayInstance.populateTransaction.setTxNonce(
      queueNonce
    );

    // make the transaction to veto the proposal
    // again goes via BAC to check if the caller has permission to veto proposals
    const tx = await bacInstance.execTransactionFromModule(
      secretDelayInstance.address,
      0, // value
      data,
      0, //operation
      vetoDelegateBadgeId,
      { gasLimit: 200_000 } // solves some weirdness with metamask failing to correctly estimate gas, could require some more research
    );

    setStatus(`waiting for blockchain, tx hash: ${tx.hash}`);
    await tx.wait();
    setStatus();
    setTxNonce(await secretDelayInstance.txNonce());
    await getTransactions();
  };

  return (
    <div>
      <h2>History</h2>
      <p>{status}</p>
      {transactions.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Enqueued</th>
              <th>Proposal Time</th>
              <th>Verified</th>
              <th>Function</th>
              <th>Parameters</th>
              <th>Execute</th>
              <th>Veto</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => {
              const {
                queueNonce,
                verified,
                timestamp,
                targetFunction,
                params,
              } = t;

              const outstanding = txNonce < queueNonce;

              return (
                <tr key={t.transactionHash}>
                  <td>{outstanding ? "✅" : "⛔️"}</td>
                  <td>{timestamp}</td>
                  <td>{verified ? "✅" : "⛔️"}</td>
                  <td>{targetFunction || "❓"}</td>
                  <td>
                    {params.length > 0
                      ? params.map((p, idx) => {
                          return (
                            <div key={idx}>
                              <span>{p.name}: </span>
                              <span>{p.value}</span>
                            </div>
                          );
                        })
                      : null}
                  </td>
                  <td>
                    <button
                      disabled={!verified || !outstanding || mdBalance == 0}
                      onClick={handleExecute}
                      name={t.transactionHash}
                    >
                      execute
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={handleVeto}
                      name={t.transactionHash}
                      disabled={!outstanding || vdBalance == 0}
                    >
                      veto
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Transactions;
