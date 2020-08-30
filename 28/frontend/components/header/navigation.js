import React from "react";
import Link from "next/link";

import styled from "@emotion/styled";
import { BASE_TEXT, WEIGHT } from "../../shared/style/typography";

const Container = styled("div")({
  ...BASE_TEXT
});

const Navigation = () => <Container>Navigation</Container>;

export default Navigation;
