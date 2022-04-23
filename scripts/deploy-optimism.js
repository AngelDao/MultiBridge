const hardhat = require("hardhat");
const { deploy } = require("./deploy.js");

if (hardhat.network.name != "kovan") {
	throw "ERROR: Wrong network";
}

deploy(process.env.KOVAN_OP_BRIDGE_ADDR)
	.then(() => {
		process.exit(0)})
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
