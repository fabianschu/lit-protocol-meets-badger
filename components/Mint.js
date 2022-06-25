import { useEffect, useState, useContext } from "react";
import { ethers, BigNumber } from "ethers";
import { Web3Context } from "../context/Web3Context";
import badgerArtifact from "../contracts/badger";

const Mint = () => {
  const [id, setId] = useState("");
  const [display, setDisplay] = useState([]);
  const { state } = useContext(Web3Context);
  const { web3Provider, address } = state;

  const handleMint = async () => {
    const badger = new ethers.Contract(
      badgerArtifact.address,
      badgerArtifact.abi,
      web3Provider
    );

    const signer = web3Provider.getSigner();

    const tx = await badger.connect(signer).mint(address, id, 1);
    const copyDisplay = [...display];
    copyDisplay.push("tx.hash: " + tx.hash);
    setDisplay(copyDisplay);
  };

  return (
    <div>
      <h2>Mint</h2>
      <label htmlFor="tokenId">tokenId: </label>
      <input
        id="tokenId"
        type="number"
        onChange={(e) => setId(e.target.value)}
        value={id}
      />
      <button onClick={handleMint}>Mint</button>
      {display.length > 0 && display.map((d) => <p>{d}</p>)}
    </div>
  );
};

export default Mint;
