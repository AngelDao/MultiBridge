const hardhat = require("hardhat");
const { deployBridge } = require("./deploy-bridge.js");

if (hardhat.network.name != "rinkeby") {
	throw "ERROR: Wrong network";
}

deployBridge(process.env.RINKEBY_B_BRIDGE_ADDR)
	.then(() => {
		process.exit(0)})
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
