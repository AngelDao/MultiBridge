const hardhat = require("hardhat");

async function deployFactory(registryAddress) {
	const Factory = await hardhat.ethers.getContractFactory("SuperfluidWalletFactory");

	console.log("Deploying SuperfluidWalletFactory contract");

	const factory = await Factory.deploy(registryAddress, process.env.KOVAN_SF_HOST_ADDR);
	await factory.deployed();

	console.log(`SuperfluidWalletFactory deployed at: ${factory.address}`);
}

if (hardhat.network.name != "kovan") {
	throw "ERROR: Wrong network";
}

deployFactory("0x2277c872A63FA7b2759173cdcfF693435532B4e4")
	.then(() => {
		process.exit(0)})
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
