import React, { useState } from "react";
import styled from "@emotion/styled";
import { LILAC, WHITE, GUNSMOKE } from "../../shared/style/colors";
import { BASE_TEXT, WEIGHT } from "../../shared/style/typography";
import PostCard from "../post-card/old-index";
import { formatDate } from "../../shared/utils";
import ChevronDown from "../../shared/style/icons/chevron-down.svg";

const CONTAINER_BORDER_RADIUS = 5;

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  marginBottom: 30,
  borderRadius: 5
});

const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: 15
});

const Day = styled("div")({
  ...BASE_TEXT,
  fontSize: 20,
  fontWeight: WEIGHT.BOLD
});

const ListWrapper = styled("div")({
  backgroundColor: "#fff",
  boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)",
  borderRadius: CONTAINER_BORDER_RADIUS
});

const List = styled("ul")({
  padding: 0,
  margin: 0,
  " > li:first-of-type > div:first-of-type > a div": {
    borderTop: "none",
    borderRadius: `${CONTAINER_BORDER_RADIUS}px ${CONTAINER_BORDER_RADIUS}px 0 0`
    // backgroundColor: "#FF5733"
    // borderRadius: "35px 0 35px 0"
    /* top-left | top-right | bottom-right | bottom-left */
    // border-radius: 1px 0 3px 4px;
  },
  " > li:first-of-type > div:first-of-type": {
    borderTop: "none"
  }
});

const Navigation = styled("div")({
  ...BASE_TEXT,
  fontSize: 11,
  textTransform: "uppercase",
  " > a:first-child": {
    borderRight: `1px solid ${LILAC}`
  }
});

const Filter = styled("a")({
  padding: "0 .5em",
  cursor: "pointer"
});

const Footer = styled("div")({
  ...BASE_TEXT,
  // backgroundColor: WHITE,
  borderTop: `1px solid ${LILAC}`,
  padding: 15,
  textAlign: "center",
  color: GUNSMOKE,
  cursor: "pointer",
  fontSize: 11,
  textTransform: "uppercase",
  "&:hover": {
    textDecoration: "underline"
  }
});

const StyledChevronDown = styled(ChevronDown)({
  marginRight: 5
});

const DEFAULT_VISIBLE = 10;

const PostList = ({ date, posts }) => {
  const [showAll, setShowAll] = useState(false);
  return (
    <Container>
      <Header>
        <Day>{formatDate(date)}</Day>
        <Navigation>
          <Filter>Popular</Filter>
          <Filter>Newest</Filter>
        </Navigation>
      </Header>
      <ListWrapper>
        <List>
          {posts.map((post, index) => (
            <PostCard
              post={{ ...post, tags: post.topics }}
              key={post.id}
              visible={showAll ? true : index < DEFAULT_VISIBLE}
            />
          ))}
          {!showAll && (
            <Footer onClick={() => setShowAll(true)}>
              <StyledChevronDown />
              {`Show ${posts.length - DEFAULT_VISIBLE} More`}
            </Footer>
          )}
        </List>
      </ListWrapper>
    </Container>
  );
};

export default PostList;
