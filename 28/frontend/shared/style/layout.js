import styled from "@emotion/styled";

import { fsBase, siteWidth, layoutGap, layout, layoutPadding } from "./theme";

const PHONE = "@media only screen and (max-width: 480px)";

const Wrapper = styled("div")({
  fontSize: fsBase,
  width: "100%",
  maxWidth: siteWidth,
  margin: "0 auto",
  display: "grid",
  gridGap: layoutGap,
  gridTemplateColumns: layout,
  padding: layoutPadding,
  [PHONE]: {
    height: 30,
  },
});
