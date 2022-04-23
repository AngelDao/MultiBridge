const chai = require("chai");
const { ethers } = require("hardhat");
const { smock } = require("@defi-wonderland/smock");

const expect = chai.expect;
chai.use(smock.matchers);


describe("L1ERC20BatchBridge", function() {

	let Bridge, bridge, fakeBridge;
	let sender, acc1, acc2, fake20;
	let data;

	before(async function() {
		Bridge = await ethers.getContractFactory("L1ERC20BatchBridge");

		[sender, acc1, acc2] = await ethers.getSigners();
	});

	beforeEach(async function() {
		fake20 = await smock.fake("IERC20");
		data = [
			[fake20.address, fake20.address, ethers.constants.AddressZero, 3323, 100, "0x"],
			[fake20.address, fake20.address, acc2.address, 0, 100, "0x100000"],
			[fake20.address, fake20.address, acc2.address, 100_000, 0, "0x"],
		];

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

		it("Should transfer funds to multi bridge", async function() {
			await bridge.depositERC20BatchTo(data);

			expect(fake20.transferFrom).to.have.callCount(data.length);
			for (let i = 0; i < data.length; i++) {
				const args = fake20.transferFrom.getCall(i).args;
				expect(args.from).to.equal(sender.address);
				expect(args.to).to.equal(bridge.address);
				expect(args.amount).to.equal(data[i][3]);
			}
		});

		it("Should approve funds to bridge", async function() {
			await bridge.depositERC20BatchTo(data);

			expect(fake20.approve).to.have.callCount(data.length);
			for (let i = 0; i < data.length; i++) {
				const args = fake20.approve.getCall(i).args;
				expect(args.spender).to.equal(fakeBridge.address);
				expect(args.amount).to.equal(data[i][3]);
			}
		});

		it("Should pass data to bridge", async function() {
			await bridge.depositERC20BatchTo(data);

			expect(fakeBridge.depositERC20To).to.have.callCount(data.length);
			for (let i = 0; i < data.length; i++) {
				const args = fakeBridge.depositERC20To.getCall(i).args;
				expect(args._l1Token).to.equal(data[i][0]);
				expect(args._l2Token).to.equal(data[i][1]);
				expect(args._to).to.equal(data[i][2] == ethers.constants.AddressZero ? sender.address : data[i][2]);
				expect(args._amount).to.equal(data[i][3]);
				expect(args._l2Gas).to.equal(data[i][4]);
				expect(args._data).to.equal(data[i][5]);
			}
		});

		it("Should not fail for empty list", async function() {
			await expect(
				bridge.depositERC20BatchTo([])
			).to.not.be.reverted;
		});

	});

});
