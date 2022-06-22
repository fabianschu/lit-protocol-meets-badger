import LitJsSdk from "lit-js-sdk";

const chain = "rinkeby";
export const monetaryDelegateBadgeId = 1;
export const vetoDelegateBadgeId = 2;
export const badgerAddress = "0xDfF197357d7239Cc1073ACbe34c24152Eb7aCa37";

const accessControlConditions = [
  {
    contractAddress: badgerAddress,
    standardContractType: "ERC1155",
    chain,
    method: "balanceOfBatch",
    parameters: [
      ":userAddress,:userAddress",
      `${monetaryDelegateBadgeId},${vetoDelegateBadgeId}`,
    ],
    returnValueTest: {
      comparator: ">",
      value: "0",
    },
  },
];

export const encrypt = async (message) => {
  if (!window.litNodeClient) {
    await connectLit();
  }

  const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });
  const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
    message
  );

  const encryptedSymmetricKey = await window.litNodeClient.saveEncryptionKey({
    accessControlConditions,
    symmetricKey,
    authSig,
    chain,
  });

  return {
    encryptedString,
    encryptedSymmetricKey: LitJsSdk.uint8arrayToString(
      encryptedSymmetricKey,
      "base16"
    ),
  };
};

export const decrypt = async (encryptedString, encryptedSymmetricKey) => {
  if (!window.litNodeClient) {
    await connectLit();
  }

  const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });
  const symmetricKey = await window.litNodeClient.getEncryptionKey({
    accessControlConditions,
    toDecrypt: encryptedSymmetricKey,
    chain,
    authSig,
  });

  const decryptedString = await LitJsSdk.decryptString(
    encryptedString,
    symmetricKey
  );

  return { decryptedString };
};
