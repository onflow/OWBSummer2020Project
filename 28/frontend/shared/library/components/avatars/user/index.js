import React from "react";
import styled from "@emotion/styled";
import DefaultUserIcon from "../../../../style/icons/user.svg";
import { LILAC } from "../../../../style/colors";

const Container = styled("div")({
  height: 30,
  width: 30,
  backgroundColor: LILAC,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%"
});

const Link = styled("a")({
  height: 30,
  width: 30
});

const Avatar = styled("img")({
  height: 30,
  width: 30,
  borderRadius: "50%"
});

const UserAvatar = ({ user = null }) => {
  return (
    <Container>
      {user ? (
        <Link href={`/@${user.username}`}>
          <Avatar src={user.avatar} />
        </Link>
      ) : (
        <DefaultUserIcon />
      )}
    </Container>
  );
};

export default UserAvatar;
