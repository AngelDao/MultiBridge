const hardhat = require("hardhat");

async function wrapToken(factory, token) {

	const iface = new ethers.utils.Interface([
		"function createERC20Wrapper(address, uint8, uint8, string, string) public returns (address superToken)",
	]);

	let signer;
	[signer] = await ethers.getSigners();
	await signer.sendTransaction({
		to: factory,
		data: iface.encodeFunctionData("createERC20Wrapper", token)
	});

	console.log(`Wrapped ${token[0]} token`);
}

if (hardhat.network.name != "kovan" && hardhat.network.name != "kovan-optimism") {
	throw "ERROR: Wrong network";
}

wrapToken("0xB5f0501908ca8A99fD31bEFCAc1cA458F3588671", ["0x4e62882864fB8CE54AFfcAf8D899A286762B011B", 6, 0, "USD Coin", "USDC"])
	.then(() => {
		process.exit(0)})
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
