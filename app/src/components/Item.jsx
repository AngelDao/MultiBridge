import { Input } from 'antd';
import React from 'react';
import TokenStats from './TokenStats';

export default function Item({ name, logo, amount, setAmount, id }) {
  function setA(v) {
    let _amount = amount;
    _amount[id] = parseFloat(v.target.value);
    setAmount(_amount);
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          margin: '2rem',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex' }}>
          <span style={{ marginRight: '1rem', marginLeft: '2rem' }}>
            <img src={logo} width="25" height="25" />
          </span>
        </div>
        {name}
        <span style={{ display: 'flex', marginLeft: '2rem' }}>
          <Input
            placeholder="# of Tokens"
            value={amount[id]}
            onChange={v => setA(v)}
          />
          <div style={{ marginLeft: '0.5rem' }}>
            <TokenStats />
          </div>
        </span>
      </div>
    </div>
  );
}
