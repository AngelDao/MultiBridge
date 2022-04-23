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

const iface = new ethers.utils.Interface(ABI);

const bridgeAddress = '0x22F24361D548e5FaAfb36d1437839f080363982B';

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
    //cacheProvider: true, // optional
    providerOptions, // required
  });

  const instance = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(instance);
  return provider;
};

export const multiBridge = async () => {
  /*

    address _l1Token,
    address _l2Token,
    address _to,
    uint256 _amount,
    uint32 _l2Gas,
    bytes calldata _data

    */

  const provider = await connectWallet();
  const signer = provider.getSigner();

  for (var i = 0; i < 2; i++) {
    const l1Token = '0x50dC5200082d37d5dd34B4b0691f36e3632fE1A8'; //USDC

    const l2Token = '0x4e62882864fB8CE54AFfcAf8D899A286762B011B'; //USDC

    const inputdata = [ l1Token, l2Token, myAddress, ethers.utils.parseEther("0.01"), ethers.BigNumber.from(1), "0x00"  ]

    const data = iface.encodeFunctionData("depositERC20To", inputdata)

    const myAddress = await signer.getAddress();

    const data = iface.encodeFunctionData('depositERC20To', [
      l1Token,
      l2Token,
      myAddress,
      ethers.utils.parseEther('0.01'),
      ethers.BigNumber.from(1),
      '',
    ]);

    console.log('TX data for bridge', data);
  }
};
