// SPDX-License-Identifier: MIT
pragma solidity 0.6.3;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SidWarrior is ERC721, Ownable { 
    
    uint256 public tokenCounter = 0;

    constructor() public ERC721("SidWarrior", "SID") {
        tokenCounter = 0;
    }

    function createCollectible(string[] memory tokenURIArr) public  {
        for (uint256 i = 0; i < tokenURIArr.length; i++) {
            uint256 newItemId = tokenCounter;
            _safeMint(msg.sender, newItemId);
            _setTokenURI(newItemId, tokenURIArr[i]);
            tokenCounter += 1;
        }
    }
}
