import { Select } from 'antd';
const { Option } = Select;

export default function Networks({ setNetwork }) {
  function handleChange(value) {
    setNetwork(value);
  }

  return (
    <Select
      defaultValue="Optimism"
      style={{ width: 180 }}
      onChange={handleChange}
    >
      <Option value="Optimism">
        <div style={{ display: 'flex' }}>
          <img
            src="https://pbs.twimg.com/profile_images/1510410375140945927/JtpX95Rt_400x400.jpg"
            width="25"
            height="2"
          />
          <div style={{ marginLeft: '1rem' }}>Optimism</div>
        </div>
      </Option>
      <Option value="Boba">
        <div style={{ display: 'flex' }}>
          <img
            src="https://logowik.com/content/uploads/images/boba-network7477.jpg"
            width="25"
            height="2"
          />
          <div style={{ marginLeft: '1rem' }}>Boba</div>
        </div>
      </Option>
      <Option value="Arbitrum">
        <div style={{ display: 'flex' }}>
          <img
            src="https://icodrops.com/wp-content/uploads/2021/09/Arbitrum_logo.jpeg"
            width="25"
            height="2"
          />
          <div style={{ marginLeft: '1rem' }}>Arbitrum</div>
        </div>
      </Option>
    </Select>
  );
}
