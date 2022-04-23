const hardhat = require("hardhat");
const { deployBridge } = require("./deploy-bridge.js");

if (hardhat.network.name != "kovan") {
	throw "ERROR: Wrong network";
}

deployBridge(process.env.KOVAN_OP_BRIDGE_ADDR)
	.then(() => {
		process.exit(0)})
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
