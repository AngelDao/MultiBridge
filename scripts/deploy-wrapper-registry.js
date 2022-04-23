const hardhat = require("hardhat");

async function deployWrapperRegistry() {
	const Registry = await hardhat.ethers.getContractFactory("SuperfluidWrapperRegistry");

	console.log("Deploying SuperfluidWrapperRegistry contract");

	const registry = await Registry.deploy();
	await registry.deployed();

	console.log(`SuperfluidWrapperRegistry deployed at: ${registry.address}`);

	await registry.updateWrapperAddressBatch(
		[ /* fDAI */  "0xb64845d53a373d35160b72492818f0d2f51292c0", /* fUSDC */  "0x2eb320e2100a043401e3b3b132d4134f235a6a04", /* fTUSD */  "0x8607d0ab76985e845b03a6011aa13edd1cb21126"],
		[ /* fDAIx */ "0xe3cb950cb164a31c66e32c320a800d477019dcff", /* fUSDCx */ "0x25b5cd2e6ebaedaa5e21d0ecf25a567ee9704aa7", /* fTUSDx */ "0xb20200908d60f1d7bc68594f677bc15070a87504"],
	);

	console.log("Registered initial wrappers to registry");
}

if (hardhat.network.name != "kovan") {
	throw "ERROR: Wrong network";
}

deployWrapperRegistry()
	.then(() => {
		process.exit(0)})
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
