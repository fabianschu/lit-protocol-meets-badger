# PoC: Token-based encryption with ERC1155 tokens

install dependencies: `yarn`

run locally: `yarn next dev`

**Test Instructions**

1. visit page
2. connect your wallet with network rinkeby
3. initially when loading the page you will receive a bunch of error alerts, because you cannot decrypt the secret transaction contents which are fetched from IPFS => the table of transactions remains opaque (cannot verify functions, function name and input parameters remain unknown)
4. mint yourself a Monetary Delegate (MD) (tokenId = 1) or Monetary Multisig Member (MMM) (tokenId = 2) badge
5. now you can see the history of proposed transactions and their decrypted properties in the table:
  - verififed: means that the transaction payload could be retrieved from IPFS, decrypted via Lit Protocol and when hashed yielded the same hash that was enqueued on the SecretDelay
  - function: the name of the proposed function call
  - parameters: the params that were provided for the function call
6. with an MD badge you can propose transactions in the section "Functions" and execute them
7. with an MMM badge you can veto transactions
8. when a function has been executed you can check the associated Gnosis Safe's transaction history => you'll see that the Gnosis Safe executed the proposed function
