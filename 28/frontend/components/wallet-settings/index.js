import React, { useState, useEffect } from "react";
import * as sdk from "@onflow/sdk";
import { useMutation } from "@apollo/react-hooks";
import { ASSOCIATE_WALLET } from "@data/mutations";
import JSONPretty from "react-json-pretty";
import { toast } from "react-toastify";
import { CURRENT_USER_QUERY } from "../../data/queries";
import CoralButton from "@library/components/buttons/coral";
import MintButton from "@library/components/buttons/mint";
import GradientButton from "@library/components/buttons/gradient";
import checkReference from "../../flow/scripts/check-ref.cdc";
import checkCollection from "../../flow/scripts/check-collection.cdc";
import checkActiveWallet from "../../flow/scripts/check-active-wallet.cdc";
import vaultBalance from "../../flow/scripts/vault-balance.cdc";
import getCollectionItems from "../../flow/scripts/get-collection-items.cdc";
import userVault from "../../flow/transactions/user-vault.cdc";
import setupNFTCollection from "../../flow/transactions/setup-nft-collection.cdc";
import styled from "@emotion/styled";
import * as fcl from "@onflow/fcl";
import { WHITE, LIGHT_CORAL, MAGIC_MINT } from "@style/colors";

fcl
  .config()
  .put("challenge.handshake", "http://localhost:8701/flow/authenticate");

const FUNGIBLE_TOKEN_CONTRACT_ADDRESS = "01cf0e2f2f715450";
const NON_FUNGIBLE_TOKEN_CONTRACT_ADDRESS = "f3fcd2c1a78f5eee";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  borderRadius: 3,
  backgroundColor: WHITE,
  boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)",
  padding: "1rem",
});

