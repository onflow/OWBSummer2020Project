import React, { useState } from "react";

import * as fcl from "@onflow/fcl";
import * as sdk from "@onflow/sdk";

import { useMutation } from "@apollo/react-hooks";
import { ASSOCIATE_WALLET } from "@data/mutations";
import { toast } from "react-toastify";
import { CURRENT_USER_QUERY } from "../../data/queries";
import flowConfig from "@config/flow";

import checkReference from "../../flow/scripts/check-ref.cdc";
import checkCollection from "../../flow/scripts/check-collection.cdc";
import vaultBalance from "../../flow/scripts/vault-balance.cdc";
import getCollectionItems from "../../flow/scripts/get-collection-items.cdc";
import giveNFTAward from "../../flow/transactions/give-nft-award.cdc";

import setupUserWallet from "../../flow/transactions/setup-user-wallet.cdc";

export const WalletContext = React.createContext({});

const { TOKEN_CONTRACT_ADDRESS, AWARD_CONTRACT_ADDRESS } = flowConfig;

const getAddress = (user, nullPrefix = true) => {
  return nullPrefix ? `0x${user.addr}` : user.addr;
};

const generateCode = async (rawCode, match) => {
  if (!match) {
    return rawCode;
  }
  const { query } = match;
  return rawCode.replace(query, (item) => {
    return match[item];
  });
};

