import { Input } from 'antd';
import React from 'react';
import { Checkbox } from 'antd';

export default function Item({ name, logo, amount, setAmount, id, c, setC }) {
  function setA(v) {
    let _amount = amount;
    _amount[id] = parseFloat(v.target.value);
    setAmount(_amount);
  }

  function _setChecked(v) {
    let _c = c;
    _c[id] = v.target.checked;
    setC(_c);
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
      <Checkbox onChange={v => _setChecked(v)} />
    </div>
  );
}
