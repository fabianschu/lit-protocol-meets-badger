import { ethers } from "ethers";
import supportedChains from "./chains";

export function getChainData(chainId) {
  if (!chainId) {
    return null;
  }
  const chainData = supportedChains.filter(
    (chain) => chain.chain_id === chainId
  )[0];

  if (!chainData) {
    throw new Error("ChainId missing or not supported");
  }

  const API_KEY = "460f40a260564ac4a4f4b3fffb032dad";

  if (
    chainData.rpc_url.includes("infura.io") &&
    chainData.rpc_url.includes("%API_KEY%") &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace("%API_KEY%", API_KEY);

    return {
      ...chainData,
      rpc_url: rpcUrl,
    };
  }

  return chainData;
}

export function ellipseAddress(address = "", width = 10) {
  if (!address) {
    return "";
  }
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}

export const blobToBase64 = (blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      resolve(reader.result);
    };
  });
};

export const verifyPayload = (
  targetContract,
  fnName,
  inputs,
  raw,
  onchainHash
) => {
  let typeStrings = "";
  const types = [];
  inputs.forEach((typeString, idx) => {
    if (idx !== 0) typeStrings += ",";
    typeStrings += `${typeString.internalType} ${typeString.name}`;
    types.push(typeString.internalType);
  });

  const abi = "function " + fnName + "(" + typeStrings + ")";
  const iface = new ethers.utils.Interface([abi]);
  const sighash = iface.getSighash(fnName);
  const values = inputs.map((i) => i.value);
  const encodedData = ethers.utils.solidityPack(
    ["bytes4", ...types],
    [sighash, ...values]
  );

  // first we check that human readable payload matches transaction params
  if (encodedData !== raw.data) return false;
  if (targetContract !== raw.to) return false;
  if (raw.value !== 0) return false;
  if (raw.operation !== 0) return false;

  const hash = ethers.utils.solidityKeccak256(
    ["address", "uint256", "bytes", "uint8", "uint256"],
    [raw.to, raw.value, raw.data, raw.operation, raw.salt]
  );

  // then we check that transaction params produce correct hash
  if (hash !== onchainHash) return false;

  return true;
};
