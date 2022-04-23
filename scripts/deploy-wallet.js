const hardhat = require("hardhat");

async function deployWallet(factory) {
	const Factory = await hardhat.ethers.getContractAt("SuperfluidWalletFactory", factory);

	console.log("Deploying new SuperfluidWallet");

	const tx = await Factory.deployNewWallet();
	const res = await tx.wait();

	console.log(`New SuperfluidWallet owned by ${res.events[1].args.owner} deployed at: ${res.events[1].args.walletAddress}`);
}

if (hardhat.network.name != "kovan" && hardhat.network.name != "kovan-optimism") {
	throw "ERROR: Wrong network";
}

deployWallet("0x7aABAb7a80055BAe98dA3C3FC6fF7240E3992C77")
	.then(() => {
		process.exit(0)})
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
