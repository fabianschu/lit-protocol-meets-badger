export default {
  address: "0xE808c5E94558C7b1B8778128AbBa1A7a9deE1240",
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "_avatar",
          type: "address",
        },
        {
          internalType: "address",
          name: "_target",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_cooldown",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_expiration",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "module",
          type: "address",
        },
      ],
      name: "AlreadyDisabledModule",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "module",
          type: "address",
        },
      ],
      name: "AlreadyEnabledModule",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "module",
          type: "address",
        },
      ],
      name: "InvalidModule",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "NotAuthorized",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "guard_",
          type: "address",
        },
      ],
      name: "NotIERC165Compliant",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousAvatar",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newAvatar",
          type: "address",
        },
      ],
      name: "AvatarSet",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "guard",
          type: "address",
        },
      ],
      name: "ChangedGuard",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "initiator",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "avatar",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "target",
          type: "address",
        },
      ],
      name: "DelaySetup",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "module",
          type: "address",
        },
      ],
      name: "DisabledModule",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "module",
          type: "address",
        },
      ],
      name: "EnabledModule",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint8",
          name: "version",
          type: "uint8",
        },
      ],
      name: "Initialized",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "queueNonce",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "txHash",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "salt",
          type: "uint256",
        },
      ],
      name: "SecretTransactionAdded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousTarget",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newTarget",
          type: "address",
        },
      ],
      name: "TargetSet",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "queueNonce",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "txHash",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
        {
          indexed: false,
          internalType: "enum Enum.Operation",
          name: "operation",
          type: "uint8",
        },
      ],
      name: "TransactionAdded",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "transactions",
          type: "uint256",
        },
      ],
      name: "approveNext",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "approved",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "avatar",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "prevModule",
          type: "address",
        },
        {
          internalType: "address",
          name: "module",
          type: "address",
        },
      ],
      name: "disableModule",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "module",
          type: "address",
        },
      ],
      name: "enableModule",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "hashedTransaction",
          type: "bytes32",
        },
      ],
      name: "enqueueSecretTx",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
        {
          internalType: "enum Enum.Operation",
          name: "operation",
          type: "uint8",
        },
      ],
      name: "execTransactionFromModule",
      outputs: [
        {
          internalType: "bool",
          name: "success",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
        {
          internalType: "enum Enum.Operation",
          name: "operation",
          type: "uint8",
        },
      ],
      name: "execTransactionFromModuleReturnData",
      outputs: [
        {
          internalType: "bool",
          name: "success",
          type: "bool",
        },
        {
          internalType: "bytes",
          name: "returnData",
          type: "bytes",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
        {
          internalType: "enum Enum.Operation",
          name: "operation",
          type: "uint8",
        },
        {
          internalType: "uint256",
          name: "_salt",
          type: "uint256",
        },
      ],
      name: "executeNextSecretTx",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
        {
          internalType: "enum Enum.Operation",
          name: "operation",
          type: "uint8",
        },
      ],
      name: "executeNextTx",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getGuard",
      outputs: [
        {
          internalType: "address",
          name: "_guard",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "start",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "pageSize",
          type: "uint256",
        },
      ],
      name: "getModulesPaginated",
      outputs: [
        {
          internalType: "address[]",
          name: "array",
          type: "address[]",
        },
        {
          internalType: "address",
          name: "next",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
        {
          internalType: "enum Enum.Operation",
          name: "operation",
          type: "uint8",
        },
        {
          internalType: "uint256",
          name: "_salt",
          type: "uint256",
        },
      ],
      name: "getSecretTransactionHash",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
        {
          internalType: "enum Enum.Operation",
          name: "operation",
          type: "uint8",
        },
      ],
      name: "getTransactionHash",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_nonce",
          type: "uint256",
        },
      ],
      name: "getTxCreatedAt",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_nonce",
          type: "uint256",
        },
      ],
      name: "getTxHash",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "guard",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_module",
          type: "address",
        },
      ],
      name: "isModuleEnabled",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "queueNonce",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "salt",
      outputs: [
        {
          internalType: "uint256",
          name: "_value",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_avatar",
          type: "address",
        },
      ],
      name: "setAvatar",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_guard",
          type: "address",
        },
      ],
      name: "setGuard",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_target",
          type: "address",
        },
      ],
      name: "setTarget",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "cooldown",
          type: "uint256",
        },
      ],
      name: "setTxCooldown",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "expiration",
          type: "uint256",
        },
      ],
      name: "setTxExpiration",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_nonce",
          type: "uint256",
        },
      ],
      name: "setTxNonce",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_nonce",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_transactions",
          type: "uint256",
        },
      ],
      name: "setTxNonceAndApprove",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes",
          name: "initParams",
          type: "bytes",
        },
      ],
      name: "setUp",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "skipExpired",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "target",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "txCooldown",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "txCreatedAt",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "txExpiration",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "txHash",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "txNonce",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
};
