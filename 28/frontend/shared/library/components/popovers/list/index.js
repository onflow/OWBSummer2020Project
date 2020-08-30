import React from "react";
import styled from "@emotion/styled";
import { BASE_TEXT, WEIGHT } from "../../../../style/typography";
import { DETROIT } from "../../../../style/colors";
import Popover, { BOTTOM } from "../base";

const itemStyles = {
  ...BASE_TEXT,
  color: DETROIT,
  textDecoration: "none",
  fontSize: 11,
  marginBottom: 5,
  textTransform: "uppercase",
  "&:hover": {
    textDecoration: "underline"
  }
};

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  padding: 10,
  "a:last-of-type": {
    marginBottom: 0
  }
});

const Link = styled("a")({
  ...itemStyles
});

const Text = styled("div")({
  ...itemStyles,
  cursor: "pointer"
});

const ListPopover = ({ items, anchor, position }) => {
  const content = (
    <Container>
      {items.map((item, i) => {
        const Component = item.route ? Link : Text;
        const props = item.route
          ? { href: item.route }
          : { onClick: item.onClick };
        return (
          <Component key={i} {...props}>
            {item.label}
          </Component>
        );
      })}
    </Container>
  );
  const positionProp = position ? { position } : {};
  return <Popover anchor={anchor} content={content} {...positionProp} />;
};

export default ListPopover;
