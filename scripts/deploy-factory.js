const hardhat = require("hardhat");

async function deployFactory(registryAddress) {
	const Factory = await hardhat.ethers.getContractFactory("SuperfluidWalletFactory");

	console.log("Deploying SuperfluidWalletFactory contract");

	let host;
	if (hardhat.network.name == "kovan") {
		host = process.env.KOVAN_SF_HOST_ADDR;
	} else if (hardhat.network.name == "kovan-optimism") {
		host = process.env.KOVAN_OP_SF_HOST_ADDR;
	}

	const factory = await Factory.deploy(registryAddress, host);
	await factory.deployed();

	console.log(`SuperfluidWalletFactory deployed at: ${factory.address}`);
}

if (hardhat.network.name != "kovan" && hardhat.network.name != "kovan-optimism") {
	throw "ERROR: Wrong network";
}

deployFactory("0x47C0A4614ec7ac0467D215dA3B215e4f536DF33F")
	.then(() => {
		process.exit(0)})
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
