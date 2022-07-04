export default {
  address: "0x1D152189AceEb59D448d54abBa51243e5F7c5CAc",
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
          internalType: "address",
          name: "_badger",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "ArraysDifferentLength",
      type: "error",
    },
    {
      inputs: [],
      name: "ModuleTransactionFailed",
      type: "error",
    },
    {
      inputs: [],
      name: "NoMembership",
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
      inputs: [],
      name: "SetUpModulesAlreadyCalled",
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
      name: "RolesModSetup",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "multisendAddress",
          type: "address",
        },
      ],
      name: "SetMultisendAddress",
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
      inputs: [
        {
          internalType: "uint256",
          name: "badgeId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "targetAddress",
          type: "address",
        },
        {
          internalType: "enum ExecutionOptions",
          name: "options",
          type: "uint8",
        },
      ],
      name: "allowTarget",
      outputs: [],
      stateMutability: "nonpayable",
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
      inputs: [],
      name: "badger",
      outputs: [
        {
          internalType: "contract IBadger",
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
          name: "badgeId",
          type: "uint256",
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
        {
          internalType: "uint256",
          name: "badgeId",
          type: "uint256",
        },
      ],
      name: "execTransactionFromModuleReturnData",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
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
      inputs: [],
      name: "multisend",
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
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "role",
          type: "uint16",
        },
        {
          internalType: "address",
          name: "targetAddress",
          type: "address",
        },
      ],
      name: "revokeTarget",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "role",
          type: "uint16",
        },
        {
          internalType: "address",
          name: "targetAddress",
          type: "address",
        },
        {
          internalType: "bytes4",
          name: "functionSig",
          type: "bytes4",
        },
        {
          internalType: "enum ExecutionOptions",
          name: "options",
          type: "uint8",
        },
      ],
      name: "scopeAllowFunction",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "role",
          type: "uint16",
        },
        {
          internalType: "address",
          name: "targetAddress",
          type: "address",
        },
        {
          internalType: "bytes4",
          name: "functionSig",
          type: "bytes4",
        },
        {
          internalType: "bool[]",
          name: "isParamScoped",
          type: "bool[]",
        },
        {
          internalType: "enum ParameterType[]",
          name: "paramType",
          type: "uint8[]",
        },
        {
          internalType: "enum Comparison[]",
          name: "paramComp",
          type: "uint8[]",
        },
        {
          internalType: "bytes[]",
          name: "compValue",
          type: "bytes[]",
        },
        {
          internalType: "enum ExecutionOptions",
          name: "options",
          type: "uint8",
        },
      ],
      name: "scopeFunction",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "role",
          type: "uint16",
        },
        {
          internalType: "address",
          name: "targetAddress",
          type: "address",
        },
        {
          internalType: "bytes4",
          name: "functionSig",
          type: "bytes4",
        },
        {
          internalType: "enum ExecutionOptions",
          name: "options",
          type: "uint8",
        },
      ],
      name: "scopeFunctionExecutionOptions",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "role",
          type: "uint16",
        },
        {
          internalType: "address",
          name: "targetAddress",
          type: "address",
        },
        {
          internalType: "bytes4",
          name: "functionSig",
          type: "bytes4",
        },
        {
          internalType: "uint256",
          name: "paramIndex",
          type: "uint256",
        },
        {
          internalType: "enum ParameterType",
          name: "paramType",
          type: "uint8",
        },
        {
          internalType: "enum Comparison",
          name: "paramComp",
          type: "uint8",
        },
        {
          internalType: "bytes",
          name: "compValue",
          type: "bytes",
        },
      ],
      name: "scopeParameter",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "role",
          type: "uint16",
        },
        {
          internalType: "address",
          name: "targetAddress",
          type: "address",
        },
        {
          internalType: "bytes4",
          name: "functionSig",
          type: "bytes4",
        },
        {
          internalType: "uint256",
          name: "paramIndex",
          type: "uint256",
        },
        {
          internalType: "enum ParameterType",
          name: "paramType",
          type: "uint8",
        },
        {
          internalType: "bytes[]",
          name: "compValues",
          type: "bytes[]",
        },
      ],
      name: "scopeParameterAsOneOf",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "role",
          type: "uint16",
        },
        {
          internalType: "address",
          name: "targetAddress",
          type: "address",
        },
        {
          internalType: "bytes4",
          name: "functionSig",
          type: "bytes4",
        },
      ],
      name: "scopeRevokeFunction",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "role",
          type: "uint16",
        },
        {
          internalType: "address",
          name: "targetAddress",
          type: "address",
        },
      ],
      name: "scopeTarget",
      outputs: [],
      stateMutability: "nonpayable",
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
          name: "_multisend",
          type: "address",
        },
      ],
      name: "setMultisend",
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
      inputs: [
        {
          internalType: "uint16",
          name: "role",
          type: "uint16",
        },
        {
          internalType: "address",
          name: "targetAddress",
          type: "address",
        },
        {
          internalType: "bytes4",
          name: "functionSig",
          type: "bytes4",
        },
        {
          internalType: "uint8",
          name: "paramIndex",
          type: "uint8",
        },
      ],
      name: "unscopeParameter",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newBadger",
          type: "address",
        },
      ],
      name: "updateBadger",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};
