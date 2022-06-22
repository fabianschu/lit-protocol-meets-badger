import { useEffect, useState, useContext } from "react";
import { ethers, BigNumber } from "ethers";
import { Web3Context } from "../context/Web3Context";
import badgerArtifact from "../contracts/badger";

const Balances = () => {
  const [firstBalance, setFirstBalance] = useState(0);
  const [secondBalance, setSecondBalance] = useState(0);

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
      setFirstBalance(b1.toString());
      setSecondBalance(b2.toString());
    }
  }, [address]);

  return (
    <div>
      <h1>Token balances:</h1>
      <div>
        <span>Balance for tokenId = 1: </span>
        <span>{firstBalance}</span>
      </div>
      <div>
        <span>Balance for tokenId = 2: </span>
        <span>{secondBalance}</span>
      </div>
    </div>
  );
};

export default Balances;
