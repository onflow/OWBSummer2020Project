import styled from "@emotion/styled";
import { PURPLE } from "@style/colors";
import Link from "next/link";

import { BASE_TEXT, WEIGHT } from "@style/typography";

const Content = styled("a")({
  ...BASE_TEXT,
  fontSize: "1em",
  cursor: "pointer",
  fontWeight: WEIGHT.BOLD,
  padding: "8px 0",
  color: PURPLE,
  display: "inline-block",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline"
  }
});

const CTALink = ({ path, text }) => (
  <Link href={path}>
    <Content>{text}</Content>
  </Link>
);

export default CTALink;
