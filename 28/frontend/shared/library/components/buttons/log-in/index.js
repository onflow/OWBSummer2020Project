import React from "react";
import AccentButton from "../accent";
import { LinkWrapper } from "../shared";
import { PURPLE } from "../../../../style/colors";
import { LOGIN_ROUTE } from "../../../../constants/routes";

const LogInButton = () => (
  <LinkWrapper href={LOGIN_ROUTE}>
    <AccentButton color={PURPLE} text={"Log In"} />
  </LinkWrapper>
);

export default LogInButton;
