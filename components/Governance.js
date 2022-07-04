import { useEffect, useState } from "react";
import LitJsSdk from "lit-js-sdk";
import Functions from "./Functions";
import Transactions from "./Transactions";

const Governance = () => {
  const [fn, setFn] = useState("");
  const [status, setStatus] = useState("");

  useEffect(async () => {
    const client = new LitJsSdk.LitNodeClient();
    await client.connect();
    window.litNodeClient = client;
  }, []);

  return (
    <div>
      <h1>Governance</h1>
      <Functions fn={fn} setFn={setFn} status={status} setStatus={setStatus} />
      <Transactions
        fn={fn}
        setFn={setFn}
        status={status}
        setStatus={setStatus}
      />
    </div>
  );
};

export default Governance;
