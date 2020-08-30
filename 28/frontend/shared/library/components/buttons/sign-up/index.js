import React from "react";
import AccentButton from "../accent";
import { LinkWrapper } from "../shared";
import {
  WHITE,
  PURPLE,
  CHARCOAL,
  FOCUS_LAVENDER
} from "../../../../style/colors";
import { LOGIN_ROUTE } from "../../../../constants/routes";

const SignUpButton = () => (
  <LinkWrapper href={LOGIN_ROUTE}>
    <AccentButton
      color={PURPLE}
      bgColor={FOCUS_LAVENDER}
      borderColor={FOCUS_LAVENDER}
      fontColor={WHITE}
      hoverFontColor={CHARCOAL}
      text={"Sign Up"}
    />
  </LinkWrapper>
);

export default SignUpButton;
