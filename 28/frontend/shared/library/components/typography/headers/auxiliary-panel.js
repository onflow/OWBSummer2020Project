import React from "react";
import styled from "@emotion/styled";
import { BASE_TEXT, WEIGHT } from "../../../../style/typography";

export const AuxiliaryPanelHeader = styled("div")({
  ...BASE_TEXT,
  fontSize: 16,
  fontWeight: WEIGHT.BOLD,
  marginBottom: 10,
});

export const AuxiliaryPanelHeaderLarge = styled(AuxiliaryPanelHeader)({
  fontSize: 22,
});

// const AuxiliaryPanelHeader = ({ text }) => {
//   return <Container>{text}</Container>;
// };
