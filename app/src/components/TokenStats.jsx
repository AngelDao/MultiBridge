import { Button } from '@chakra-ui/react';
import Web3 from 'web3';
import tokenList from '../tokenList';
import React, { useState, useEffect } from 'react';

const ABI = [
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    type: 'function',
  },
];

export default function TokenStats({ id }) {
  const [balance, setBalance] = useState(0);

  useEffect(async () => {
    const res = await getBalance(tokenList.tokens[id].address);
    console.log(222);
    console.log(res);
    setBalance(777777);
  }, []);

  async function getBalance(erc20Address) {
    if (typeof window.ethereum !== 'undefined') {
      let web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      var accounts = await web3.eth.getAccounts();
      console.log(erc20Address);
      const tokenInst = new web3.eth.Contract(
        ABI,
        '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
      );
      const balance = await tokenInst.methods
        .balanceOf('0x414b60745072088d013721b4a28a0559b1A9d213')
        .call();
      console.log(balance);
      return balance;
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: '0.3rem',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ fontSize: '0.5rem' }}>
        <span>{balance}</span>
      </div>
      <Button style={{ width: '2rem', height: '2rem', fontSize: '0.5rem' }}>
        MAX
      </Button>
    </div>
  );
}
