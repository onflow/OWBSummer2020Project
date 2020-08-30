import React from "react";
import styled from "@emotion/styled";
import { BASE_TEXT, WEIGHT } from "@style/typography";
import { SCOPRION } from "@style/colors";

const AVATAR_DIMENSION = 48;

const Avatar = styled("img")({
  height: AVATAR_DIMENSION,
  width: AVATAR_DIMENSION,
  borderRadius: "50%"
});

const Container = styled("div")({
  display: "flex"
});

const Meta = styled("div")({
  marginLeft: ".5rem"
});

const Name = styled("div")({
  ...BASE_TEXT,
  fontSize: "1rem",
  fontWeight: WEIGHT.BOLD
});

const Username = styled("div")({
  ...BASE_TEXT,
  color: SCOPRION,
  fontSize: ".75rem"
});

const UserCard = ({ user }) => {
  const { avatar, name, username } = user;
  return (
    <Container>
      <Avatar src={avatar} />
      <Meta>
        <Name>{name}</Name>
        <Username>{`@${username}`}</Username>
      </Meta>
    </Container>
  );
};

export default UserCard;
