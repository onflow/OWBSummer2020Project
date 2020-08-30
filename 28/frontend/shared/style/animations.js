/* eslint import/prefer-default-export: 0 */
import { keyframes } from "@emotion/core";

export const shine = (first, last, offset = 0) =>
  keyframes`
  0% {
    background-position: ${first + offset}px;
  }

  40%, 100% {
    background-position: ${last + offset}px;
  }
`;

export const spin = () =>
  keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;
