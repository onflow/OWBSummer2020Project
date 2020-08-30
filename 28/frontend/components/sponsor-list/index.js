import React from "react";
import styled from "@emotion/styled";
import {
  SidebarSectionHeader,
  SidebarSection
} from "../../shared/library/components/layout";
import { BASE_TEXT } from "../../shared/style/typography";

const StyledSidebarSection = styled(SidebarSection)({
  marginTop: 5
});

const Placeholder = styled("div")({
  ...BASE_TEXT,
  fontSize: "inherit",
  color: "rgba(10, 10, 10, 0.8)"
});

const SponsorList = () => {
  return (
    <StyledSidebarSection>
      <SidebarSectionHeader>Our Wonderful Sponsors! 🍓</SidebarSectionHeader>
      <Placeholder>We don't have any yet 😔 </Placeholder>
    </StyledSidebarSection>
  );
};

export default SponsorList;
