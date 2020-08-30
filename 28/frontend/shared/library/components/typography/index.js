import styled from "@emotion/styled";
import { BASE_TEXT } from "../../../style/typography";
import { GUNSMOKE } from "../../../style/colors";

export const Tagline = styled("div")({
  ...BASE_TEXT,
  color: GUNSMOKE,
  lineHeight: "20px",
  marginBottom: 12
});
