const hardhat = require("hardhat");

async function balanceFToken(address, account) {

	const iface = new ethers.utils.Interface([
		"function balanceOf(address account) external view returns (uint256)",
	]);

	let signer;
	[signer] = await ethers.getSigners();
	const result = await signer.call({
		to: address,
		data: iface.encodeFunctionData("balanceOf", [account])
	});
	const balance = iface.decodeFunctionResult("balanceOf", result);

	console.log(`Account ${account} has ${balance} tokens of ${address}`);
}

if (hardhat.network.name != "kovan") {
	throw "ERROR: Wrong network";
}

balanceFToken("0x8607d0ab76985e845b03a6011aa13edd1cb21126", "0xBA0CcB1517b5f7053eF64eF77C9b75ce282ccaAF")
	.then(() => {
		process.exit(0)})
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
