import { Button } from '@chakra-ui/react';

export default function TokenStats({}) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '0.3rem',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ fontSize: '0.5rem' }}>
        <span>0.033</span>
      </div>
      <Button style={{ width: '2rem', height: '2rem', fontSize: '0.5rem' }}>
        MAX
      </Button>
    </div>
  );
}
