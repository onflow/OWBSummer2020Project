# CertaFox - The future of professional certifications

## Summary
CertaFox is a service that makes it easy to create and share certificates. With CertaFox you can be sure that a certificate is valid without going through the exhaustive work of checking references.

## Deliverables
[Product Video](https://youtu.be/hhhqK6ub7nk)
[Presentation](https://docs.google.com/presentation/d/1WBoBpX7h7j0b2pnm5RsJZHECfQqSxWuzM9REIOdx5bw/edit?usp=sharing)
[Project Repository](https://github.com/Lepozepo/owb-27)

## Limitations
The application currently has dummy data and some contracts built. We did not have enough time to build the integration between the contracts and the UI.

## Potential
The contracts are pretty narrow in scope today, they essentially make it easy for everyone to create certificates as NFTs and that's it. Future features could make for more complex certificates where:
- Certificates can expire
- Certificates can only be transferred once and/or only have one owner
- Certificates can be signed by multiple addresses
- Certificates can hold sub certificates

## Prototype
You can find the very rough prototype [here](https://www.figma.com/file/T8S9uQVoa1aZVQ6me2VNZs/3-interfaces?node-id=0%3A1)

## External Dependencies
To run the project for development you need to have these external dependencies installed in your machine:
  - [Flow CLI](https://github.com/onflow/flow/blob/master/docs/cli.md#installation)

## Running the project

### Step 1 `yarn flow:start`
Requires [flow](https://github.com/onflow/flow/blob/master/docs/cli.md#installation) to work. Starts up the local blockchain.

### Step 2 `yarn flow:stage`
This will create the base contract account

### Step 3 `yarn flow:wallet`
Starts up the local wallet manager

### Step 4 `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
