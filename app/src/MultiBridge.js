import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

const ABI = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_l1Token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_l2Token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      { indexed: false, internalType: 'address', name: '_to', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      { indexed: false, internalType: 'bytes', name: '_data', type: 'bytes' },
    ],
    name: 'ERC20DepositInitiated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_l1Token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_l2Token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      { indexed: false, internalType: 'address', name: '_to', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      { indexed: false, internalType: 'bytes', name: '_data', type: 'bytes' },
    ],
    name: 'ERC20WithdrawalFinalized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      { indexed: true, internalType: 'address', name: '_to', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      { indexed: false, internalType: 'bytes', name: '_data', type: 'bytes' },
    ],
    name: 'ETHDepositInitiated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      { indexed: true, internalType: 'address', name: '_to', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      { indexed: false, internalType: 'bytes', name: '_data', type: 'bytes' },
    ],
    name: 'ETHWithdrawalFinalized',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: '_l1Token', type: 'address' },
      { internalType: 'address', name: '_l2Token', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'uint32', name: '_l2Gas', type: 'uint32' },
      { internalType: 'bytes', name: '_data', type: 'bytes' },
    ],
    name: 'depositERC20',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_l1Token', type: 'address' },
      { internalType: 'address', name: '_l2Token', type: 'address' },
      { internalType: 'address', name: '_to', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'uint32', name: '_l2Gas', type: 'uint32' },
      { internalType: 'bytes', name: '_data', type: 'bytes' },
    ],
    name: 'depositERC20To',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint32', name: '_l2Gas', type: 'uint32' },
      { internalType: 'bytes', name: '_data', type: 'bytes' },
    ],
    name: 'depositETH',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_to', type: 'address' },
      { internalType: 'uint32', name: '_l2Gas', type: 'uint32' },
      { internalType: 'bytes', name: '_data', type: 'bytes' },
    ],
    name: 'depositETHTo',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' },
    ],
    name: 'deposits',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'donateETH',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_l1Token', type: 'address' },
      { internalType: 'address', name: '_l2Token', type: 'address' },
      { internalType: 'address', name: '_from', type: 'address' },
      { internalType: 'address', name: '_to', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'bytes', name: '_data', type: 'bytes' },
    ],
    name: 'finalizeERC20Withdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_from', type: 'address' },
      { internalType: 'address', name: '_to', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'bytes', name: '_data', type: 'bytes' },
    ],
    name: 'finalizeETHWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_l1messenger', type: 'address' },
      { internalType: 'address', name: '_l2TokenBridge', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'l2TokenBridge',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'messenger',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
];

