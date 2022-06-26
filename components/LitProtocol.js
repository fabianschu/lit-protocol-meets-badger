import { useState, useEffect } from "react";
import LitJsSdk from "lit-js-sdk";
import {
  encrypt,
  decrypt,
  monetaryDelegateBadgeId,
  vetoDelegateBadgeId,
} from "../services/litProtocol";
import badgerContract from "../contracts/badger";

const LitProtocol = () => {
  const [clearText, setClearText] = useState("");
  const [decryptedStrings, setDecryptedStrings] = useState([]);
  const [encryptedPackages, setEncryptedPackages] = useState([]);

  useEffect(async () => {
    const client = new LitJsSdk.LitNodeClient();
    await client.connect();
    window.litNodeClient = client;
  }, []);

  // instead of storing the encrypted package in the state (which isjust for demonstration purposes)
  // the object would need to  be stored as a JSON on IPFS
  const handleEncrypt = async () => {
    setEncryptedPackages([...encryptedPackages, await encrypt(clearText)]);
  };

  const handleDecrypt = async () => {
    let tmp = [];
    for (let i = 0; i < encryptedPackages.length; i++) {
      const { decryptedString } = await decrypt(
        encryptedPackages[i].encryptedString,
        encryptedPackages[i].encryptedSymmetricKey
      );
      tmp.push(decryptedString);
    }
    setDecryptedStrings(tmp);
  };

  return (
    <div>
      <h1>Lit Protocol</h1>
      <p>
        Encryption via Lit Protocol. decrypting messages is only possible if the
        connected wallet holds either an ERC1155 token with id=
        {monetaryDelegateBadgeId} or id={vetoDelegateBadgeId} on the Badger
        contract (
        <a href="https://rinkeby.etherscan.io/address/0xDfF197357d7239Cc1073ACbe34c24152Eb7aCa37#code">
          {badgerContract.address}
        </a>
        ), or in the minting section above.
      </p>
      <p>
        <strong>Test instructions:</strong>
      </p>
      <p>1. Mint token with id 1 or 2</p>
      <p>
        2. Encrypt a string (or multiple by entering and submitting several
        strings)
      </p>
      <p>3. Click Decrypt and it will show all encrypted strings</p>
      <p>
        4. Switch to a wallet without a token and decrypting will throw an error
      </p>
      <div>
        <h2>Encrypt:</h2>
        <input
          type="text"
          value={clearText}
          onChange={(e) => setClearText(e.target.value)}
        />
        <p>Number of encrypted messages: {encryptedPackages.length}</p>
        <button onClick={handleEncrypt}>Encrypt</button>
      </div>
      <div>
        <h2>Decrypted message:</h2>
        <button onClick={handleDecrypt}>Decrypt</button>
        {decryptedStrings.length > 0 &&
          decryptedStrings.map((d, idx) => <p key={idx}>{d}</p>)}
      </div>
    </div>
  );
};

export default LitProtocol;
