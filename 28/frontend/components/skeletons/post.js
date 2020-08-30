import React from "react";
import styled from "@emotion/styled";
import { shine } from "../../shared/style/animations";
import { LILAC, ALABASTER, WHITE } from "../../shared/style/colors";
import { Container, Body, Content } from "../post-card/old-index";

const BASE_COLOR = LILAC;
const SHINE_COLOR = ALABASTER;

const AVATAR_OFFSET = 110;

const shineGradient = (baseColor, shineColor) =>
  `linear-gradient(90deg, ${baseColor} 0px, ${shineColor} 40px, ${baseColor} 80px)`;

const Line = styled("div")({
  backgroundImage: shineGradient(BASE_COLOR, SHINE_COLOR),
  backgroundSize: 600,
  width: 150,
  height: 16,
  borderRadius: 3,
  marginBottom: 10,
  animation: `${shine(-110, 250)} 1.6s infinite linear`
});

const LongerLine = styled(Line)({
  width: 250
});

const Thumbnail = styled("div")({
  width: 80,
  height: 80,
  backgroundImage: shineGradient(BASE_COLOR, SHINE_COLOR),
  backgroundSize: 600,
  marginRight: 10,
  borderRadius: 3,
  animation: `${shine(-110, 250, AVATAR_OFFSET)} 1.6s infinite linear`
});

const SkeletonPost = () => (
  <Container visible={true}>
    <Body>
      <Thumbnail />
      <Content>
        <Line />
        <LongerLine />
      </Content>
    </Body>
  </Container>
);

export default SkeletonPost;
