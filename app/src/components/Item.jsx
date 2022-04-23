import { Input } from 'antd';
import React from 'react';

export default function Item({ name, logo, amount, setAmount, id }) {
  function setA(v) {
    console.log(amount);
    let _amount = amount;
    _amount[id] = parseInt(v.target.value);
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
        <span style={{ marginLeft: '2rem' }}>
          <Input
            placeholder="# of Tokens"
            value={amount[id]}
            onChange={v => setA(v)}
          />
        </span>
      </div>
    </div>
  );
}
