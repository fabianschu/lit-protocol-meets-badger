import { ethers } from "ethers";
import { useState, useContext, useEffect } from "react";

import {
  encrypt,
  decrypt,
  monetaryDelegateBadgeId,
  vetoDelegateBadgeId,
} from "../services/litProtocol";
import { Web3Context } from "../context/Web3Context";
import testContract from "../contracts/testContract";
import secretDelayArtifact from "../contracts/secretDelay";
import rolesArtifact from "../contracts/roles";
import { pinJson } from "../services/pinata";
import { blobToBase64 } from "../lib/utilities";

const Functions = (props) => {
  const { fn, setFn, status, setStatus, getTransactions } = props;
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
    // TODO: pull salt from delay

    // assemble payload for enqueuing tx
    const secretDelayInstance = new ethers.Contract(
      secretDelayArtifact.address,
      secretDelayArtifact.abi,
      web3Provider
    );

    const salt = await secretDelayInstance.salt();

    // initialize contract
    const testContractInstance = new ethers.Contract(
      testContract.address,
      testContract.abi,
      web3Provider
    );

    // populate transaction
    const inputParams = fn.inputs.map((i) => i.value);
    const populatedTransaction = await testContractInstance.populateTransaction[
      fn.name
    ](...inputParams);

    // create hash for function proposal
    const hash = ethers.utils.solidityKeccak256(
      ["address", "uint256", "bytes", "uint8", "uint256"],
      [populatedTransaction.to, 0, populatedTransaction.data, 0, salt]
    );

    // assemble object for encryption
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

    // create json string that contains encrypted data
    const encrypted = await encrypt(JSON.stringify(txDescription));
    const b64 = await blobToBase64(encrypted.encryptedString);
    encrypted.encryptedString = b64;

    const ipfsHash = await pinJson(encrypted);

    const payload =
      await secretDelayInstance.populateTransaction.enqueueSecretTx(
        hash,
        ipfsHash
      );

    const rolesInstance = new ethers.Contract(
      rolesArtifact.address,
      rolesArtifact.abi,
      web3Provider
    );

    const tx = await rolesInstance
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
    await getTransactions();
  };

  const handleExecute = (e) => {};

  return (
    <div>
      <h2>Functions:</h2>
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
    </div>
  );
};

export default Functions;
