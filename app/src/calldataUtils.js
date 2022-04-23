import tokenList from './tokenList';

// test-net id: 69
export function createCalldataArray(amount, chain) {
  let calldata = [];
  const tokens = tokenList.tokens;

  for (let i = 0; i < amount.length; i++) {
    if (amount[i] > 0) {
      calldata.push([
        tokens[i].address,
        getTestnetAddress(tokens[i].name, chain).address,
        amount[i],
      ]);
    }
  }
  return calldata;
}

function getTestnetAddress(tokenName, chain) {
  const tokens = tokenList.tokens;

  // 28 := boba
  // 69 := optimism
  let chainId = 69; // Optimism

  if (chain === 'Boba') {
    chainId = 28;
  }

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].name === tokenName && tokens[i].chainId === chainId) {
      return tokens[i];
    }
  }
}
