import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { SidebarSectionHeader, SidebarSection } from "library/layout";
import { BASE_TEXT } from "style/typography";
import { OFF_WHITE } from "../../shared/style/colors";

const SidebarLink = styled("a")({
  padding: "8px 16px",
  margin: "0 -16px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: OFF_WHITE
  }
});

const Text = styled("span")({
  ...BASE_TEXT,
  fontSize: "inherit",
  color: "rgba(10, 10, 10, 0.8)"
});

const LINKS = [
  { name: "About", path: "/about" },
  { name: "Privacy Policy", path: "/privacy" },
  { name: "Terms of Use", path: "/terms" },
  { name: "Contact", path: "/contact" },
  { name: "FAQ", path: "/faq" },
  { name: "Code of Conduct", path: "/code-of-conduct" }
];

const SidebarLinks = () => {
  return (
    <SidebarSection>
      <SidebarSectionHeader>Everything else...</SidebarSectionHeader>
      <Container>
        {!loading && data[dataKey].map(topic => <TopicTag {...topic} />)}
      </Container>
    </SidebarSection>
  );
};

export default SidebarLinks;
