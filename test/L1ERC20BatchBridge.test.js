const chai = require("chai");
const { ethers } = require("hardhat");
const { smock } = require("@defi-wonderland/smock");

const expect = chai.expect;
chai.use(smock.matchers);


describe("L1ERC20BatchBridge", function() {

	let Bridge, bridge, fakeBridge;
	let sender, acc1, acc2;

	before(async function() {
		Bridge = await ethers.getContractFactory("L1ERC20BatchBridge");

		[sender, acc1, acc2] = await ethers.getSigners();
	});

	beforeEach(async function() {
		fakeBridge = await smock.fake("IL1ERC20Bridge");
		bridge = await Bridge.deploy(fakeBridge.address);
	});


	describe("constructor", function() {

		it("Should set correct bridge address", async function() {
			bridge = await Bridge.deploy(acc1.address);

			expect(await bridge.bridge()).to.equal(acc1.address);
		});

	});


	describe("depositERC20BatchTo", function() {

		it("Should pass data to bridge", async function() {
			const data = [
				[acc1.address, acc2.address, 3323, 100, "0x"],
				[ethers.constants.AddressZero, acc2.address, 0, 100, "0x100000"],
				[acc2.address, ethers.constants.AddressZero, 100_000, 0, "0x"],
			];

			await bridge.depositERC20BatchTo(data);

			expect(fakeBridge.depositERC20To).to.have.callCount(data.length);
			for (let i = 0; i < data.length; i++) {
				const args = fakeBridge.depositERC20To.getCall(i).args;
				expect(args._l1Token).to.equal(data[i][0]);
				expect(args._l2Token).to.equal(data[i][1]);
				expect(args._to).to.equal(sender.address);
				expect(args._amount).to.equal(data[i][2]);
				expect(args._l2Gas).to.equal(data[i][3]);
				expect(args._data).to.equal(data[i][4]);
			}
		});

		it("Should not fail for empty list", async function() {
			await expect(
				bridge.depositERC20BatchTo([])
			).to.not.be.reverted;
		});

	});

});
