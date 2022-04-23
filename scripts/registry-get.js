const hardhat = require("hardhat");

async function registryGet(address) {
	const registry = await hardhat.ethers.getContractAt("SuperfluidWrapperRegistry", "0x47C0A4614ec7ac0467D215dA3B215e4f536DF33F");

	const wrapper = await registry.superfluidWrapperAddress(address);

	console.log(`Wrapper for ${address} is set to ${wrapper}`);
}

if (hardhat.network.name != "kovan" && hardhat.network.name != "kovan-optimism") {
	throw "ERROR: Wrong network";
}

registryGet("0xbe49ac1EadAc65dccf204D4Df81d650B50122aB2")
	.then(() => {
		process.exit(0)})
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
