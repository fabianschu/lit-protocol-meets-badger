import { ethers } from "ethers";
import { useState, useContext, useEffect } from "react";
import LitJsSdk from "lit-js-sdk";
import {
  encrypt,
  decrypt,
  monetaryDelegateBadgeId,
  vetoDelegateBadgeId,
} from "../services/litProtocol";
import { Web3Context } from "../context/Web3Context";
import badgerContract from "../contracts/badger";

const Functions = () => {
  const [fn, setFn] = useState("");
  const { state } = useContext(Web3Context);
  const { web3Provider, address } = state;

  useEffect(async () => {
    const client = new LitJsSdk.LitNodeClient();
    await client.connect();
    window.litNodeClient = client;
  }, []);

  const { abi } = badgerContract;
  const writeFunctions = abi.filter(
    (fn) =>
      fn.stateMutability !== "view" &&
      !["constructor", "event", "error"].includes(fn.type)
  );

  const blobToBase64 = (blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        resolve(reader.result);
      };
    });
  };

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

  const handleSubmit = async (e) => {
    // TODO: pull salt from delay
    const salt = 11;

    // initialize contract
    const instance = new ethers.Contract(
      badgerContract.address,
      badgerContract.abi,
      web3Provider
    );

    // populate transaction
    const inputParams = fn.inputs.map((i) => i.value);
    const popoulatedTransaction = await instance.populateTransaction[fn.name](
      ...inputParams
    );

    // create hash for function proposal
    const hash = ethers.utils.solidityKeccak256(
      ["address", "uint256", "bytes", "uint8", "uint256"],
      [popoulatedTransaction.to, 0, popoulatedTransaction.data, 0, salt]
    );

    // assemble object for encryption
    const txDescription = {
      targetContract: badgerContract.address,
      targetFunction: fn.name,
      inputParams: fn.inputs,
      hashParams: {
        data: popoulatedTransaction.data,
        salt,
        to: popoulatedTransaction.to,
        operation: 0,
        value: 0,
      },
    };

    // create json string that contains encrypted data
    const encrypted = await encrypt(JSON.stringify(txDescription));
    const b64 = await blobToBase64(encrypted.encryptedString);
    encrypted.encryptedString = b64;
    const jsonString = JSON.stringify(encrypted);

    // decrypt (just for testing)
    const parsed = JSON.parse(jsonString);
    const blob = await fetch(parsed.encryptedString).then((res) => res.blob());
    parsed.encryptedString = blob;
    const decrypted = await decrypt(
      parsed.encryptedString,
      parsed.encryptedSymmetricKey
    );
    console.log("decrypted: ", decrypted.decryptedString);
  };

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
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Functions;