const WalletSettings = ({ currentUser }) => {
  console.log("currentUser", currentUser);
  // const [walletUser, setWalletUser] = useState(null);
  // const [vaultIsSetup, setVaultIsSetup] = useState(false);
  // const [collectionIsSetup, setCollectionIsSetup] = useState(false);
  // const [walletBalance, setWalletBalance] = useState(null);
  // const [walletCollection, setWalletCollection] = useState(null);

  // let pollId = null;
  // const startBalancePoll = async () => {
  //   const balance = await getUserBalance();
  //   setWalletBalance(balance);
  //   pollId = setTimeout(startBalancePoll, 2000);
  // };

  // useEffect(
  //   () =>
  //     fcl.currentUser().subscribe(async (user) => {
  //       if (user.loggedIn) {
  //         setWalletUser(user);
  //         // Check if the wallet is set up yet
  //         const vaultStatus = await checkUserVaultStatus();
  //         setVaultIsSetup(vaultStatus);
  //         if (vaultStatus) {
  //           startBalancePoll();
  //         }
  //         const collectionStatus = await checkUserCollectionStatus();
  //         setCollectionIsSetup(collectionStatus);
  //         if (collectionStatus) {
  //           getUserCollection();
  //         }
  //       } else {
  //         console.log("is not logged in");
  //       }
  //     }),
  //   []
  // );

  // const [associateWallet, { data, loading, error }] = useMutation(
  //   ASSOCIATE_WALLET,
  //   {
  //     update: (cache, { data }) => {
  //       const { me: currentUserData } = cache.readQuery({
  //         query: CURRENT_USER_QUERY,
  //       });
  //       cache.writeQuery({
  //         query: CURRENT_USER_QUERY,
  //         data: { me: { ...currentUserData, ...data.associateWallet } },
  //       });
  //     },
  //     onError: () => {
  //       toast.error("😳Ekkk! Failed to associate wallet.", {
  //         position: "bottom-left",
  //       });
  //     },
  //   }
  // );

  // const walletConnected = walletUser && walletUser.loggedIn;
  // const walletNotConnected =
  //   walletUser === null || (walletUser && !walletUser.loggedIn);

  // const getAddress = (user, nullPrefix = true) => {
  //   return nullPrefix ? `0x${user.addr}` : user.addr;
  // };

  // const generateCode = async (rawCode, match) => {
  //   if (!match) {
  //     return rawCode;
  //   }
  //   const { query } = match;
  //   return rawCode.replace(query, (item) => {
  //     return match[item];
  //   });
  // };

  // const getUserBalance = async () => {
  //   const user = fcl.currentUser();
  //   const snapshot = await user.snapshot();
  //   const address = getAddress(snapshot);
  //   const contractAddress = "0x01cf0e2f2f715450";
  //   const scriptCode = await generateCode(vaultBalance, {
  //     query: /(0x01|0x02)/g,
  //     "0x01": contractAddress,
  //     "0x02": address,
  //   });
  //   const script = sdk.script`${scriptCode}`;
  //   const response = await fcl.send([script]);
  //   const balance = await fcl.decode(response);
  //   return balance;
  // };

  // const getUserCollection = async () => {
  //   console.log("calling getUserCollection");
  //   const user = fcl.currentUser();
  //   const snapshot = await user.snapshot();
  //   const address = getAddress(snapshot);
  //   const contractAddress = "0xf3fcd2c1a78f5eee";
  //   const scriptCode = await generateCode(getCollectionItems, {
  //     query: /(0x01|0x02)/g,
  //     "0x01": contractAddress,
  //     "0x02": address,
  //   });
  //   const script = sdk.script`${scriptCode}`;
  //   const response = await fcl.send([script]);
  //   const items = await fcl.decode(response);
  //   setWalletCollection(items);
  // };

  // const setupUserVault = async () => {
  //   // Create the user vault
  //   const user = fcl.currentUser();
  //   const { authorization } = user;
  //   const snapshot = await user.snapshot();
  //   const address = getAddress(snapshot);
  //   const contractAddress = "0x01cf0e2f2f715450";
  //   const initCode = await generateCode(userVault, {
  //     query: /(0x01)/g,
  //     "0x01": contractAddress,
  //   });
  //   try {
  //     const initResponse = await fcl.send(
  //       [
  //         sdk.transaction`${initCode}`,
  //         fcl.proposer(authorization),
  //         fcl.payer(authorization),
  //         fcl.authorizations([authorization]),
  //         fcl.limit(100),
  //       ],
  //       {
  //         node: "http://localhost:8080",
  //       }
  //     );
  //     console.log("setupUserVault initResponse", initResponse);
  //   } catch (e) {
  //     console.log("setupUserVault caught error", e);
  //   }
  // };

  // const checkUserVaultStatus = async () => {
  //   const user = fcl.currentUser();
  //   const snapshot = await user.snapshot();
  //   const address = getAddress(snapshot);
  //   const contractAddress = "0x01cf0e2f2f715450";
  //   const scriptCode = await generateCode(checkReference, {
  //     query: /(0x01|0x02)/g,
  //     "0x01": contractAddress,
  //     "0x02": address,
  //   });
  //   const script = sdk.script`${scriptCode}`;
  //   const response = await fcl.send([script]);
  //   const checkResult = await fcl.decode(response);
  //   return checkResult;
  // };

  // const checkUserCollectionStatus = async () => {
  //   console.log("---- calling checkUserCollectionStatus ----");
  //   const user = fcl.currentUser();
  //   const snapshot = await user.snapshot();
  //   const address = getAddress(snapshot);
  //   const contractAddress = "0xf3fcd2c1a78f5eee";
  //   const scriptCode = await generateCode(checkCollection, {
  //     query: /(0x01|0x02)/g,
  //     "0x01": contractAddress,
  //     "0x02": address,
  //   });

  //   console.log("scriptCode", scriptCode);
  //   const script = sdk.script`${scriptCode}`;
  //   const response = await fcl.send([script]);
  //   const checkResult = await fcl.decode(response);
  //   return checkResult;
  // };

  // const setupUserCollection = async () => {
  //   // Create the user vault
  //   const user = fcl.currentUser();
  //   const { authorization } = user;
  //   const snapshot = await user.snapshot();
  //   const address = getAddress(snapshot);
  //   const contractAddress = "0xf3fcd2c1a78f5eee";
  //   const initCode = await generateCode(setupNFTCollection, {
  //     query: /(0x01)/g,
  //     "0x01": contractAddress,
  //   });
  //   try {
  //     const initResponse = await fcl.send(
  //       [
  //         sdk.transaction`${initCode}`,
  //         fcl.proposer(authorization),
  //         fcl.payer(authorization),
  //         fcl.authorizations([authorization]),
  //         fcl.limit(100),
  //       ],
  //       {
  //         node: "http://localhost:8080",
  //       }
  //     );
  //     console.log("setupNFTCollection initResponse", initResponse);
  //   } catch (e) {
  //     console.log("setupNFTCollection caught error", e);
  //   }
  // };

  const connectActiveWalletToLyraLabs = async () => {
    associateWallet({
      variables: {
        address: walletUser.addr,
      },
    });
  };

  // const checkActiveWallet = async () => {
  //   // Checks if the active wallet is setup
  //   const user = fcl.currentUser();
  //   const snapshot = await user.snapshot();
  //   const address = getAddress(snapshot);
  //   const scriptCode = await generateCode(checkActiveWallet, {
  //     query: /(0x01|0x02|0x03)/g,
  //     "0x01": `0x${FUNGIBLE_TOKEN_CONTRACT_ADDRESS}`,
  //     "0x02": `0x${NON_FUNGIBLE_TOKEN_CONTRACT_ADDRESS}`,
  //     "0x03": address,
  //   });
  //   const script = sdk.script`${scriptCode}`;
  //   const response = await fcl.send([script]);
  //   const activeWalletStatus = await fcl.decode(response);
  //   return activeWalletStatus;
  // };

  // const setupActiveWallet = async () => {
  //   // Creates a vault and collection in the active wallet
  // };

  return (
    <Container>
      {currentUser &&
        currentUser.walletAddress &&
        currentUser.walletIsSetup && (
          <div>{`Current Associated Wallet Address: ${currentUser.walletAddress}`}</div>
        )}
      {walletConnected && walletUser && (
        <div>{`Active Wallet Address: ${walletUser.addr}`}</div>
      )}
      {walletConnected && vaultIsSetup && walletBalance && (
        <div>{`Balance: ${walletBalance} `}</div>
      )}
      {walletConnected && collectionIsSetup && walletCollection && (
        <div>{`Collection: ${JSON.stringify(walletCollection)}`}</div>
      )}
      {walletConnected &&
        walletUser &&
        walletUser.addr &&
        currentUser &&
        !currentUser.walletIsSetup &&
        !currentUser.walletAddress && (
          <div>
            <CoralButton onClick={connectActiveWalletToLyraLabs}>
              Connect Active Wallet to LyraLabs account
            </CoralButton>
          </div>
        )}

      <div>-------------------------------------</div>
      <div>
        {walletNotConnected && (
          <CoralButton onClick={fcl.authenticate}>Connect Wallet</CoralButton>
        )}
        <br />
        <br />
        {walletConnected && !vaultIsSetup && (
          <CoralButton onClick={setupUserVault}>Setup Vault</CoralButton>
        )}
        <br />
        <br />
        {walletConnected && !collectionIsSetup && (
          <CoralButton onClick={setupUserCollection}>
            Setup Collection
          </CoralButton>
        )}

        {/* {walletConnected && (
          <div style={{ fontSize: 14 }}>
            <JSONPretty id="json-pretty" data={walletUser}></JSONPretty>
          </div>
        )} */}
      </div>
    </Container>
  );
};

export default WalletSettings;
