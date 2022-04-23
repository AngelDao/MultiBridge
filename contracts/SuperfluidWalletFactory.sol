// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./SuperfluidWallet.sol";

contract SuperfluidWalletFactory {
	using Clones for address;

	address immutable internal _masterImplementation;
	address immutable internal _wrapperRegistry;
	address immutable internal _superfluidHost;

	event NewWallet(address indexed walletAddress, address indexed owner);


	constructor(address wrapperRegistry, address superfluidHost) {
		_masterImplementation = address(new SuperfluidWallet());
		_wrapperRegistry = wrapperRegistry;
		_superfluidHost = superfluidHost;
	}


	function deployNewWallet() external {
		address walletAddress = _masterImplementation.clone();

		SuperfluidWallet(walletAddress).initialize(msg.sender, _wrapperRegistry, _superfluidHost);

		emit NewWallet(walletAddress, msg.sender);
	}
}
