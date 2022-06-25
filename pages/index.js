import { Web3Context } from "../context/Web3Context";
import LitProtocol from "../components/LitProtocol";
import Header from "../components/Header";
import Balances from "../components/Balances";
import Mint from "../components/Mint";
import { useEffect, useContext } from "react";

export const Home = () => {
  const { state, dispatch, connect, disconnect } = useContext(Web3Context);
  const { provider, web3Provider, address, chainId, web3Modal } = state;

  // Auto connect to the cached provider
  useEffect(() => {
    const { cachedProvider } = web3Modal;
    if (cachedProvider) {
      connect();
    }
  }, [connect]);

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        // eslint-disable-next-line no-console
        console.log("accountsChanged", accounts);
        dispatch({
          type: "SET_ADDRESS",
          address: accounts[0],
        });
      };

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId) => {
        window.location.reload();
      };

      const handleDisconnect = (error) => {
        // eslint-disable-next-line no-console
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider, disconnect, dispatch]);

  return (
    <div className="container">
      <main>
        <Header />
        <Balances />
        <Mint />
        <LitProtocol />
      </main>
    </div>
  );
};

export default Home;
