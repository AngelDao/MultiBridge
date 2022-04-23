const hardhat = require("hardhat");

async function deployWallet(factory) {
	const Factory = await hardhat.ethers.getContractAt("SuperfluidWalletFactory", factory);

	console.log("Deploying new SuperfluidWallet");

	const tx = await Factory.deployNewWallet();
	const res = await tx.wait();

	console.log(`New SuperfluidWallet owned by ${res.events[1].args.owner} deployed at: ${res.events[1].args.walletAddress}`);
}

if (hardhat.network.name != "kovan") {
	throw "ERROR: Wrong network";
}

deployWallet("0xD8E61baE3e8BfA6361027bb284a2972963db9dC5")
	.then(() => {
		process.exit(0)})
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
