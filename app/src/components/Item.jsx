import { Input } from 'antd';

export default function Item({ name, address, logo }) {
  return (
    <div>
      <div style={{ display: 'flex', margin: '2rem' }}>
        <span style={{ marginRight: '2rem' }}>
          <img src={logo} width="25" height="25" />
        </span>
        {name}
        <span style={{ marginLeft: '2rem' }}>
          <Input placeholder="# of Tokens" />
        </span>
      </div>
    </div>
  );
}
