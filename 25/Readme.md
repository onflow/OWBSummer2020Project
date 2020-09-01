# Fantasy League
With Fantasy League game we are aiming to create a marketplace and fantasy card game for which we’ll be building a platform where users can buy and sell their card collectibles, as well as play with the same in the pool game.

![](https://media.giphy.com/media/3ofT5QM8iEcBwbEwQU/giphy.gif)

- [Flow playground](https://play.onflow.org/5f0ea0c9-79a3-42c9-a6e9-7fec9f31f644)
- [Google Slide](https://docs.google.com/presentation/d/1RLfhmsiTg1sLJPRL9AD67TMFzB3A1MeUrw7RI6qaikU/edit?usp=sharing )
- [Youtube video](https://youtu.be/DM9uMi4ZIV0)

## How to run the demo on the Flow playground

- Deploy CricketFlow contract as the first (0x01) account
- Run mintToken.cdc from admin account 0x01
- Run createCollection.cdc from account 0x02
- User 0x01 calls transferNFT.cdc to transfer NFT to 0x02
- Run script1.cdc to check status of accounts - User 0x02 will have the NFT

## How to run locally

### Initialisation
```
yarn global add @onflow/dev-wallet
```
```
fcl-wallet
```

### Create React app
```
npx create-react-app  nftToken
```

### Install Flow JS SDK packages
```
cd nftToken
```
```
yarn add @onflow/fcl @onflow/sdk @onflow/types
```
```
flow init
```
This will create flow.json file in the project root directiory, which later will be used by dev wallet. The content of the file should look similar to this:
```
{
	"accounts": {
		"service": {
			"address": "f8d6e0586b0a20c7",
			"privateKey": "96b3a941ea3b836e4149ff157dcc8703a8b3fe76f920e1f000d8235606348f51",
			"sigAlgorithm": "ECDSA_P256",
			"hashAlgorithm": "SHA3_256"
		}
	}
}
```
Copy the value under the privateKey name to buffer, then open package.json file and under put 2 more scripts:
```
"dev:wallet": "set PK=96b3a941ea3b836e4149ff157dcc8703a8b3fe76f920e1f000d8235606348f51 && fcl-wallet",
"local:emulator": "flow emulator start -v --http-port 8080 -p 3570", 
``` 
### Start up server
Run each command in the different tab
```
yarn start
```
```
yarn local:emulator
```
```
yarn dev:wallet
```

After the bundling is complete you newly created React applications should be running on https://localhost:3000 and you should see the page as follows after clicking on Login.

<img width=600 src="https://github.com/DappCoderr/owb-project/blob/master/public/2020-08-29%20(1).png"/>

## Current limitation and potential future addtion

### Limitations

For the demo purpose, both accounts can mint NFTs which needs to be removed for production use.

### Future additions

- Ability to play game & join pool
- Ability to sell NFTs for game tokens

## Team
- Hardik Sharma, Tech 
- Nirbhik Jangid, Product
- Ekta Sharma, Product 
- Kartikay Sharma, Tech 

## Join our Community to provide feedback or for queries 
https://discord.gg/4xvr8Vf
