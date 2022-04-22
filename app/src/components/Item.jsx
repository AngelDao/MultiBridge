import { Input } from 'antd';
import { Checkbox } from 'antd';

export default function Item({ name, address, logo }) {
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
          <Checkbox />
          <span style={{ marginRight: '1rem', marginLeft: '2rem' }}>
            <img src={logo} width="25" height="25" />
          </span>
        </div>
        {name}
        <span style={{ marginLeft: '2rem' }}>
          <Input placeholder="# of Tokens" />
        </span>
      </div>
    </div>
  );
}
