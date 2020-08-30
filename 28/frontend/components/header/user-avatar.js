import React from "react";
import styled from "@emotion/styled";
import { BASE_TEXT, WEIGHT } from "@style/typography";
import { DETROIT } from "@style/colors";
import { BOTTOM } from "@library/components/popovers/base";
import ListPopover from "@library/components/popovers/list";
import { DESKTOP, TABLET } from "@style/breakpoints";
import { HEADER_HEIGHT } from "./";

const DEFAULT_AVATAR_DIMENSION = 40;
const MOBILE_AVATAR_DIMENSION = 30;

const Avatar = styled("img")({
  height: DEFAULT_AVATAR_DIMENSION,
  width: DEFAULT_AVATAR_DIMENSION,
  borderRadius: "50%",
  cursor: "pointer",
  [TABLET]: {
    height: MOBILE_AVATAR_DIMENSION,
    width: MOBILE_AVATAR_DIMENSION,
  },
});

const Container = styled("div")({
  height: 60,
  display: "flex",
  alignItems: "center",
});

const UserAvatar = ({ user }) => {
  const LINKS = [
    // { label: "My Profile", route: `@${user.username}` },
    // { label: "Settings", route: "/settings" },
    { label: "Logout", route: "/api/logout" },
  ];
  const anchor = (
    <Container>
      <Avatar src={user.avatar} />
    </Container>
  );
  return <ListPopover items={LINKS} anchor={anchor} position={BOTTOM} />;
};

export default UserAvatar;
