import { useEffect, useState, useContext } from "react";
import { ethers, BigNumber } from "ethers";
import { Web3Context } from "../context/Web3Context";
import badgerArtifact from "../contracts/badger";

const Balances = (props) => {
  const { mdBalance, setMdBalance, vdBalance, setVdBalance } = props;
  const [thirdBalance, setThirdBalance] = useState(0);

  const { state } = useContext(Web3Context);
  const { web3Provider, address } = state;

  useEffect(async () => {
    const badger = new ethers.Contract(
      badgerArtifact.address,
      badgerArtifact.abi,
      web3Provider
    );
    if (address) {
      const b1 = await badger.balanceOf(address, 1);
      const b2 = await badger.balanceOf(address, 2);
      const b3 = await badger.balanceOf(address, 3);
      setMdBalance(b1.toString());
      setVdBalance(b2.toString());
      setThirdBalance(b3.toString());
    }
  }, [address]);

  return (
    <div>
      <h1>Token balances:</h1>
      <table>
        <tbody>
          <tr>
            <td>Monetary Delegate Badges (tokenId = 1)</td>
            <td>{mdBalance}</td>
          </tr>
          <tr>
            <td>
              Monetary Multisig Members Badge / Veto Delegate (tokenId = 2)
            </td>
            <td>{vdBalance}</td>
          </tr>
          <tr>
            <td>Random badge (tokenId = 3)</td>
            <td>{thirdBalance}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Balances;
