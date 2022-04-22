import React, { useState, useEffect } from 'react';
import Item from './Item';
import tokenList from '../tokenList';
import { Button } from 'antd';

export default function Home() {
  const [checked, setChecked] = useState(Array(200).fill(true));
  const [amount, setAmount] = useState([Array(200).fill(0)]);

  useEffect(() => {}, [amount, checked]);

  return (
    <div>
      <div style={{ fontSize: '2rem' }}>The Multi Bridge</div>
      {tokenList.tokens.map((token, i) => {
        // kovan
        if (token.chainId === 42) {
          return (
            <Item
              id={i}
              checked={checked}
              setChecked={setChecked}
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
