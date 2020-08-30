import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faArchive,
  faThumbtack,
} from "@fortawesome/pro-light-svg-icons";
import { BASE_TEXT, WEIGHT } from "@style/typography";
import { SCOPRION } from "@style/colors";

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginTop: "1rem",
});

const NavLink = styled("div")({
  display: "flex",
  alignItems: "center",
  marginTop: ".75rem",
  cursor: "pointer",
});

const IconWrapper = styled("div")({});

// const Icon = styled(FontAwesomeIcon)({
//   fontSize: "1rem",
//   width: "1rem !important"
// });

const Icon = styled("div")({});

const Name = styled("div")({
  ...BASE_TEXT,
  fontSize: "1rem",
  marginLeft: ".5rem",
});

const LINKS = [
  { icon: "🚀", name: "Discovery Feed", route: "/" },
  { icon: "📚", name: "Reading list", route: "/readinglist" },
  { icon: "💾", name: "Archive", route: "/archive" },
];

const SidebarNav = () => (
  <Container>
    {LINKS.map(({ icon, name, route }, i) => (
      <Link key={i} href={route}>
        <NavLink>
          <Icon>{icon}</Icon>
          <Name>{name}</Name>
        </NavLink>
      </Link>
    ))}
  </Container>
);

export default SidebarNav;
