// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@eth-optimism/contracts/L1/messaging/IL1ERC20Bridge.sol";

contract L1ERC20BatchBridge {

    IL1ERC20Bridge public bridge;

    struct DepositData {
        address _l1Token;
        address _l2Token;
        address _to;
        uint256 _amount;
        uint32 _l2Gas;
        bytes _data;
    }


    constructor(address _erc20Bridge) {
        bridge = IL1ERC20Bridge(_erc20Bridge);
    }


    // each token needs to be approved by the bridge first.
    // input: array of array
    // each array holds the info about one token
    //
    // each item in the array holds the following info:
    // - address _l1Token,
    // - address _l2Token,
    // - address _to,
    // - uint256 _amount,
    // - uint32 _l2Gas,
    // - bytes calldata _data
    function depositERC20BatchTo(DepositData[] calldata _data) external {
        for (uint256 i = 0; i < _data.length; ++i) {
            DepositData memory depositData = _data[i];

            bridge.depositERC20To(
                depositData._l1Token,
                depositData._l2Token,
                depositData._to == address(0) ? msg.sender : depositData._to,
                depositData._amount,
                depositData._l2Gas,
                depositData._data
            );
        }
    }

}
