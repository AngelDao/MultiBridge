import { ethers } from 'ethers';
import { connectWallet } from './MultiBridge';

const ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [],
    name: 'cfaV1',
    outputs: [
      {
        internalType: 'contract ISuperfluid',
        name: 'host',
        type: 'address',
      },
      {
        internalType: 'contract IConstantFlowAgreementV1',
        name: 'cfa',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'closeStream',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'wrapperRegistry',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'host',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'startStream',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'updateStream',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'tokenAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'int96',
            name: 'flowRate',
            type: 'int96',
          },
        ],
        internalType: 'struct SuperfluidWallet.StreamInfo[]',
        name: '_streamInfo',
        type: 'tuple[]',
      },
    ],
    name: 'wrapAndStartStreams',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export async function wrapAndStartStreams() {
  const provider = await connectWallet();
  const signer = provider.getSigner();

  const inputData = null;

  let contract = new ethers.Contract(
    '0xBA0CcB1517b5f7053eF64eF77C9b75ce282ccaAF',
    ABI,
    provider
  );

  contractWithSigner = contract.connect(signer);

  await contractWithSigner.wrapAndStartStreams(inputData, {
    gasLimit: ethers.utils.parseUnits('12000000', 'wei'),
  });
}
