// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";
import "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import { ISuperfluid, ISuperToken } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import "./SuperfluidWalletFactory.sol";
import "./SuperfluidWrapperRegistry.sol";

contract SuperfluidWallet is Ownable, Initializable {
	using CFAv1Library for CFAv1Library.InitData;

	address internal _wrapperRegistry;

	CFAv1Library.InitData public cfaV1;

	struct StreamInfo {
		address tokenAddress;
		address to;
		int96 flowRate;
	}


	constructor() Ownable() {

	}

	function initialize(address owner, address wrapperRegistry, address host) external initializer {
		_transferOwnership(owner);
		_wrapperRegistry = wrapperRegistry;

		cfaV1 = CFAv1Library.InitData(
			ISuperfluid(host),
			IConstantFlowAgreementV1(
				address(ISuperfluid(host).getAgreementClass(
					keccak256("org.superfluid-finance.agreements.ConstantFlowAgreement.v1")
				))
			)
		);
	}


	function wrapAndStartStreams(StreamInfo[] calldata _streamInfo) external onlyOwner {
		for (uint256 i = 0; i < _streamInfo.length; ++i) {
			StreamInfo memory info = _streamInfo[i];

			// get balance of unwrapped token
			uint256 balanceToWrap = IERC20(info.tokenAddress).balanceOf(address(this));

			// get wrapper address (superfluid token)
			address wrapper = SuperfluidWrapperRegistry(_wrapperRegistry).superfluidWrapperAddress(info.tokenAddress);

			// wrap if needed
			if (balanceToWrap > 0) {
				// approve wrapper for transfer
				IERC20(info.tokenAddress).approve(wrapper, balanceToWrap);

				// wrap token to superfluid token
				ISuperToken(wrapper).upgrade(balanceToWrap);
			}

			// open stream for given address
			CFAv1Library.createFlow(cfaV1, info.to, ISuperToken(wrapper), info.flowRate);
		}
	}

	function closeStream() external onlyOwner {
		// TODO:
	}

	function startStream() external onlyOwner {
		// TODO:
	}

	function updateStream() external onlyOwner {
		// TODO:
	}

}
