import React from "react";
import styled from "@emotion/styled";
import { BASE_TEXT } from "@style/typography";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const Text = styled("div")({
  ...BASE_TEXT,
  fontSize: 16,
});

const Emoji = styled(Text)({
  fontSize: 32,
});

const EmptyPlaceholder = () => {
  return (
    <Container>
      <Emoji>😔</Emoji>
      <Text>No posts yet.</Text>
    </Container>
  );
};

export default EmptyPlaceholder;
