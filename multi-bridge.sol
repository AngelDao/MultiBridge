// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Bridge {
    function depositERC20To(
        address _l1Token,
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external ;
}


contract MutliCaller {

    Bridge bridge;

    constructor(address _address) {
        bridge = Bridge(_address);
    }

    function bytesToAddress(bytes memory bys) private pure returns (address addr) {
        assembly {
            addr := mload(add(bys, 32))
        } 
    }

    function toUint256(bytes memory _bytes)   
        internal
        pure
        returns (uint256 value) {

            assembly {
            value := mload(add(_bytes, 0x20))
            }
        }

        function toUint32(bytes memory _bytes)   
        internal
        pure
        returns (uint32 value) {

            assembly {
            value := mload(add(_bytes, 0x04))
            }
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
    function multiBridge(bytes[][] calldata _data) external {
        for (uint i = 0; i < _data.length; i++) {
            bytes[] memory callData = _data[i];

            bridge.depositERC20To(
                bytesToAddress(callData[0]),
                bytesToAddress(callData[1]),
                bytesToAddress(callData[2]),
                toUint256(callData[3]),
                toUint32(callData[4]),
                callData[5]);        
        }
    }
}