export const withWallet = (Component) => {
  const WithWallet = () => {
    const [walletUser, setWalletUser] = useState(null);
    const [vaultIsSetup, setVaultIsSetup] = useState(false);
    const [collectionIsSetup, setCollectionIsSetup] = useState(false);
    const [walletBalance, setWalletBalance] = useState(null);
    const [walletCollection, setWalletCollection] = useState(null);
    const [authHandlerIsSetup, setAuthHandlerIsSetup] = useState(false);
    const [getResourcesComplete, setGetResourcesComplete] = useState(false);

    const [status, setStatus] = useState(null);
    const [transaction, setTransaction] = useState(null);

    const walletConnected = walletUser && walletUser.loggedIn;
    const walletNotConnected =
      walletUser === null || (walletUser && !walletUser.loggedIn);

    const setupFCLAuthHandler = () => {
      fcl.currentUser().subscribe(async (user) => {
        if (user.loggedIn) {
          setWalletUser(user);
          getWalletResources();
        }
      });
    };

    const getWalletResources = async () => {
      const vaultStatus = await checkUserVaultStatus();
      setVaultIsSetup(vaultStatus);
      if (vaultStatus) {
        startBalancePoll();
      }
      const collectionStatus = await checkUserCollectionStatus();
      setCollectionIsSetup(collectionStatus);
      if (collectionStatus) {
        startCollectionPoll();
      }
      setGetResourcesComplete(true);
    };

    let balancePollId = null;
    const startBalancePoll = async () => {
      const balance = await getUserBalance();
      setWalletBalance(balance);
      balancePollId = setTimeout(startBalancePoll, 2000);
    };

    let collectionPollId = null;
    const startCollectionPoll = async () => {
      const items = await getUserCollection();
      setWalletCollection(items);
      collectionPollId = setTimeout(startCollectionPoll, 2000);
    };

    const getUserBalance = async () => {
      const user = fcl.currentUser();
      const snapshot = await user.snapshot();
      const address = getAddress(snapshot);
      const scriptCode = await generateCode(vaultBalance, {
        query: /(0x01|0x02)/g,
        "0x01": `0x${TOKEN_CONTRACT_ADDRESS}`,
        "0x02": address,
      });
      const script = sdk.script`${scriptCode}`;
      const response = await fcl.send([script]);
      const balance = await fcl.decode(response);
      return balance;
    };

    const getUserCollection = async () => {
      const user = fcl.currentUser();
      const snapshot = await user.snapshot();
      const address = getAddress(snapshot);
      const scriptCode = await generateCode(getCollectionItems, {
        query: /(0x01|0x02)/g,
        "0x01": `0x${AWARD_CONTRACT_ADDRESS}`,
        "0x02": address,
      });
      const script = sdk.script`${scriptCode}`;
      const response = await fcl.send([script]);
      const items = await fcl.decode(response);
      return items;
    };

    const checkUserVaultStatus = async () => {
      const user = fcl.currentUser();
      const snapshot = await user.snapshot();
      const address = getAddress(snapshot);
      const scriptCode = await generateCode(checkReference, {
        query: /(0x01|0x02)/g,
        "0x01": `0x${TOKEN_CONTRACT_ADDRESS}`,
        "0x02": address,
      });
      const script = sdk.script`${scriptCode}`;
      const response = await fcl.send([script]);
      const checkResult = await fcl.decode(response);
      return checkResult;
    };

    const checkUserCollectionStatus = async () => {
      const user = fcl.currentUser();
      const snapshot = await user.snapshot();
      const address = getAddress(snapshot);
      const scriptCode = await generateCode(checkCollection, {
        query: /(0x01|0x02)/g,
        "0x01": `0x${AWARD_CONTRACT_ADDRESS}`,
        "0x02": address,
      });
      const script = sdk.script`${scriptCode}`;
      const response = await fcl.send([script]);
      const checkResult = await fcl.decode(response);
      return checkResult;
    };

    const runSampleTx = async () => {
      const simpleTransaction = `\
        transaction {
          execute {
            log("Hello World!!")
          }
        }
      `;
      setStatus("Resolving...");
      const blockResponse = await fcl.send([fcl.getLatestBlock()]);
      const block = await fcl.decode(blockResponse);
      try {
        const tx = await fcl.send([
          fcl.transaction(simpleTransaction),
          fcl.proposer(fcl.currentUser().authorization),
          fcl.payer(fcl.currentUser().authorization),
          fcl.ref(block.id),
        ]);

        const { transactionId } = tx;

        setStatus("Transaction sent, waiting for confirmation");

        const unsub = fcl.tx({ transactionId }).subscribe((transaction) => {
          setTransaction(transaction);

          if (fcl.tx.isSealed(transaction)) {
            setStatus("Transaction is Sealed");
            unsub();
          }
        });
      } catch (e) {
        console.error(e);
        setStatus("Transaction failed");
      }
    };

    const setupWallet = async () => {
      // Create a vault and a collection
      const initCode = await generateCode(setupUserWallet, {
        query: /(0x01|0x02)/g,
        "0x01": `0x${TOKEN_CONTRACT_ADDRESS}`,
        "0x02": `0x${AWARD_CONTRACT_ADDRESS}`,
      });

      setStatus("Resolving...");

      const blockResponse = await fcl.send([fcl.getLatestBlock()]);
      const block = await fcl.decode(blockResponse);

      try {
        const tx = await fcl.send([
          sdk.transaction`${initCode}`,
          fcl.proposer(fcl.currentUser().authorization),
          fcl.payer(fcl.currentUser().authorization),
          fcl.ref(block.id),
          fcl.authorizations([fcl.currentUser().authorization]),
          fcl.limit(100),
        ]);

        const { transactionId } = tx;

        setStatus("Transaction sent, waiting for confirmation");

        const unsub = fcl.tx({ transactionId }).subscribe((transaction) => {
          setTransaction(transaction);

          if (fcl.tx.isSealed(transaction)) {
            setStatus("Transaction is Sealed");
            getWalletResources();
            unsub();
          }
        });
      } catch (e) {
        console.error(error);
        setStatus("Transaction failed");
      }
    };

    const giveAward = async ({ recipientAddress }) => {
      const initCode = await generateCode(giveNFTAward, {
        query: /(0x01|0x02|0x03)/g,
        "0x01": `0x${TOKEN_CONTRACT_ADDRESS}`,
        "0x02": `0x${AWARD_CONTRACT_ADDRESS}`,
        "0x03": `0x${recipientAddress}`,
      });

      setStatus("Resolving...");

      const blockResponse = await fcl.send([fcl.getLatestBlock()]);
      const block = await fcl.decode(blockResponse);

      try {
        const tx = await fcl.send([
          sdk.transaction`${initCode}`,
          fcl.proposer(fcl.currentUser().authorization),
          fcl.payer(fcl.currentUser().authorization),
          fcl.ref(block.id),
          fcl.authorizations([fcl.currentUser().authorization]),
          fcl.limit(100),
        ]);
        const { transactionId } = tx;

        setStatus("Transaction sent, waiting for confirmation");

        const unsub = fcl.tx({ transactionId }).subscribe((transaction) => {
          setTransaction(transaction);

          if (fcl.tx.isSealed(transaction)) {
            setStatus("Transaction is Sealed");
            unsub();
          }
        });
      } catch (e) {
        console.error(external);
        setStatus("Transaction failed");
      }
    };

    const [associateWallet, { data, loading, error }] = useMutation(
      ASSOCIATE_WALLET,
      {
        update: (cache, { data }) => {
          const { me: currentUserData } = cache.readQuery({
            query: CURRENT_USER_QUERY,
          });
          cache.writeQuery({
            query: CURRENT_USER_QUERY,
            data: { me: { ...currentUserData, ...data.associateWallet } },
          });
        },
        onError: () => {
          toast.error("😳 Ekkk! Failed to link wallet.", {
            position: "bottom-left",
          });
        },
      }
    );

    const connectActiveWalletToLyraLabs = async () => {
      associateWallet({
        variables: {
          address: walletUser.addr,
        },
      });
    };

    return (
      <WalletContext.Provider
        value={{
          status,
          setStatus,
          transaction,
          setTransaction,
          walletConnected,
          walletNotConnected,
          setupWallet,
          setupFCLAuthHandler,
          walletUser,
          vaultIsSetup,
          collectionIsSetup,
          walletBalance,
          walletCollection,
          connectActiveWalletToLyraLabs,
          giveAward,
          authHandlerIsSetup,
          setAuthHandlerIsSetup,
          getResourcesComplete,
          runSampleTx,
        }}
      >
        <Component />
      </WalletContext.Provider>
    );
  };
  return WithWallet;
};
