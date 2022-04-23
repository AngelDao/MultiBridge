const hardhat = require("hardhat");

async function deployBridge(bridgeAddress) {
	const Bridge = await hardhat.ethers.getContractFactory("L1ERC20BatchBridge");

	console.log("Deploying L1ERC20BatchBridge contract");

	const bridge = await Bridge.deploy(bridgeAddress);
	await bridge.deployed();

	console.log(`L1ERC20BatchBridge deployed at: ${bridge.address}`);
}

module.exports = { deployBridge };
