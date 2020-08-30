import React from "react";
import styled from "@emotion/styled";
import { PHONE } from "@style/breakpoints";
import LyraLogo from "../../shared/style/logos/lyra-labs-logo.svg";

const StyledLyraLogo = styled(LyraLogo)({
  height: 40,
  width: "auto",
  [PHONE]: {
    height: 30
  }
});

const Logo = () => <StyledLyraLogo />;

export default Logo;
