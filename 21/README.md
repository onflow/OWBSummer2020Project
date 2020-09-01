# Toke 

## Product

Turn anything into a digital asset
In Toke, anyone can issue any type of digital assets. Turn your Instagram photo into digital assets; upload your 3D model into digital assets; turn your video on YouTube into digital assets.
Toke allows youtubers, streamers, influencers to create their own digital marketplace while creating fan engagement.
Toke create the missing link between internet celebrities and their fans. 

#### Presentations

[Youtube video](https://youtu.be/oB9fA_0sU38)
[Google slides](https://docs.google.com/presentation/d/1Gyw1AHGWFfsjLe8inN2CnYTXI98mZ0-Ti5BR3uOeZZw/edit?usp=sharing)

**Current Limitations**

* The marketplace is not currently setup on the webapp but works with contracts
* The list of ids in a collection is not accurate as there can be duplicate ids
* The security of the contracts has not been double-checked :
    * Especially we need to make sure that admins can't interfer with others NFTs 
* The list functions are present to simplify the flow 
* Data are retrieve through transaction at the moment to ease the implementation, it should be move to event listening


**Ameliorations possible**

* Allow NFTs to be minted without the action of the owner. 
* Functionality to have decaying FanPoints mechanisms. 
* Setup a better way for admins to administrate their digital collections (Define the minitng number limit)

## Technical

### Demo

** Pre-requisites ** 
1. Having the Flow CLI, VS Code extension, dev-wallet, npm installed
1. Clone the repository to your local folder
2. Open VS Code at the root folder
3. Start the emulator
4. Deploy contracts 1 to 5 as per the file name
5. With the command line on the root folder, type ```npm run dev:wallet```
6. In another command line window, on the root folder type ```npm start```

Et voilà the page should be popping up anytime soon.

## Walthrough

1. click login to register an account
2. Setup the admin account 
3. Go to the admin dashboard to create deck, then memento, and finally assign the memento to a deck
4. logout and create another account
5. Setup the customer account
6. Go to the marketplace and follow the other account using the provided address
7. Write down your current address, you will need it 
8. Login again to the admin account and go to the admin dashboard
9. Send a NFT to the other account, using the address previously noted
10. Login to the customer account and go to the marketplace
11. Check that the NFT is here and that you can check how many fan points it gave

## Credits 

* Flow team for their awesome bootcamp, this has been a blast ! 
* Dapperlab / Flow team for their time and support through the bootcamp
* Dapperlab / Flow team for the open-sourcing of NBA TopShot smart contract which has been a huge source of inspiration
* Team 22 for inspiration on the README look when I thought time ran out and I was too tired to come with my own
* Ze to be an awesome teammate ! 

###### PS : Don't focus on the React code this is the first time I used react :see_no_evil:	