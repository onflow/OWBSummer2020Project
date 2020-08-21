# Health Crossing

## Technical 

The repo contains 4 directories: `api`, `smart-contracts`, `infra`, and `web`.

### api

The `api` dir is not a true API, but a local dataloader that ingests Apple HealthKit data in CSV form. It successfully marshals the data into stable data structures. It is still missing the steps to create a new wallet for an account and then running the two relevant transactions `setup_account.cdc` and `update_avatar_stats.cdc`.

Future state: Create the necessary endpoints for user onboarding and user interactions for Health Crossing transactions.

### smart-contracts

Playground: https://play.onflow.org/4d94b80c-62d7-45b2-89fc-cba2c8b3fbdf

The `smart-contracts` is the core Cadence contracts.

Future state: Create a robust progression system and CRUD APIs for the varying NFTs. Our work is heavily dependent on unique creations of avatar outfit NFTs.

### infra

The `infra` dir uses the AWS nodejs CDK to create an infrastructure stack on AWS. At the moment it only deploys an S3 that stores users' HealthKit data in CSV format.

### web

The `web` dir is still a barebones NextJS project. The initial goal was to create an onboarding UI for users to create their avatars, see their avatars, and update their avatars. Frankly speaking, it may be better to start with a native mobile app to read data directly from users' HealthKit store.
