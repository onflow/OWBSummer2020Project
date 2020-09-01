# FlowPassport Smart Contract

## Introduction

FlowPassport is a smart contract written in Cadence for the Flow blockchain.

FlowPassport stemmed from an idea that every governmental body should come together and form an association dedicated to digitalizing passports and cross country travel documentation. The two main problems it solves are removing the need for physical passports and to unify the world's travel documentation on a common blockchain network for ease of verification and travel processes. 

The FlowPassport smart contract's goal is to operate as a global digital passport smart contract on the Flow blockchain and carry out automated tasks like creating and issuing passports to new applicants and updating Visa statuses and travel logs as citizens depart and enter countries around the world.

This proof of concept (PoC) showcases how the Flow resource can be used by an authorised member to create and issue a passport resource to a citizen and update its travel logs through single and multi signature transactions by the admin and citizen. It also demonstrates how other accounts can utilize capabilities created by the admin. 

## Presentations

- YouTube video presentation: https://youtu.be/7wM7FvY9qN4

- Google Slides presentation: https://docs.google.com/presentation/d/e/2PACX-1vRtSJ4wENRmPfS503BxoAOkH2gqQwC5dM1I9NzeGBODt1hPSpYQ25djbhfcVmHwZeeNJpT_T6zDw2nC/pub?start=false&loop=false&delayms=3000&slide=id.g935c3bbc57_0_10

## Testing FlowPassport

Visit the contract's Flow Playground here: https://play.onflow.org/3ad97f1c-87af-4da6-a561-0bbbfa3f22b4

or follow the workflow below. 

## Workflow 

*Deploy `flowpassport.cdc` on Flow Playground:* 

1. The FlowPassport Admin first deploys the smart contract, which contains two resources: Passport and Admin. 
    - Passport resource contains the informations for a citizens passport and will be issues to a citizen once created.
        For this PoC, a passport contains the following information of a citizen: 
        - Name : String
        - Date of Birth : String
        - Gender : String
        - Citizenship : String
        - Visa : { String : bool } 
        - Travel Log : [ String ] 
    - Admin resource allows for authorized admins to utilize its Admin resource to create passports.

*Transactions:*

1. The FlowPassport Admin issues the new passport to the respective citizen using the `1_create_and_issue_passport.cdc` transaction.

2. For the first travel, a citizen departs and tries to enter a country without a Visa via the `2_citizen_travels.cdc` transaction
    This transaction is expected to fail to demonstrate what happens to a citizen who does not have a valid Visa in his passport.

3. The Admin updates the Visa status for the citizen's passport via `3_update_visa.cdc` transaction.

4. The citizen tries transaction `2_citizen_travels.cdc` again and gets a successful entry to the country. 

5. An external admin can utilize the created capability to call the createPassport function using the `4_use_admin_capability.cdc` transaction.

## Limitations and future improvements

- Visas current do not have expiry dates. Visas should automatically be revoked by the smart contract once expired.
- Current passport function required multiple signatures which can be cumbersome. Potentially have smart contract carry out more pre-conditions and checks to automate processes. 
