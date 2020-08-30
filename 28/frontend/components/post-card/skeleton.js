import React from "react";
import styled from "@emotion/styled";
import { LILAC, ALABASTER, WHITE } from "@style/colors";
import { shine } from "@style/animations";
import { Container, Body, Content, THUMBNAIL_DIMENSION } from "./";

const BASE_COLOR = LILAC;
const SHINE_COLOR = ALABASTER;

const AVATAR_OFFSET = 110;

const shineGradient = (baseColor, shineColor) =>
  `linear-gradient(90deg, ${baseColor} 0px, ${shineColor} 40px, ${baseColor} 80px)`;

const Thumbnail = styled("div")({
  width: THUMBNAIL_DIMENSION,
  height: THUMBNAIL_DIMENSION,
  backgroundImage: shineGradient(BASE_COLOR, SHINE_COLOR),
  backgroundSize: 600,
  borderRadius: 3,
  animation: `${shine(-110, 250)} 1.6s infinite linear`,
});

const Line = styled("div")({
  backgroundImage: shineGradient(BASE_COLOR, SHINE_COLOR),
  backgroundSize: 600,
  width: 150,
  height: 16,
  borderRadius: 3,
  marginBottom: 10,

  animation: `${shine(-110, 250, AVATAR_OFFSET)} 1.6s infinite linear`,
});

const LongerLine = styled(Line)({
  width: 250,
});

const SkeletonPostCard = () => (
  <Container>
    <Body>
      <Content>
        <LongerLine />
        <Line />
      </Content>
      <Thumbnail />
    </Body>
  </Container>
);

export default SkeletonPostCard;
