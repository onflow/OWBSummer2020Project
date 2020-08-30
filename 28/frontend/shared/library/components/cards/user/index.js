import React from "react";
import styled from "@emotion/styled";
import { BASE_TEXT, WEIGHT } from "../../../../style/typography";
import { BLACK, DETROIT } from "../../../../style/colors";

const Container = styled("div")({});

const Card = styled("a")({
  ...BASE_TEXT,
  display: "flex",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  "&:hover": {
    " > div > div:first-of-type": {
      textDecoration: "underline"
    }
  }
});

const Avatar = styled("img")({
  height: 30,
  width: 30,
  borderRadius: "50%"
});

const Meta = styled("div")({
  marginLeft: 10
});

const Name = styled("div")({
  ...BASE_TEXT,
  fontWeight: WEIGHT.BOLD,
  color: BLACK,
  lineHeight: "20px"
});

const Headline = styled("div")({
  ...BASE_TEXT,
  color: DETROIT,
  lineHeight: "20px"
});

const UserCard = ({ user: { avatar, username, headline, name } }) => {
  return (
    <Card href={`/@${username}`}>
      <Avatar src={avatar} />
      <Meta>
        <Name>{name}</Name>
        <Headline>{headline}</Headline>
      </Meta>
    </Card>
  );
};

export default UserCard;
