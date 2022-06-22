import { useState, useEffect } from "react";
import LitJsSdk from "lit-js-sdk";
import {
  encrypt,
  decrypt,
  monetaryDelegateBadgeId,
  vetoDelegateBadgeId,
  badgerAddress,
} from "../services/litProtocol";

const LitProtocol = () => {
  const [clearText, setClearText] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [lit, setLit] = useState({});

  useEffect(async () => {
    const client = new LitJsSdk.LitNodeClient();
    await client.connect();
    window.litNodeClient = client;
  }, []);

  // instead of storing the encrypted package in the state (which isjust for demonstration purposes)
  // the object would need to  be stored as a JSON on IPFS
  const handleEncrypt = async () => {
    setLit({});
    const encryptedPackage = await encrypt(clearText);
    setLit(encryptedPackage);
  };

  const handleDecrypt = async () => {
    const clear = await decrypt(lit.encryptedString, lit.encryptedSymmetricKey);
    setDecrypted(clear.decryptedString);
  };

  return (
    <div>
      <h1>Lit Protocol</h1>
      <p>
        Encryption via Lit Protocol. Decryption is only possible if the
        connected wallet holds either an ERC1155 token with id=
        {monetaryDelegateBadgeId} or id={vetoDelegateBadgeId} on the Badger
        contract (
        <a href="https://rinkeby.etherscan.io/address/0xDfF197357d7239Cc1073ACbe34c24152Eb7aCa37#code">
          0xDfF197357d7239Cc1073ACbe34c24152Eb7aCa37
        </a>
        ).
        <p>
          On the deployed Badger instance anyone can mint or burn tokens, so it
          can be used for testing the decryption scheme. Only if you hold one of
          the above-mentioned tokenns with the connected wallet will you be able
          to decrypt an encrypted message.
        </p>
      </p>
      <div>
        <h2>Encrypt:</h2>
        <input
          type="text"
          value={clearText}
          onChange={(e) => setClearText(e.target.value)}
        />
        <button onClick={handleEncrypt}>Encrypt</button>
        {Object.keys(lit).length > 0 && (
          <p>successfully encrypted message: {clearText}</p>
        )}
      </div>
      <div>
        <h2>Decrypted message:</h2>
        <button onClick={handleDecrypt}>Decrypt</button>
        <p>{decrypted}</p>
      </div>
    </div>
  );
};

export default LitProtocol;
