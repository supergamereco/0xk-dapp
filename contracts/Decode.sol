// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Decode{

    //verify signature
    function decode(bytes memory sign,bytes32 msgHash) internal pure returns(address){
        bytes32 r = bytesToBytes32(slice(sign,0,32));
        bytes32 s = bytesToBytes32(slice(sign,32,32));
        uint8 v = uint8(slice(sign,64,1)[0]);
        address singer = ecrecoverDecode(msgHash,r,s,v);
        return singer;
    }

    function slice(bytes memory data,uint start,uint len) internal pure returns(bytes memory){
        bytes memory b=new bytes(len);
        for(uint i=0;i<len;i++){
            b[i]=data[i+start];
        }
        return b;
    }

    function ecrecoverDecode(bytes32 msgHash, bytes32 r,bytes32 s, uint8 v) internal pure returns(address addr){
        if (v < 27) {
            v += 27;
        }

        addr = ecrecover(msgHash, v, r, s);
    }

    function bytesToBytes32(bytes memory source) internal pure returns(bytes32 result){
        assembly{
            result :=mload(add(source,32))
        }
    }

    function appendString(string memory a, string memory b) public pure returns (string memory) {
        return string(abi.encodePacked(a,b));
    }

}
