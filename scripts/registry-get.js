const hardhat = require("hardhat");

async function registryGet(address) {
	const registry = await hardhat.ethers.getContractAt("SuperfluidWrapperRegistry", "0x2277c872A63FA7b2759173cdcfF693435532B4e4");

	const wrapper = await registry.superfluidWrapperAddress(address);

	console.log(`Wrapper for ${address} is set to ${wrapper}`);
}

if (hardhat.network.name != "kovan") {
	throw "ERROR: Wrong network";
}

registryGet("0x2eb320e2100a043401e3b3b132d4134f235a6a04")
	.then(() => {
		process.exit(0)})
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
