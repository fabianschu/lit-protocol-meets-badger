import { ethers } from "ethers";
import { useContext } from "react";
import { encrypt, monetaryDelegateBadgeId } from "../services/litProtocol";
import { Web3Context } from "../context/Web3Context";
import testContract from "../contracts/testContract";
import secretDelayArtifact from "../contracts/secretDelay";
import bacArtifact from "../contracts/roles";
import { pinJson } from "../services/pinata";
import { blobToBase64 } from "../lib/utilities";

const Propose = (props) => {
  const { fn, setFn, status, setStatus, getTransactions, mdBalance } = props;
  const { state } = useContext(Web3Context);
  const { web3Provider, address } = state;
  const { abi } = testContract;

  const writeFunctions = abi.filter(
    (fn) =>
      fn.stateMutability !== "view" &&
      !["constructor", "event", "error"].includes(fn.type)
  );

  const handleFunctionChange = (e) => {
    const fn = writeFunctions.find((f) => f.name === e.target.value);
    const withInputValues = fn.inputs.map((i) => ({ ...i, value: "" }));
    fn.inputs = withInputValues;
    setFn(fn);
  };

  const handlePayloadChange = (e) => {
    const copyFn = { ...fn };
    const changeInput = copyFn.inputs.find((i) => i.name === e.target.name);
    changeInput.value = e.target.value;
    setFn(copyFn);
  };

  const handlePropose = async (e) => {
    const signer = web3Provider.getSigner();

    // get instance of Secret Delay
    const secretDelayInstance = new ethers.Contract(
      secretDelayArtifact.address,
      secretDelayArtifact.abi,
      web3Provider
    );

    // get instance of target contract (on which proposal is meant to be executed)
    const testContractInstance = new ethers.Contract(
      testContract.address,
      testContract.abi,
      web3Provider
    );

    // populate target transaction (= transaction that is being proposed or execution)
    const inputParams = fn.inputs.map((i) => i.value);
    const populatedTransaction = await testContractInstance.populateTransaction[
      fn.name
    ](...inputParams);

    // get salt from Secret Delay
    const salt = await secretDelayInstance.salt();

    // create hash for target transaction
    const hash = ethers.utils.solidityKeccak256(
      ["address", "uint256", "bytes", "uint8", "uint256"],
      [
        populatedTransaction.to,
        0, // value = 0 (amount of ETH to be sent in transaction)
        populatedTransaction.data,
        0, // operation = 0 (= call)
        salt,
      ]
    );

    // assemble object that describes the proposed transaction
    const txDescription = {
      targetContract: testContract.address,
      targetFunction: fn.name,
      inputParams: fn.inputs,
      hashParams: {
        data: populatedTransaction.data,
        salt,
        to: populatedTransaction.to,
        operation: 0,
        value: 0,
      },
    };

    // encrypt the transaction description
    const encrypted = await encrypt(JSON.stringify(txDescription)); // returns an object with the encrypted data
    encrypted.encryptedString = await blobToBase64(encrypted.encryptedString); // the encrypted string needs to be converted from blob to base64 so that it can be stringified

    // store encrypted transaction description on ipfs
    const ipfsHash = await pinJson(encrypted);

    // populate the transaction through which the target transaction will be proposed
    const payload =
      await secretDelayInstance.populateTransaction.enqueueSecretTx(
        hash, // hash of target transaction
        ipfsHash // ipfs hash that was returned when uploading the data
      );

    // get instance of BAC contract
    const bacInstance = new ethers.Contract(
      bacArtifact.address,
      bacArtifact.abi,
      web3Provider
    );

    // make transaction to BAC contract:
    // the idea here is that this transaction goes to the BAC module
    // ..which checks if the caller has permission to enqueue a proposal on the Secret Delay (via checking badge)
    // ..then enqueues the proposal that is defined by the data parameter on the Secret Delay using the Safe as msg.sender
    const tx = await bacInstance
      .connect(signer)
      .execTransactionFromModule(
        secretDelayInstance.address,
        0,
        payload.data,
        0,
        monetaryDelegateBadgeId
      );

    setStatus(`waiting for blockchain, tx hash: ${tx.hash}`);
    await tx.wait();
    setStatus("tx processed..");

    // get updated list of proposals
    await getTransactions();
  };

  const handleExecute = (e) => {};

  return (
    <div>
      <h2>Propose:</h2>
      {mdBalance > 0 ? (
        <>
          <div>
            <label>
              Available Functions:{" "}
              <select onChange={handleFunctionChange} value={fn.name}>
                <option disabled={true} value="">
                  -- Choose function --
                </option>
                {writeFunctions.map((fn) => (
                  <option value={fn.name} key={fn.name}>
                    {fn.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {fn && (
            <div>
              <h2>Inputs:</h2>
              {fn.inputs.map((i, idx) => {
                return (
                  <label key={idx}>
                    {i.name}:{" "}
                    <input
                      onChange={handlePayloadChange}
                      value={i.value}
                      name={i.name}
                    />
                    <br />
                  </label>
                );
              })}
              <button onClick={handlePropose}>Propose tx</button>
              <p>
                <strong>{status}</strong>
              </p>
              {status === "tx processed.." && (
                <button onClick={handleExecute}>Execute tx</button>
              )}
            </div>
          )}
        </>
      ) : (
        <p>You don't hold a Monetary Delegate badge</p>
      )}
    </div>
  );
};

export default Propose;
