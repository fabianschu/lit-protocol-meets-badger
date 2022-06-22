# PoC: Token-based encryption with ERC1155 tokens

install dependencies: `yarn`

run locally: `yarn next dev`

**Test Instructions**

1. Mint yourself a token with id=1 or id=2 on the deployed badger instance on rinkeby: https://rinkeby.etherscan.io/address/0xDfF197357d7239Cc1073ACbe34c24152Eb7aCa37#writeContract
2. visit the locally running dapp on http://localhost:3000/
3. enter a text to be encrypted using Lit Protocol and hit "Encrypt"
4. hit "Decrypt" and it should show the clear-text message again if you're connected with a wallet that holds an appropriate Badger token
5. switch to a wallet that doesn't hold an appropriate Badger token and try to "Decrypt" => it won't work
