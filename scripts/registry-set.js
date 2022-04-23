const hardhat = require("hardhat");

async function registrySet(address, wrapper) {
	const registry = await hardhat.ethers.getContractAt("SuperfluidWrapperRegistry", "0x2277c872A63FA7b2759173cdcfF693435532B4e4");

	await registry.updateWrapperAddress(address, wrapper);

	console.log(`Updated ${address} token to ${wrapper} in SuperfluidWrapperRegistry`);
}

if (hardhat.network.name != "kovan") {
	throw "ERROR: Wrong network";
}

registrySet("0x8607d0ab76985e845b03a6011aa13edd1cb21126", "0xb20200908d60f1d7bc68594f677bc15070a87504")
	.then(() => {
		process.exit(0)})
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
