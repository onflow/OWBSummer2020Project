//pragma solidity >=0.6.0 <0.7.0;
pragma solidity >=0.5.0;

import "@nomiclabs/buidler/console.sol";
import './Creature.sol';
import 'openzeppelin-solidity/contracts/token/ERC721/IERC721Receiver.sol';

contract NFTescrow is IERC721Receiver {


  struct userDetails {
      Creature nftContract;
      address seller;
      uint256 tokenId;
  }
  mapping(uint256 => userDetails) public tokenDetails;
  mapping(address => string) public flowAddresses;

  constructor() public {}


  event _ERC721update(address _from ,uint256 _tokenID, bool _received, bytes _flowAddress);
  function onERC721Received(address operator, address from, uint256 tokenID, bytes memory data) public returns (bytes4) {

      tokenDetails[tokenID] = userDetails({
         nftContract: Creature(msg.sender),
         seller: from,
         tokenId: tokenID
      });
      console.log("token id : ", tokenID);
      console.log("data associated : ");
      console.logBytes(data);
      emit _ERC721update(from, tokenID, true, data);
      return this.onERC721Received.selector;
  }



  event _flowAddressUpdated(address _ethAddress, string _flowAddress);
  function _updateFlowAddress(string memory flowAddress) public {

    flowAddresses[msg.sender] = flowAddress;
    emit _flowAddressUpdated(msg.sender,flowAddress);
  }



  function _transferNFT(uint256 tokenID) public {

     userDetails storage details = tokenDetails[tokenID];
     console.log("arg tokenId :", tokenID);

     require(msg.sender == details.seller);

     console.log("nft transfer starts...");
     details.nftContract.safeTransferFrom(address(this), details.seller, details.tokenId);

     //emit _ERC721update(details.seller, details.tokenId, false, flowAddresses[details.seller]);

     console.log("nft transfer successful !");
     delete tokenDetails[tokenID];
  }


  function getFlowAddress() public view returns (string memory) {
     return flowAddresses[msg.sender];
  }


  function () external payable {
    console.log(msg.sender,"just deposited",msg.value);
  }

  //////////////////////////////////// *_* ////////////////////////////////


    /* event _mintOnFlow(address _flowAddress, uint256 _ethID);
    function _updateFlowAddress(uint256 tokenID, address flowAddress) public {

      // check first if tokenID exists and sender is the original owner
      require(tokenDetails[tokenID].seller == msg.sender);
      flowAddresses[tokenID] = flowAddress;

      emit _mintOnFlow(flowAddress, tokenID);
    } */


  /* function getTokenIds() public returns (uint256[] value) {
    return tokenids;
  } */


  /* function getTokenidsLength() public returns (uint256 _value) {
    console.log("tokensid length :", tokenids.length);
    return tokenids.length;
  } */



  /* function getBalance() public returns (uint256 balance) {
     console.log("Contract balance: ", address(this).balance);
     return address(this).balance;
  } */


}
