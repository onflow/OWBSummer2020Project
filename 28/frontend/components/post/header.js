import React from "react";
import styled from "@emotion/styled";
import { BASE_TEXT, WEIGHT } from "../../shared/style/typography";
import { BLACK } from "../../shared/style/colors";
import { Tagline } from "../../shared/library/components/typography";
import { Thumbnail } from "../post-card/old-index";
import TagList from "../tag-list";

const StyledTagline = styled(Tagline)({
  marginBottom: 6
});

const Container = styled("div")({
  display: "flex"
});

const Link = styled("a")({
  ...BASE_TEXT,
  fontSize: 20,
  fontWeight: WEIGHT.BOLD,
  color: BLACK,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline"
  }
});
const Title = styled("h1")({
  margin: 0,
  lineHeight: "20px"
});
const Info = styled("div")({});

const Header = ({ thumbnail, name, link, tagline, topics }) => (
  <Container>
    <Thumbnail src={thumbnail} />
    <Info>
      <Title>
        <Link href={link}>{name}</Link>
      </Title>
      <StyledTagline>{tagline}</StyledTagline>
      {topics.length > 0 && <TagList tags={topics} />}
    </Info>
  </Container>
);

export default Header;
