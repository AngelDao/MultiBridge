// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@eth-optimism/contracts/L1/messaging/IL1ERC20Bridge.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";

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


    function depositERC20BatchTo(DepositData[] calldata _data) external {
        for (uint256 i = 0; i < _data.length; ++i) {
            DepositData memory depositData = _data[i];

            IERC20(depositData._l1Token).transferFrom(msg.sender, address(this), depositData._amount);
            IERC20(depositData._l1Token).approve(address(bridge), depositData._amount);

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
