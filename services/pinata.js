import axios from "axios";

export const pinJson = async (JSONBody) => {
  const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
  return (
    await axios.post(url, JSONBody, {
      headers: {
        pinata_api_key: "07dfdfe947b92c942746",
        pinata_secret_api_key:
          "efa0d0d2f7370560f2ea1edcf67a749157a1e71e591a47041f611cbee2df58e0",
      },
    })
  ).data.IpfsHash;
};
