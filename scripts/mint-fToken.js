const hardhat = require("hardhat");
const BN = ethers.BigNumber;
async function mintFToken(address, amount, recipient) {

	const iface = new ethers.utils.Interface([
		"function mint(address account, uint256 amount) public returns (bool)",
	]);

	let signer;
	[signer] = await ethers.getSigners();
	await signer.sendTransaction({
		to: address,
		data: iface.encodeFunctionData("mint", [recipient, amount])
	});

	console.log(`Account ${recipient} minted ${amount} tokens of ${address}`);
}

if (hardhat.network.name != "kovan") {
	throw "ERROR: Wrong network";
}

mintFToken("0x8607d0ab76985e845b03a6011aa13edd1cb21126", BN.from(1_000_000).mul(BN.from(10).pow(18)), "0xBA0CcB1517b5f7053eF64eF77C9b75ce282ccaAF")
	.then(() => {
		process.exit(0)})
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
