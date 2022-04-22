import React, { useState } from 'react';
import Item from './Item';
import tokenList from '../tokenList';
import { Button } from 'antd';

export default function Home() {
  const [amount, setAmount] = useState([Array(200).fill(0)]);

  return (
    <div>
      <div style={{ fontSize: '2rem' }}>The Multi Bridge</div>
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
        <Button type="primary">Transfer</Button>
      </div>
    </div>
  );
}
