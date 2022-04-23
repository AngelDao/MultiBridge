import React, { useState, useEffect } from 'react';
import Item from './Item';
import Imprint from './Imprint';
import Networks from './Networks';
import tokenList from '../tokenList';
import { createCalldataArray } from '../calldataUtils';
import { Button } from '@chakra-ui/react';
import { connectWallet, multiBridge } from '../MultiBridge';
import logo from '../logo1.png';
import { useToast } from '@chakra-ui/react';

function initState(value) {
  let obs = {};
  for (var x = 0; x < 200; x++) {
    obs[x] = value;
  }
  return obs;
}

export default function Home() {
  const [amount, setAmount] = useState([Array(200).fill(0)]);
  const [c, setC] = useState(initState(false));

  // superfluid stuff
  const [recipient, setRecipient] = useState(initState('0x0'));
  const [duration, setDuration] = useState(initState(0));
  const [amount2, setAmount2] = useState(initState(0));

  const [network, setNetwork] = useState('Optimism');

  const toast = useToast();

  useEffect(() => {}, [c]);

  const createDataAndSendTx = async () => {
    const callDataArray = createCalldataArray(amount, network);
    console.log('calldata array ', callDataArray);
    if (callDataArray && callDataArray.length > 0) {
      const res = await multiBridge(callDataArray, network);

      if (res) {
        toast({
          title: 'Transfer was successfull',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Transfer failed',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      alert('No tokens selected');
    }
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div>
          <img src={logo} width="200" height="200" alt="Logo" />
        </div>
      </div>
      <div style={{ fontSize: '2rem' }}>
        {/* Optimistic Multi Bridge{' '} */}
        <span style={{ fontSize: '0.7rem' }}>(*only on Testnets)</span>
      </div>
      <div
        style={{ fontSize: '0.8rem', marginTop: '1rem', marginBottom: '2rem' }}
      >
        Bridging is annoying, right? We agree! With the Optimistic Multi Bridge,
        you can bridge all your tokens in 1 transaction.
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>
          <Networks setNetwork={setNetwork} />
        </div>
        <Button onClick={connectWallet}>Connect wallet</Button>
      </div>
      {tokenList.tokens.map((token, i) => {
        // kovan
        if (token.chainId === 42) {
          return (
            <Item
              id={i}
              amount={amount}
              setAmount={setAmount}
              c={c}
              setC={setC}
              name={token.name}
              address={token.address}
              logo={token.logoURI}
              // superfluid
              recipient={recipient}
              setRecipient={setRecipient}
              duration={duration}
              setDuration={setDuration}
              amount2={amount2}
              setAmount2={setAmount2}
            />
          );
        }
      })}
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button type="primary" onClick={createDataAndSendTx}>
          Transfer
        </Button>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <Imprint />
      </div>
    </div>
  );
}
