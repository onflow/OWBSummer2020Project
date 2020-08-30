import React from "react";
import styled from "@emotion/styled";
import { OFF_WHITE } from "../../shared/style/colors";
import { BASE_TEXT } from "../../shared/style/typography";

import FollowButton from "../../shared/library/components/buttons/follow";

export const Container = styled("a")({
  padding: "8px 16px",
  margin: "0 -16px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row",
  " > div": {
    display: "none"
  },
  "&:hover": {
    backgroundColor: OFF_WHITE,
    " > div": {
      display: "block"
    }
  }
});

const Text = styled("span")({
  ...BASE_TEXT,
  fontSize: "inherit",
  color: "rgba(10, 10, 10, 0.8)"
});

const TopicTag = ({ id, name, slug }) => {
  const tag = `#${slug}`;
  return (
    <Container>
      <Text>{tag}</Text>
      <FollowButton topicId={id} />
    </Container>
  );
};

export default TopicTag;
