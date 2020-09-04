import React, { useEffect, useState } from "react"
import displayNFTs from "../contracts/displayNFTs.cdc"
import * as fcl from "@onflow/fcl"
import * as sdk from "@onflow/sdk"



export const setupUserTx = async (setupUser) => {

    const { authorization } = await fcl.currentUser();

    console.log("auth :", { authorization });

    const code = await generateCode(setupUser, {
      query: /(0x01|0x02)/g,
      "0x01": localStorage.getItem('CREATURE_CONTRACT_ADDRESS'),
    });

    console.log("getting blocknumber")
    const resp = await (fcl.decode(await fcl.send([fcl.getLatestBlock()])));

    console.log("starting transaction ... ")
    const tx = await fcl.send([
      sdk.transaction`${code}`,
      fcl.ref(resp.id),
      sdk.payer(authorization),
      sdk.proposer(authorization),
      sdk.authorizations([authorization]),
      sdk.limit(100),
    ]);

    console.log({ tx });

    fcl.tx(tx).subscribe((txStatus) => {
      if (fcl.tx.isExecuted(txStatus)) {
        console.log("Transaction was executed");
      }
    });
};


export const checkReceiverScript = async ( checkReceiver) => {

    const address = await getUserAddress();
    console.log("checking receiver for :", address);

    const code = await generateCode(checkReceiver, {
        query: /(0x01|0x02)/g,
        "0x01": localStorage.getItem('CREATURE_CONTRACT_ADDRESS'),
        "0x02": address,
    });

    const response = await fcl.send([
         sdk.script`${code}`,
    ]);

    let ans = await fcl.decode(response);
    console.log("len : ", ans);
    return ans;
}


export const render_NFTs = async () => {

  const address = await getUserAddress();
  console.log("address :", address);

  const code = await generateCode(displayNFTs, {
      query: /(0x01|0x02)/g,
      "0x01": localStorage.getItem('CREATURE_CONTRACT_ADDRESS'),
      "0x02": address,
  });

  const response = await fcl.send([
       sdk.script`${code}`,
  ]);

  let ans = await fcl.decode(response);
  console.log("len : ", ans);
  return ans;
};



export const getUserAddress = async () => {
    const user = fcl.currentUser();
    const snapshot = await user.snapshot();
    return getAddress(snapshot);
};



export const generateCode = async (url, match) => {
    const codeFile = await fetch(url);
    const rawCode = await codeFile.text();
    if (!match) {
      return rawCode;
    }

    const { query } = match;
    return rawCode.replace(query, (item) => {
      return match[item];
    });
};



export const getAddress = (user, nullPrefix = true) => {
  return nullPrefix ? `0x${user.addr}` : user.addr;
};



export const getEthereumID = (tokenID) => {
  return `${tokenID}`;
};
