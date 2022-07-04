import { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import { Web3Context } from "../context/Web3Context";
import { ellipseAddress } from "../lib/utilities";
import secretDelayArtifact from "../contracts/secretDelay";

const Transactions = (props) => {
  const [events, setEvents] = useState([]);

  const { fn, setFn, status, setStatus } = props;
  const { state } = useContext(Web3Context);
  const { web3Provider } = state;

  const { abi, address } = secretDelayArtifact;

  useEffect(async () => {
    if (!web3Provider) return;

    console.log(web3Provider);
    const secretDelay = new ethers.Contract(address, abi, web3Provider);
    const filteredEvents = await secretDelay.queryFilter(
      "SecretTransactionAdded"
    );
    setEvents(filteredEvents);
  }, [web3Provider]);

  return (
    <div>
      <h2>History</h2>
      <table>
        <tr>
          <th>TX hash</th>
          <th>Execute</th>
          <th>Veto</th>
        </tr>
        {events.length > 0 &&
          events.map((e) => {
            console.log(e);
            return (
              <tr>
                <td>{ellipseAddress(e.transactionHash)}</td>
                <td>Maria Anders</td>
                <td>Germany</td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default Transactions;
