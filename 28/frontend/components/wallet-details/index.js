import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import * as fcl from "@onflow/fcl";

import flowConfig from "@config/flow";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faPlug,
  faWallet,
  faTrophyAlt,
  faSatelliteDish,
  faBracketsCurly,
  faWifi,
} from "@fortawesome/pro-regular-svg-icons";

import { WHITE } from "@style/colors";

import { WalletContext } from "@enhancers/wallet-provider";
import CoralButton from "@library/components/buttons/coral";

import { BASE_TEXT, WEIGHT } from "@style/typography";

import { AuxiliaryPanelHeader } from "@library/components/typography/headers/auxiliary-panel";

import { Divider } from "@library/components/layout";

const { NETWORK } = flowConfig;

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  borderRadius: 3,
  backgroundColor: WHITE,
  boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)",
  padding: "1rem",
});

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const Label = styled("div")({
  ...BASE_TEXT,
  fontSize: 12,
  fontWeight: WEIGHT.BOLD,
});

const Value = styled("div")({
  ...BASE_TEXT,
});

const TextGroup = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const StyledDivider = styled(Divider)({
  marginTop: 5,
  marginBottom: 5,
});

const ctaButtonStyles = {
  height: 24,
  marginTop: 5,
  marginBottom: 5,
};

const StyledCoralButton = styled(CoralButton)({
  ...ctaButtonStyles,
});

const Awards = styled("div")({
  display: "flex",
});

const Award = styled("div")({
  marginRight: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const AwardImg = styled("div")({
  ...BASE_TEXT,
  fontSize: 22,
});

const AwardId = styled("div")({
  ...BASE_TEXT,
});

const HeaderTag = styled("div")({
  ...BASE_TEXT,
  fontSize: 10,
});

const WalletDetails = ({ currentUser }) => {
  const {
    status,
    transaction,
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
    authHandlerIsSetup,
    setAuthHandlerIsSetup,
    getResourcesComplete,
    runSampleTx,
  } = useContext(WalletContext);

  const router = useRouter();
  const route = router.route;

  useEffect(() => {
    if (!authHandlerIsSetup) {
      setupFCLAuthHandler();
      setAuthHandlerIsSetup(true);
    }
  }, []);

  const walletIsLinked =
    currentUser && currentUser.walletAddress && currentUser.walletIsSetup;

  const walletIsActive = walletConnected && walletUser;

  const walletIsConfigured = vaultIsSetup && collectionIsSetup;

  return (
    <Wrapper>
      <AuxiliaryPanelHeader>
        Flow Wallet<HeaderTag>Experimental Feature</HeaderTag>
      </AuxiliaryPanelHeader>

      <Container>
        <TextGroup>
          <Label>
            <FontAwesomeIcon icon={faWifi} /> Network
          </Label>
          <Value>{NETWORK}</Value>
        </TextGroup>
        <StyledDivider />
        <TextGroup>
          <Label>
            <FontAwesomeIcon icon={faLink} /> Linked Wallet
          </Label>
          {!walletIsActive && <Value>No active wallet</Value>}
          {walletIsActive && !getResourcesComplete && <Value>Loading...</Value>}
          {walletIsActive && !walletIsConfigured && getResourcesComplete && (
            <StyledCoralButton onClick={setupWallet}>
              Setup Wallet
            </StyledCoralButton>
          )}
          {walletIsActive &&
            getResourcesComplete &&
            walletIsConfigured &&
            (!walletIsLinked ||
              (walletIsLinked &&
                walletUser.addr !== currentUser.walletAddress)) && (
              <StyledCoralButton onClick={connectActiveWalletToLyraLabs}>
                Link Wallet
              </StyledCoralButton>
            )}
          {walletIsActive &&
            getResourcesComplete &&
            walletIsConfigured &&
            walletIsLinked &&
            walletUser.addr === currentUser.walletAddress && (
              <Value>{`0x${currentUser.walletAddress}`}</Value>
            )}
        </TextGroup>
        <StyledDivider />
        <TextGroup>
          <Label>
            <FontAwesomeIcon icon={faPlug} /> Active Wallet
          </Label>
          {walletIsActive ? (
            <Value>{`0x${walletUser.addr}`}</Value>
          ) : (
            <StyledCoralButton onClick={fcl.authenticate}>
              Connect Wallet
            </StyledCoralButton>
          )}
        </TextGroup>
        <StyledDivider />
        <TextGroup>
          <Label>
            <FontAwesomeIcon icon={faWallet} /> Balance
          </Label>
          {walletIsActive ? (
            walletIsConfigured ? (
              <Value>{`${Math.round(walletBalance)} LYRA`}</Value>
            ) : (
              <Value>No wallet setup</Value>
            )
          ) : (
            <Value>No active wallet</Value>
          )}
        </TextGroup>
        <StyledDivider />
        <TextGroup>
          <Label>
            <FontAwesomeIcon icon={faTrophyAlt} /> Awards
          </Label>
          {walletIsActive ? (
            walletIsConfigured ? (
              <Value>
                {walletCollection && walletCollection.length > 0 ? (
                  <Awards>
                    {walletCollection.map((item) => (
                      <Award key={item}>
                        <AwardImg>🏅</AwardImg>
                        <AwardId>{`#${item}`}</AwardId>
                      </Award>
                    ))}
                  </Awards>
                ) : (
                  "none"
                )}
              </Value>
            ) : (
              <Value>No wallet setup</Value>
            )
          ) : (
            <Value>No active wallet</Value>
          )}
        </TextGroup>
        {walletIsActive && status && (
          <>
            <StyledDivider />
            <TextGroup>
              <Label>
                <FontAwesomeIcon icon={faSatelliteDish} /> Tx Status
              </Label>
              <Value>{status}</Value>
            </TextGroup>
            {transaction && (
              <>
                <StyledDivider />
                <TextGroup>
                  <Label>
                    <FontAwesomeIcon icon={faBracketsCurly} /> Tx Details
                  </Label>
                  {}
                  <Value>
                    <code>{JSON.stringify(transaction, null, 2)}</code>
                  </Value>
                </TextGroup>
              </>
            )}
          </>
        )}
        {walletIsActive && (
          <>
            <StyledDivider />
            <StyledCoralButton onClick={runSampleTx}>
              Run Sample Tx
            </StyledCoralButton>
            <StyledCoralButton onClick={fcl.unauthenticate}>
              Disconnect Wallet
            </StyledCoralButton>
          </>
        )}
      </Container>
    </Wrapper>
  );
};

export default WalletDetails;
