import { InjectedConnector } from '@web3-react/injected-connector';

const injected = new InjectedConnector({
  supportedChainIds: [42],
});

export async function connectToWallet(activate) {
  try {
    await activate(injected);
  } catch (ex) {
    console.log(ex);
  }
}
