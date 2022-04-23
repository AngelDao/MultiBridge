import { Input } from 'antd';

export default function Superfluid({
  recipient,
  setRecipient,
  duration,
  setDuration,
  amount,
  setAmount,
}) {
  return (
    <div>
      <div style={{ marginBottom: '1rem', fontSize: '0.7rem' }}>
        Open a new Superfluid Stream
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '2rem',
        }}
      >
        <Input placeholder="recipient" />
        <Input placeholder="duration (in days)" />
        <Input placeholder="amount (in wei)" />
      </div>
    </div>
  );
}
