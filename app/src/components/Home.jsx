import Item from './Item';
import tokenList from '../tokenList';

export default function Home() {
  return (
    <div>
      <div style={{ fontSize: '2rem' }}>The Multi Bridge</div>
      {tokenList.tokens.map(token => {
        // kovan
        if (token.chainId === 42) {
          return (
            <Item
              name={token.name}
              address={token.address}
              logo={token.logoURI}
            />
          );
        }
      })}
    </div>
  );
}
