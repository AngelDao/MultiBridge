import { Button } from '@chakra-ui/react';
import Web3 from 'web3';

export default function TokenStats({}) {
  async function getBalance(ethAddress) {
    if (typeof window.ethereum !== 'undefined') {
      let web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        return true;
      } catch (e) {
        return false;
      }
    }
  }

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
