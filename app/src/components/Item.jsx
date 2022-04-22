import { Input } from 'antd';
import { Checkbox } from 'antd';
import React, { useEffect } from 'react';

export default function Item({
  name,
  address,
  logo,
  checked,
  setChecked,
  amount,
  setAmount,
  id,
}) {
  function setCh() {
    let _checked = checked;
    _checked[id] = false;
    setChecked(_checked);
  }

  function setA(v) {
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
          <Checkbox checked={checked[id]} onChange={() => setCh()} />
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
