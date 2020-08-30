import React from "react";
import styledLib from "@emotion/styled";
import SimpleButton from "./simple";
import StyledButton from "./styled";
import AccentButton from "./accent";
import LogInButton from "./log-in";
import SignUpButton from "./sign-up";

const Wrapper = styledLib("div")({
  margin: 50
});

export default { title: "Button" };

export const simple = () => <SimpleButton>Hello Button</SimpleButton>;
export const styled = () => <StyledButton>Hello Button</StyledButton>;
export const accent = () => (
  <Wrapper>
    <AccentButton>Hello Button</AccentButton>
  </Wrapper>
);
export const login = () => (
  <Wrapper>
    <LogInButton />
  </Wrapper>
);
export const signup = () => (
  <Wrapper>
    <SignUpButton />
  </Wrapper>
);
