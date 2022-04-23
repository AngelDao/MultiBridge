import React, { useState } from 'react';
import Item from './Item';
import Imprint from './Imprint';
import tokenList from '../tokenList';
import { createCalldataArray } from '../calldataUtils';
import { Button } from '@chakra-ui/react';
import { connectWallet } from '../MultiBridge';

export default function Home() {
  const [amount, setAmount] = useState([Array(200).fill(0)]);

  return (
    <div>
      <div style={{ fontSize: '2rem' }}>
        Optimistic Multi Bridge{' '}
        <span style={{ fontSize: '0.7rem' }}>(*on Kovan)</span>
      </div>
      <div style={{ fontSize: '0.8rem', marginBottom: '2rem' }}>
        Bridging is annoying, right? We agree! With the Optimistic Multi Bridge,
        you can bridge all your tokens in 1 transaction.
      </div>
      <Button onClick={connectWallet}>Connect wallet</Button>
      {tokenList.tokens.map((token, i) => {
        // kovan
        if (token.chainId === 42) {
          return (
            <Item
              id={i}
              amount={amount}
              setAmount={setAmount}
              name={token.name}
              address={token.address}
              logo={token.logoURI}
            />
          );
        }
      })}
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button type="primary" onClick={() => createCalldataArray(amount)}>
          Transfer
        </Button>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <Imprint />
      </div>
    </div>
  );
}
