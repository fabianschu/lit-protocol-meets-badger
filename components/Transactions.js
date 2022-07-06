import { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import LitJsSdk from "lit-js-sdk";
import { Web3Context } from "../context/Web3Context";
import { vetoDelegateBadgeId } from "../services/litProtocol";
import { ellipseAddress } from "../lib/utilities";
import secretDelayArtifact from "../contracts/secretDelay";
import rolesArtifact from "../contracts/roles";

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
    const transaction = transactions.find(
      (t) => t.transactionHash === e.target.name
    );
    const txParams = transaction.ipfsContent.hashParams;

    const secretDelayInstance = new ethers.Contract(
      secretDelayArtifact.address,
      secretDelayArtifact.abi,
      await web3Provider.getSigner()
    );

    const tx = await secretDelayInstance.executeNextSecretTx(
      txParams.to,
      txParams.value,
      txParams.data,
      txParams.operation,
      txParams.salt,
      { gasLimit: 200_000 }
    );

    setStatus("waiting for blockchain, tx hash: ", tx.hash);
    await tx.wait();
    setStatus();
    setTxNonce(await secretDelayInstance.txNonce());
    await getTransactions();
  };

  const handleVeto = async (e) => {
    const transaction = transactions.find(
      (t) => t.transactionHash === e.target.name
    );
    const queueNonce = transaction.queueNonce;

    const secretDelayInstance = new ethers.Contract(
      secretDelayArtifact.address,
      secretDelayArtifact.abi,
      await web3Provider.getSigner()
    );
    const rolesInstance = new ethers.Contract(
      rolesArtifact.address,
      rolesArtifact.abi,
      await web3Provider.getSigner()
    );

    const { data } = await secretDelayInstance.populateTransaction.setTxNonce(
      queueNonce
    );
    const tx = await rolesInstance.execTransactionFromModule(
      secretDelayInstance.address,
      0,
      data,
      0,
      vetoDelegateBadgeId,
      { gasLimit: 200_000 }
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