const ERC20ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'authorizer',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'nonce',
        type: 'bytes32',
      },
    ],
    name: 'AuthorizationCanceled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'authorizer',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'nonce',
        type: 'bytes32',
      },
    ],
    name: 'AuthorizationUsed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_account',
        type: 'address',
      },
    ],
    name: 'Blacklisted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'newBlacklister',
        type: 'address',
      },
    ],
    name: 'BlacklisterChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'burner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Burn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'newMasterMinter',
        type: 'address',
      },
    ],
    name: 'MasterMinterChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'minter',
        type: 'address',
      },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Mint',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'minter',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minterAllowedAmount',
        type: 'uint256',
      },
    ],
    name: 'MinterConfigured',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'oldMinter',
        type: 'address',
      },
    ],
    name: 'MinterRemoved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  { anonymous: false, inputs: [], name: 'Pause', type: 'event' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'newAddress',
        type: 'address',
      },
    ],
    name: 'PauserChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'newRescuer',
        type: 'address',
      },
    ],
    name: 'RescuerChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_account',
        type: 'address',
      },
    ],
    name: 'UnBlacklisted',
    type: 'event',
  },
  { anonymous: false, inputs: [], name: 'Unpause', type: 'event' },
  {
    inputs: [],
    name: 'CANCEL_AUTHORIZATION_TYPEHASH',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'RECEIVE_WITH_AUTHORIZATION_TYPEHASH',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'TRANSFER_WITH_AUTHORIZATION_TYPEHASH',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'authorizer', type: 'address' },
      { internalType: 'bytes32', name: 'nonce', type: 'bytes32' },
    ],
    name: 'authorizationState',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_account', type: 'address' }],
    name: 'blacklist',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'blacklister',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'authorizer', type: 'address' },
      { internalType: 'bytes32', name: 'nonce', type: 'bytes32' },
      { internalType: 'uint8', name: 'v', type: 'uint8' },
      { internalType: 'bytes32', name: 'r', type: 'bytes32' },
      { internalType: 'bytes32', name: 's', type: 'bytes32' },
    ],
    name: 'cancelAuthorization',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'minter', type: 'address' },
      { internalType: 'uint256', name: 'minterAllowedAmount', type: 'uint256' },
    ],
    name: 'configureMinter',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'currency',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'decrement', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'increment', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'tokenName', type: 'string' },
      { internalType: 'string', name: 'tokenSymbol', type: 'string' },
      { internalType: 'string', name: 'tokenCurrency', type: 'string' },
      { internalType: 'uint8', name: 'tokenDecimals', type: 'uint8' },
      { internalType: 'address', name: 'newMasterMinter', type: 'address' },
      { internalType: 'address', name: 'newPauser', type: 'address' },
      { internalType: 'address', name: 'newBlacklister', type: 'address' },
      { internalType: 'address', name: 'newOwner', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'newName', type: 'string' }],
    name: 'initializeV2',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'lostAndFound', type: 'address' },
    ],
    name: 'initializeV2_1',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_account', type: 'address' }],
    name: 'isBlacklisted',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'isMinter',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'masterMinter',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_to', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'minter', type: 'address' }],
    name: 'minterAllowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'nonces',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pauser',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      { internalType: 'uint8', name: 'v', type: 'uint8' },
      { internalType: 'bytes32', name: 'r', type: 'bytes32' },
      { internalType: 'bytes32', name: 's', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
      { internalType: 'uint256', name: 'validAfter', type: 'uint256' },
      { internalType: 'uint256', name: 'validBefore', type: 'uint256' },
      { internalType: 'bytes32', name: 'nonce', type: 'bytes32' },
      { internalType: 'uint8', name: 'v', type: 'uint8' },
      { internalType: 'bytes32', name: 'r', type: 'bytes32' },
      { internalType: 'bytes32', name: 's', type: 'bytes32' },
    ],
    name: 'receiveWithAuthorization',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'minter', type: 'address' }],
    name: 'removeMinter',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IERC20',
        name: 'tokenContract',
        type: 'address',
      },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'rescueERC20',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rescuer',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
      { internalType: 'uint256', name: 'validAfter', type: 'uint256' },
      { internalType: 'uint256', name: 'validBefore', type: 'uint256' },
      { internalType: 'bytes32', name: 'nonce', type: 'bytes32' },
      { internalType: 'uint8', name: 'v', type: 'uint8' },
      { internalType: 'bytes32', name: 'r', type: 'bytes32' },
      { internalType: 'bytes32', name: 's', type: 'bytes32' },
    ],
    name: 'transferWithAuthorization',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_account', type: 'address' }],
    name: 'unBlacklist',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_newBlacklister', type: 'address' },
    ],
    name: 'updateBlacklister',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_newMasterMinter', type: 'address' },
    ],
    name: 'updateMasterMinter',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_newPauser', type: 'address' }],
    name: 'updatePauser',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newRescuer', type: 'address' }],
    name: 'updateRescuer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'version',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
];

const BridgeProxyABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_erc20Bridge',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'bridge',
    outputs: [
      {
        internalType: 'contract IL1ERC20Bridge',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: '_l1Token',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_l2Token',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_amount',
            type: 'uint256',
          },
          {
            internalType: 'uint32',
            name: '_l2Gas',
            type: 'uint32',
          },
          {
            internalType: 'bytes',
            name: '_data',
            type: 'bytes',
          },
        ],
        internalType: 'struct L1ERC20BatchBridge.DepositData[]',
        name: '_data',
        type: 'tuple[]',
      },
    ],
    name: 'depositERC20BatchTo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const FactoryABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "wrapperRegistry",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "superfluidHost",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "walletAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "NewWallet",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "deployNewWallet",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

  const WalletABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "cfaV1",
      "outputs": [
        {
          "internalType": "contract ISuperfluid",
          "name": "host",
          "type": "address"
        },
        {
          "internalType": "contract IConstantFlowAgreementV1",
          "name": "cfa",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "closeStream",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "wrapperRegistry",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "host",
          "type": "address"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "startStream",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "updateStream",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "tokenAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "int96",
              "name": "flowRate",
              "type": "int96"
            }
          ],
          "internalType": "struct SuperfluidWallet.StreamInfo[]",
          "name": "_streamInfo",
          "type": "tuple[]"
        }
      ],
      "name": "wrapAndStartStreams",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ] 


const iface = new ethers.utils.Interface(ABI);

const walletFactoryContract = "0x7aABAb7a80055BAe98dA3C3FC6fF7240E3992C77";

const multiBridgeProxyAddressOptimism =
  '0xd65404695a101B4FD476f4F2222F68917f96b911';
const multiBridgeProxyAddressBoba =
  '0x43Ff66F6440CD4BCbD0563645ddd6F32DD439cBA';

export const connectWallet = async () => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: '5980cdbce32c42dfb1e3e244dce5baf3', // required
      },
    },
  };

  const web3Modal = new Web3Modal({
    network: 'kovan', // optional
    cacheProvider: true, // optional
    providerOptions, // required
  });

  const instance = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(instance);
  return provider;
};

const checkIfApprovedToBridge = async (token, approvedFor, provider) => {
  let contract = new ethers.Contract(token, ERC20ABI, provider);

  const signer = provider.getSigner();

  let contractWithSigner = contract.connect(signer);

  const myAddress = await signer.getAddress();

  let checkAllowance = await contractWithSigner.allowance(
    myAddress,
    approvedFor
  );

  console.log('Allowance ', checkAllowance);
  return checkAllowance > 0;
};

const getApproval = async (token, approveFor, provider) => {
  let contract = new ethers.Contract(token, ERC20ABI, provider);

  const signer = provider.getSigner();

  let contractWithSigner = contract.connect(signer);

  const myAddress = await signer.getAddress();

  let approve_amount =
    '115792089237316195423570985008687907853269984665640564039457584007913129639935';

  let approveAllowance = await contractWithSigner.approve(
    approveFor,
    approve_amount
  );

  return true;
};


const switchNetwork = async (network) => {
	try {
		if (network == "optimism"){
			await window.ethereum.request({
			    method: "wallet_addEthereumChain",
			    params: [{
			        chainId: "0x45",
			        rpcUrls: ["https://kovan.optimism.io"],
			        chainName: "Optimism Kovan",
			        nativeCurrency: {
			            name: "KOR",
			            symbol: "KOR",
			            decimals: 18
			        },
			        blockExplorerUrls: ["https://kovan-optimistic.etherscan.io"]
			    }]
			});
		} else {
			await window.ethereum.request({
			    method: "wallet_switchEthereumChain",
			    params: [{
			        chainId: "0x2A",
			    }]
			});
		}
	} catch (e){
		console.log(e)
	}
}

const deployWallet = async (callData) => {
	
	await switchNetwork("optimism")
	const provider = await connectWallet();

	const signer = provider.getSigner();

	let factoryContract = new ethers.Contract(
		walletFactoryContract,
		FactoryABI,
		provider
	);

	let factoryContractWithSigner = factoryContract.connect(signer);

	const deployedFactoryResult = await factoryContractWithSigner.deployNewWallet();

	console.log(deployedFactoryResult)

	await provider.waitForTransaction(deployedFactoryResult.hash);

	const receipt = await provider.getTransactionReceipt(deployedFactoryResult.hash);

	const myBurnerWallet = "0x"+ receipt.logs[1].topics[1].substr(receipt.logs[1].topics[1].length - 40);

	await switchNetwork("kovan")

	return myBurnerWallet;

}

