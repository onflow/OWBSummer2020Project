import React from "react";
import styled from "@emotion/styled";
import { Container, Main, Aside } from "../../layout";
import { WHITE } from "../../../../style/colors";
import { TITLE_TEXT, BASE_TEXT, WEIGHT } from "../../../../style/typography";
import BaseModal from "../base";
import { withPortal } from "../base/portal";
import LogInButton from "../../buttons/log-in";
import SignUpButton from "../../buttons/sign-up";
import LyraLogo from "../../../../style/logos/lyra-labs-logo.svg";

const StyledLyraLogo = styled(LyraLogo)({
  height: 100
});

const StyledContainer = styled(Container)({
  width: "100%",
  backgroundColor: WHITE,
  borderRadius: 3,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 20
});

const Actions = styled("div")({
  margin: "30px 0 20px",
  " > a:last-of-type": {
    marginLeft: 10
  }
});

const Title = styled("h1")({
  ...TITLE_TEXT,
  fontSize: 20,
  margin: 0,
  lineHeight: "32px"
});

const Description = styled("p")({
  ...BASE_TEXT,
  fontSize: 16,
  margin: 0,
  fontWeight: WEIGHT.LITE,
  lineHeight: "24px",
  textAlign: "center",
  width: 400
});

const TITLE = "Login to Lyra Labs";

const DESCRIPTION =
  "We're not really sure what this is. We're just doing something fun and figuring it out as we go.";

const LoginModal = ({ onDismiss }) => {
  return (
    <BaseModal onDismiss={onDismiss} width={"auto"}>
      <StyledContainer>
        <StyledLyraLogo />
        <Title>{TITLE}</Title>
        <Description>{DESCRIPTION}</Description>
        <Actions>
          <LogInButton />
          <SignUpButton />
        </Actions>
      </StyledContainer>
    </BaseModal>
  );
};

export default withPortal(LoginModal);
