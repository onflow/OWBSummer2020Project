# Health Crossing

## Product

Health Crossing is a fun, engaging, easy to start way to get fit, healthy & happy in the digital age. Users create custom Avatars that change with their health behavior & unlock custom wearable NFTs for their Avatars as they complete milestone when trying to build new healthy and happy habits.

Crossing provides support to users on their journey with tips and motivation from a combination of real-world and digital coaches. Crossing will create a community of designers to provide a marketplace for the most original and inspiring NFTs for users to earn and trade NFTs.

Our aim is to create a great platform for users to convert their real world behaviour and experiences into a digital one and integrate with games where a level up in your real world habits leads to level up in your in game abilities.

#### Recorded Presentation

[Youtube presentation video](https://www.youtube.com/watch?v=94Hp0FWP3_0&feature=youtu.be)

#### Slides Presentation

[Presentation slides](https://drive.google.com/file/d/1-Xq7C1EddjBRRxrKGXhEjH4TWSs6B6PQ/view?usp=sharing)

**Current Limitations**

- Onboarding of users is fairly slow and Avatar is created manually | Future plan - Avatar creation module for users with goal setting automated
- Update of Avatars is done by a designer manually | Future plan - Avatar creation module for users with goal setting automated
- Motivation communication and reminders done manually | Future plan - Machine learning and NLP based bots

**Future Additions**

- Create community to facilitate peer to peer encouragement and habit focused micro-communities
- Automated Avatar updates - e.g. press an action in app which updates profile pictures live
- Investigate Avatar standards e.g. can we have a central Avatar identity across platforms
- Create a Flow-based NFT marketplace for collectables
- Building community of designers and Avatar designer developer kit

## Technical

### Demo

https://play.onflow.org/4d94b80c-62d7-45b2-89fc-cba2c8b3fbdf

1. Deploy `HealthCrossingCore` to `0x01`
2. Setup any account missing an Avatar with txn `1_setup_account`
3. Ensure you see an Avatar in your resources window
4. Update an account's health stats with txn `2_update_avatar_progress`
5. See that your Avatar stats have been updated and also with new NFTs. Note: A Playground bug exists that may set your Avatar to null. [GH#54](!https://github.com/onflow/flow-playground/issues/54).

The repo itself contains 4 directories: `api`, `smart-contracts`, `infra`, and `web`.

### _api_

The `api` dir is not a true API, but has a local dataloader that ingests Apple HealthKit data in CSV form. It successfully marshals the data into stable data structures. It is still missing the steps that creates a new wallet for an account and runs the two relevant transactions `setup_account.cdc` and `update_avatar_stats.cdc`.

Future state: Create the necessary endpoints for user onboarding and user interactions for Health Crossing transactions.

### _smart-contracts_

Playground: https://play.onflow.org/4d94b80c-62d7-45b2-89fc-cba2c8b3fbdf

The `smart-contracts` is the core Cadence contracts.

Future state: Create a robust progression system and CRUD APIs for the varying NFTs. Our work is heavily dependent on unique creations of avatar outfit NFTs.

### _infra_

The `infra` dir uses the AWS nodejs CDK to create an infrastructure stack on AWS. At the moment it only deploys an S3 that stores users' HealthKit data in CSV format.

### _web_

The `web` dir is still a barebones NextJS project. The initial goal was to create an onboarding UI for users to create their avatars, see their avatars, and update their avatars. Frankly speaking, it may be better to start with a native mobile app to read data directly from users' HealthKit store.
