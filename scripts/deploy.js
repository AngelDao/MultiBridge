const hardhat = require("hardhat");


async function main() {

	const Bridge = await hardhat.ethers.getContractFactory("L1ERC20BatchBridge");

	let opBridgeAddress;
	if (hardhat.network.name == "kovan") {
		opBridgeAddress = process.env.KOVAN_OP_BRIDGE_ADDR;
	} else {
		throw "ERROR: Undefined network";
	}

	console.log("Deploying L1ERC20BatchBridge contract");

	const bridge = await Bridge.deploy(opBridgeAddress);
	await bridge.deployed();

	console.log(`L1ERC20BatchBridge deployed at: ${bridge.address}`);
}


main()
	.then(() => {
		process.exit(0)})
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
