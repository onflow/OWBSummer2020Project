//pragma solidity >=0.6.0 <0.7.0;
pragma solidity >=0.5.0;

import "@nomiclabs/buidler/console.sol";
import './Creature.sol';
import 'openzeppelin-solidity/contracts/token/ERC721/IERC721Receiver.sol';

contract NFTescrow is IERC721Receiver {


  struct userDetails {
      Creature nftContract;
      address user;
      uint256 tokenId;
  }
  mapping(uint256 => userDetails) public tokenDetails;

  constructor() public {}


  event _ERC721update(address _from ,uint256 _tokenID, bytes _flowAddress);
  function onERC721Received(address operator, address from, uint256 tokenID, bytes memory data) public returns (bytes4) {

      tokenDetails[tokenID] = userDetails({
         nftContract: Creature(msg.sender),
         user: from,
         tokenId: tokenID
      });
      console.log("token id : ", tokenID);
      console.logBytes(data);
      emit _ERC721update(from, tokenID, data);
      return this.onERC721Received.selector;
  }


  function _transferNFT(uint256 tokenID) public {

     userDetails storage details = tokenDetails[tokenID];
     console.log("arg tokenId :", tokenID);

     require(msg.sender == details.user);

     console.log("nft transfer starts...");
     details.nftContract.safeTransferFrom(address(this), details.user, details.tokenId);

     console.log("nft transfer successful !");
     delete tokenDetails[tokenID];
  }


  function () external payable {
    console.log(msg.sender,"just deposited",msg.value);
  }

}
