import tokenList from './tokenList';

// test-net id: 69
export function createCalldataArray(amount) {
  let calldata = [];
  const tokens = tokenList.tokens;

  for (let i = 0; i < amount.length; i++) {
    if (amount[i] > 0) {
      calldata.push([
        tokens[i].address,
        getTestnetAddress(tokens[i].name).address,
        amount[i],
      ]);
    }
  }
  return calldata;
}

function getTestnetAddress(tokenName) {
  const tokens = tokenList.tokens;

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].name === tokenName && tokens[i].chainId === 69) {
      return tokens[i];
    }
  }
}
