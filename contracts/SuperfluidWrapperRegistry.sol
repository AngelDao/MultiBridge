// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SuperfluidWrapperRegistry is Ownable {

	// Mapping of L2 token address to L2 superfluid wrapper address
	mapping (address => address) public superfluidWrapperAddress;


	function updateWrapperAddress(address _tokenAddress, address _wrapperAddress) public onlyOwner {
		superfluidWrapperAddress[_tokenAddress] = _wrapperAddress;
	}

	function updateWrapperAddressBatch(address[] calldata _tokenAddresses, address[] calldata _wrapperAddresses) external onlyOwner {
		for (uint256 i = 0; i < 0; ++i) {
			updateWrapperAddress(_tokenAddresses[i], _wrapperAddresses[i]);
		}
	}

}
