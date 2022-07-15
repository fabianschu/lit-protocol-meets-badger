import axios from "axios";
import { useEffect, useState, useContext } from "react";
import LitJsSdk from "lit-js-sdk";
import { decrypt } from "../services/litProtocol";
import { ethers } from "ethers";
import { Web3Context } from "../context/Web3Context";
import Propose from "./Propose";
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

    // store "lit auth signature" in state
    setLitAuth(authSig);
  }, [address]);

  const getTransactions = async () => {
    // get instance of Secret Delay
    const secretDelay = new ethers.Contract(
      secretDelayArtifact.address,
      secretDelayArtifact.abi,
      web3Provider
    );

    // get all events for when a secret proposal was added
    const filteredEvents = await secretDelay.queryFilter(
      "SecretTransactionAdded"
    );

    // create array of human-readable transactions
    const transactions = await Promise.all(
      // for each event...
      filteredEvents.map(async (e) => {
        const { timestamp } = await e.getBlock();
        const parsedTime = new Date(timestamp * 1000).toLocaleString();

        try {
          // ..get encrypted proposal description from ipfs
          const { data } = await axios.get(
            `https://gateway.pinata.cloud/ipfs/${e.args.uri}`
          );
          // convert base64 back to blob (b/c lit can only handle blob)
          const blob = await fetch(data.encryptedString).then((res) => {
            return res.blob();
          });
          // decrypt using lit protocol
          const { decryptedString } = await decrypt(
            blob,
            data.encryptedSymmetricKey,
            litAuth
          );
          // parse string to object
          const ipfsContent = JSON.parse(decryptedString);

          const { hashParams } = ipfsContent;

          return {
            transactionHash: e.transactionHash, // the hash that can be used to find transactions on etherscan
            ipfsHash: e.args.uri, // the ipfs hash that was passed when the proposal was made
            secretHash: e.args.txHash, // the hash that represents the secret content of the transaction
            queueNonce: e.args.queueNonce.add(1), // represents the order in which proposals were made
            verified: verifyPayload(
              // decrypts transaction proposal, hashes it again and compares it against txHash
              ipfsContent.targetContract,
              ipfsContent.targetFunction,
              ipfsContent.inputParams,
              hashParams,
              e.args.txHash
            ),
            ipfsContent, // the complete (decrypted) tx description from ipfs
            timestamp: parsedTime, // time when proposal was made on-chain
            targetFunction: ipfsContent.targetFunction, // name of the target function
            params: ipfsContent.inputParams || [], // params to be passed to target function
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
      <Propose
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