const multiBridgeProxyAddress = network => {
  if (network == 'Optimism') {
    return multiBridgeProxyAddressOptimism;
  } else if (network == 'Boba') {
    return multiBridgeProxyAddressBoba;
  } else {
    return false;
  }
};

const getBalances = async (callData, myBurnerWallet, provider) => {

	let balances = {};

	for (var i=0; i<callData.length; i++){

		console.log("Balance for ", callData[i][1])
		let contract = new ethers.Contract(callData[i][1], ERC20ABI, provider);

		const signer = provider.getSigner();

		let contractWithSigner = contract.connect(signer);

		let myBalance = await contractWithSigner.balanceOf(myBurnerWallet);

		balances[callData[i][1]] = myBalance
	}

	return balances;
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const startStream = async (mywallet, token, provider) => {
	
  console.log("Start stream")
  let contract = new ethers.Contract(mywallet, WalletABI, provider);
  const signer = provider.getSigner();
  let contractWithSigner = contract.connect(signer);
  const myAddress = await signer.getAddress();
  let stream = await contractWithSigner.wrapAndStartStreams([[token, myAddress, 1], [token, myAddress, 1]])
  return true;

}

export const multiBridge = async (callData, network) => {
  

  const myBurnerWallet = await deployWallet(callData);

  const provider = await connectWallet();

  const signer = provider.getSigner();

  let allInputData = [];

  for (var i = 0; i < callData.length; i++) {
    const isApproved = await checkIfApprovedToBridge(
      callData[i][0],
      multiBridgeProxyAddress(network),
      provider
    );

    if (!isApproved) {
      await getApproval(
        callData[i][0],
        multiBridgeProxyAddress(network),
        provider
      );
    } else {
      console.log('everything is approved...');
    }
    //const l1Token = "0x50dC5200082d37d5dd34B4b0691f36e3632fE1A8"; //USDC

    //const l2Token = "0x4e62882864fB8CE54AFfcAf8D899A286762B011B"; //USDC

    const myAddress = await signer.getAddress();

    /*
        const inputdata = {
            _l1Token :callData[i][0], 
            _l2Token: callData[i][1], 
            _to: myAddress, 
            _amount: 1,//ethers.utils.parseEther(callData[i][2].toString()), 
            _l2Gas: 1000000,//ethers.BigNumber.from(1), 
            _data: "0x00"
        }
*/

    const inputdata = [
      callData[i][0],
      callData[i][1],
      myBurnerWallet,
      ethers.utils.parseEther(callData[i][2].toString()).toString(),
      500000,
      '0x',
    ];

    //console.log("input data", inputdata)

    //const data = iface.encodeFunctionData("depositERC20To", inputdata)

    allInputData.push(inputdata);
    //console.log("TX data for bridge", data)
  }

  let bridgeProxyContract = new ethers.Contract(
    multiBridgeProxyAddress(network),
    BridgeProxyABI,
    provider
  );

  let bridgeProxyContractWithSigner = bridgeProxyContract.connect(signer);

  console.log(allInputData, multiBridgeProxyAddress(network));

  try {
    await bridgeProxyContractWithSigner.depositERC20BatchTo(allInputData, {
      gasLimit: ethers.utils.parseUnits('12000000', 'wei'),
    });

    await switchNetwork("optimism")

    const newprovider = await connectWallet();

    let foundUpdate = false;

    let sentStreams = [];

    for (var i=0; i< 1000; i++){
    	const newbalances = await getBalances(callData, myBurnerWallet, newprovider)
    	console.log("looking for diff", newbalances, myBurnerWallet)
    	for (var x in newbalances){
    		console.log("Balance ", x, newbalances[x].toString())
    		if (newbalances[x].toString().length > 1){
    			console.log("FOUND BALANCE", newbalances, x, sentStreams.indexOf(x))
    			if (sentStreams.indexOf(x) >= 0){
    				console.log("Already found this balance")
    			} else {
    				sentStreams.push(x);
    				await startStream(myBurnerWallet, x, newprovider);
    			}
    		}
    	}
    	await timeout(3000);
    }

    return true;
  } catch (e) {
  	console.log("ERR", e)
    return false;
  }
};
