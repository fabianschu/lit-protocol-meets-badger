import axios from "axios";
import { useEffect, useState, useContext } from "react";
import LitJsSdk from "lit-js-sdk";
import { decrypt } from "../services/litProtocol";
import { ethers } from "ethers";
import { Web3Context } from "../context/Web3Context";
import Functions from "./Functions";
import Transactions from "./Transactions";
import secretDelayArtifact from "../contracts/secretDelay";
import { verifyPayload } from "../lib/utilities";

const Governance = (props) => {
  const { mdBalance, vdBalance } = props;
  const [fn, setFn] = useState("");
  const [status, setStatus] = useState("");
  const [litAuth, setLitAuth] = useState();
  const [transactions, setTransactions] = useState([]);
  const { state } = useContext(Web3Context);
  const { web3Provider, address } = state;

  useEffect(async () => {
    if (!web3Provider) return;
    setLitAuth();

    // connect to lit
    const client = new LitJsSdk.LitNodeClient();
    await client.connect();
    window.litNodeClient = client;

    // prompt user to sign message to be able to decrypt messages
    const authSig = await LitJsSdk.checkAndSignAuthMessage({
      chain: "rinkeby",
    });
    setLitAuth(authSig);
  }, [address]);

  const getTransactions = async () => {
    const secretDelay = new ethers.Contract(
      secretDelayArtifact.address,
      secretDelayArtifact.abi,
      web3Provider
    );
    const filteredEvents = await secretDelay.queryFilter(
      "SecretTransactionAdded"
    );

    const transactions = await Promise.all(
      filteredEvents.map(async (e) => {
        const { timestamp } = await e.getBlock();
        const parsedTime = new Date(timestamp * 1000).toLocaleString();

        try {
          // get json from ipfs
          const { data } = await axios.get(
            `https://gateway.pinata.cloud/ipfs/${e.args.uri}`
          );
          // convert base64 to blob
          const blob = await fetch(data.encryptedString).then((res) => {
            return res.blob();
          });
          // decrypt json using lit protocol
          const { decryptedString } = await decrypt(
            blob,
            data.encryptedSymmetricKey,
            litAuth
          );
          const ipfsContent = JSON.parse(decryptedString);

          const { hashParams } = ipfsContent;

          return {
            transactionHash: e.transactionHash,
            ipfsHash: e.args.uri,
            secretHash: e.args.txHash,
            queueNonce: e.args.queueNonce.add(1),
            verified: verifyPayload(
              ipfsContent.targetContract,
              ipfsContent.targetFunction,
              ipfsContent.inputParams,
              hashParams,
              e.args.txHash
            ),
            ipfsContent,
            timestamp: parsedTime,
            targetFunction: ipfsContent.targetFunction,
            params: ipfsContent.inputParams || [],
          };
        } catch (err) {
          console.log(err);
          return {
            transactionHash: e.transactionHash,
            queueNonce: e.args.queueNonce.add(1),
            secretHash: e.args.txHash,
            ipfsHash: e.args.uri,
            verified: false,
            ipfsContent: "error",
            timestamp: parsedTime,
            params: [],
          };
        }
      })
    );

    setTransactions(transactions);
  };

  if (!litAuth) {
    return <p>connecting to lit..</p>;
  }

  return (
    <div>
      <h1>Governance</h1>
      <Functions
        fn={fn}
        setFn={setFn}
        status={status}
        setStatus={setStatus}
        transactions={transactions}
        getTransactions={getTransactions}
        mdBalance={mdBalance}
      />
      <Transactions
        fn={fn}
        setFn={setFn}
        status={status}
        setStatus={setStatus}
        litAuth={litAuth}
        transactions={transactions}
        getTransactions={getTransactions}
        mdBalance={mdBalance}
        vdBalance={vdBalance}
      />
    </div>
  );
};

export default Governance;
