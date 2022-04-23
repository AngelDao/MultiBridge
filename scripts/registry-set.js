const hardhat = require("hardhat");

async function registrySet(address, wrapper) {
	const registry = await hardhat.ethers.getContractAt("SuperfluidWrapperRegistry", "0x47C0A4614ec7ac0467D215dA3B215e4f536DF33F");

	await registry.updateWrapperAddress(address, wrapper);

	console.log(`Updated ${address} token to ${wrapper} in SuperfluidWrapperRegistry`);
}

if (hardhat.network.name != "kovan" && hardhat.network.name != "kovan-optimism") {
	throw "ERROR: Wrong network";
}

registrySet("0x4e62882864fB8CE54AFfcAf8D899A286762B011B", "0x54d1c000d1bcfecdf58ee8bea0dddf66b574f824")
	.then(() => {
		process.exit(0)})
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
