const hardhat = require("hardhat");

async function wrapAndStartStreams(address, streamData) {
	const wallet = await hardhat.ethers.getContractAt("SuperfluidWallet", address);

	await wallet.wrapAndStartStreams(streamData, { gasLimit: 4_000_000 });

	console.log(`wrapAndStartStreams was called on ${address}`);
	console.log(streamData);
}

if (hardhat.network.name != "kovan") {
	throw "ERROR: Wrong network";
}

wrapAndStartStreams(
	"0xBA0CcB1517b5f7053eF64eF77C9b75ce282ccaAF",
	[
		[ "0xb64845d53a373d35160b72492818f0d2f51292c0", "0x1eaa0f4d9b62611032fa75b8f109fc5ef1a5ac79", 4 ],
		[ "0x2eb320e2100a043401e3b3b132d4134f235a6a04", "0x1eaa0f4d9b62611032fa75b8f109fc5ef1a5ac79", 10 ],
		[ "0x8607d0ab76985e845b03a6011aa13edd1cb21126", "0x1eaa0f4d9b62611032fa75b8f109fc5ef1a5ac79", 7 ],
	])
	.then(() => {
		process.exit(0)})
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
