# Kitty Vortex & Zeemz Chests
The Kitty Vortex is a loot drop game made for CryptoKitty owners. When CryptoKitties travel through the Kitty Vortex, 
they get the chance to earn Zeemz Chests that can be bought/sold, gifted, opened, or dropped. Every Zeemz Chest has treasure inside, 
though not all that glitters are Zeemz Stars. Some Zeemz Chests have Zeemz Viruses inside. It'll take a Star Forged Zeemz Collar 
to combat the negative effects of a Zeemz Virus.


### Presentation
[Kitty Vortex Product Video (1:06)](https://youtu.be/zuB1waK64SM)<br />
[Kitty Vortex Technical Video (4:21)](https://youtu.be/p0BLXZvk99s)<br />


### Pitchdeck
[Kitty Vortex Slides](https://docs.google.com/presentation/d/1R7K78iVI2lzskXgsBCJua_m-A2T19r4c6Ti02CuGtVE/edit?usp=sharing)

### Flow Playground
https://play.onflow.org/798912ca-aefa-4f20-91db-c05e452ecc33

### PoC Website 
https://sites.google.com/view/kitty-vortex-travel

## Project Review
CryptoKitties are digital collectibles that can be bred to create more digital collectibles. The Kitty Vortex offers owners of CKs
an opportunity to play inside an RPG alternate universe (The Pu'Shing Bhu'Tons 'Verse). There are many dangers lurking in the 'verse, 
those who choose to travel through the Kitty Vortex can receive Zeemz Chests which each have a random chance of holding Collars, zCollars, 
zStars, and zViruses. 


### Technical: How It Works
1. Load zChest.cdc in 0x01 account in Flow emulator
2. Deploy zChest.cdc, receive "deployed" message
3. Add Transaction1.cdc, and then click Send, receive "You found a Zeemz Chest!"
4. Load ForgeVault.cdc in 0x02 account in Flow emulator
5. Deploy ForgeVault.cdc, receive "deployed" message
6. Open Transaction2.cdc, and then click Send, receive "NFT Minted and deposited to Account 2's Collection", repeat Send 1x
7. Open Script1.cdc, and then Execute it, receive an array "Account 2 NFTs" [1, 2]
8. Open Transaction3.cdc, choose 0x01 as signer, and then click Send, receive "Collection created for account 1" and "Capability created"
9. Open Transaction4.cdc, choose 0x02 as signer, and then click Send, receive "NFT ID 1 transferred from account 2 to account 1"
10. Open Script2.cdc, and then Execute it, receive an array "Account 1 NFTs" [1] and "Account 2 NFTs" [2]
11. Congrats! You have two accounts with a Zeemz Chest in each! 


### Product: How It Will Work
1. A logged in CryptoKitty owner finds a Zeemz Chest inside the Kitty Vortex.
2. The CK owner chooses to:
    - Keep the chest OR Drop the chest
        - If they keep the chest, then they can Open it or Gift it
        - If they drop the chest, then it returns to the Kitty Vortex
3. The CK owner chooses to:
    - Open the chest OR Gift the chest
        - If they open the chest, then they'll receive a random treasure (zCollar, zStar, zVirus)
		    - When they receive a zCollar or a zStar, then they receive MP and HP bonuses
			- When they receive a zVirus, they take a MP and HP hit
		- If they gift the chest, then they'll transfer ownership of the unopened chest to another account
4. A CryptoKitty that is equipped with a zCollar will be able to enter the Kitty Vortex to help fight the virus


### Current Limitations
1. I wasn't sure how to make the Forge Vault accept zStars and Collars in order to create the zCollars. I attempted to add them both as deposits, and met with resistance. Currently, the zCollar is created in the Forge Vault, and the Forge is a glint in another repo's eye. 
2. The frontend uses Google Sites which is not friendly to custom NodeJS code, so once the smart contracts are finalized, then the frontend needs
to move to Firebase.


### Future Additions
1. Star and Virus rarity, typology, quests
2. Firebase PWA
3. Allow user to name their stars
4. Link in the images (virus, chests, stars)
5. Attach the scienc-y stats to the [viruses](https://github.com/pushingbhutons/kittyVortex/blob/master/cdc/zvirus.cdc)

NOTE: 
The in-depth future plans are written as notes inside each CDC contract located in the following repo:
https://github.com/pushingbhutons/kittyVortex/cdc/README.md




