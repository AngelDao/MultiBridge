const hardhat = require("hardhat");
const { deploy } = require("./deploy.js");

if (hardhat.network.name != "rinkeby") {
	throw "ERROR: Wrong network";
}

deploy(process.env.RINKEBY_B_BRIDGE_ADDR)
	.then(() => {
		process.exit(0)})
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
