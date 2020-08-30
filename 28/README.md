# Lyra Labs App



## OWB Project Details

Live Application: http://lyralabs.io/

Slides: https://docs.google.com/presentation/d/14D4MZzr1gHkf9sIa7acZUwDvIZcrIl8f2VjWPfx63Ts/edit?usp=sharing

Presentation: https://www.youtube.com/watch?v=YiLvBl1mUdk

### Use Case

An application for saving content to read later. Earn tokens and awards for curating content and participating in the community.

For this PoC the tokenomics are as follows
1. Users earn 1 LYRA token for each article they save
2. Users can spend 1 LYRA token to give another user an NFT award.

### Flow Integration

- The appication contracts are all in `/backend/flow/contracts`
- The transactions and scripts are in the backend and frontend respective `flow` directories.

### Application Overview

- **Backend** - GraphQL server running on Postgres using prisma as the ORM level between JS And the database.

- **Frontend** - Next.js app using React, Apollo, and GraphQL

- **Native** - react-native app still in development

# Requirements

- Docker (https://www.docker.com/)
- Node (https://nodejs.org/en/)
- Auth 0 Account (https://auth0.com/)
- Yarn (https://yarnpkg.com/)
- Flow emulator (https://github.com/onflow/flow/blob/master/docs/emulator.md)
- NPM auth token for font awesome account

# Getting Started

1. Clone this repo
2. Install pre-reqs
3. Create top level env file and add real values

    ```
    cp .env.sample .env
    ```

4. Start the flow emulator
    ```
    flow emulator start --init
    ```
# Setup Backend

1. Navigate to backend directory

    ```
    cd backend
    ```

2. Install node dependencies

    
    ```
    yarn
    ```

3. Create env file and add real values

    ```
    cp .env.sample .env
    ```

4. Create 2 Flow Accounts and add their addresses and private keys to `flow-accounts.js` at the top level under the keys `FUNGIBLE_TOKEN_CONTRACT_ACCT` and `NON_FUNGIBLE_TOKEN_AWARD_CONTRACT_ACCT`

4. Deploy token and award contracts
   
   ```
   # Deploy the token contract
   
   cd flow/deploy/scripts/fungible-token
   node setup-fungible-token.js

   # Create main vault on token contract account
   
   node create-main-vault.js

   # Deploy the award contract
   
   cd flow/deploy/scripts/non-fungible-token-award
   node setup-non-fungible-token-award.js

   ```

5.  Add the contract addresses and token contract private key to the `.env` file

6. Start the docker container with Postgres at the top level

    ```
    cd ..
    docker-compose up -d
    ```

7. Migrate the database tables

    ```
    POSTGRES_URL=postgresql://prisma:prisma@0.0.0.0:5432/prisma npx  prisma migrate up --experimental
    ```

8. Generate the prisma client

    ```
    POSTGRES_URL=postgresql://prisma:prisma@0.0.0.0:5432/prisma npx prisma generate
    ```

9. Start the GraphQL server

    ```
    yarn run dev
    ```

# Setup Frontend

1. Navigate to backend directory

    ```
    cd frontend
    ```

2. Install node dependencies

    
    ```
    yarn
    ```

3. Create env file and add real values

    ```
    cp .env.sample .env
    ```

4. Add the same contract addresses you used for the backend

5. Fill in remaining env variables
    - get Auth0 values from dashboard
    - Generate session cookie secret yourself

6. Start the next.js server

    ```
    yarn run dev
    ```

7. Navigate to app at `localhost:3000`
