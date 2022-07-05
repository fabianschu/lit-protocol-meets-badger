import React from "react";

const Instructions = () => {
  return (
    <div>
      <h1>Instructions</h1>
      <p>
        This toy dapp exemplifies the secret delegation flow. To test it out,
        you need to be on the rinkeby network. With the correct badge "Monetary
        Delegate" (tokenId = 1) you can propose that this{" "}
        <a href="https://gnosis-safe.io/app/rin:0xfAB7aC6CA7Ca6070A4115E549f5b47Ed3efF6cfe/home">
          Gnosis Safe
        </a>{" "}
        executes functions on this{" "}
        <a href="https://rinkeby.etherscan.io/address/0xE9a757A776F729d36191FC40f849Afc84a5cF4b3">
          Test Contract
        </a>
        . Join this{" "}
        <a href="https://t.me/kolektivo_test_notif">telegram channel</a> to
        receive notifications about incoming proposals.
      </p>
      <p>
        If you hold a badge with tokenId = 1 and/or tokenId = 2, you can read
        the history of enqueued proposals.
      </p>
      <p>
        If you hold a badge with tokenId = 1 ("Monetary Delegate"), you can
        execute proposed transactions. There is no cooldown period configured.
      </p>
      <p>
        If you hold a badge with tokenId = 2 ("Monetary Multisig Member"), you
        can veto proposals.
      </p>
    </div>
  );
};

export default Instructions;
