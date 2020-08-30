import styled from "@emotion/styled";
import { WHITE, LILAC } from "../../style/colors";
import { BASE_TEXT, WEIGHT } from "../../style/typography";
import { TABLET, DESKTOP, XL, LAPTOP } from "../../style/breakpoints";

// const MAX_WIDTH = 1250;
const MAX_WIDTH = 1100;
// export const SIDEBAR_WIDTH = 220; // 280 when topics rendered
export const SIDEBAR_WIDTH = 240; // 280 when topics rendered
const MIN_WIDTH = 320;

export const LEFT = "left";
export const RIGHT = "right";

export const Container = styled("div")({
  margin: "auto",
  maxWidth: MAX_WIDTH,
  minWidth: MIN_WIDTH,
  display: "flex",
  // padding: "0px 15px",
  boxSizing: "border-box",
});

export const Row = styled("div")({
  display: "flex",
  flexDirection: "row",
});

export const Column = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const Section = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

export const Panel = styled("div")({
  backgroundColor: WHITE,
  padding: 20,
  borderRadius: 5,
  boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)",
});

export const Main = styled("main")({
  width: "100%",
  padding: 8,
  boxSizing: "border-box",
  // [DESKTOP]: {
  //   maxWidth: `calc(100% - ${SIDEBAR_WIDTH}px)`,
  //   padding: 16,
  // },
  // [XL]: {
  //   maxWidth: `calc(100% - ${2 * SIDEBAR_WIDTH}px)`,
  // },
});

export const SidebarSectionHeader = styled("header")({
  ...BASE_TEXT,
  fontSize: "1em",
  fontWeight: WEIGHT.BOLD,
  padding: "8px 0",
});

export const Widget = styled("div")({
  margin: "8px 0 16px 0",
  padding: "0 16px 16px 16px",
  overflow: "scroll",
});

export const Sidebar = styled("div")(
  {
    flex: 1,
    minWidth: SIDEBAR_WIDTH,
    display: "none",
    padding: "16px 0",
    fontSize: "0.85em",
  },
  ({ position }) => ({
    // [DESKTOP]: {
    [LAPTOP]: {
      // display: position === RIGHT ? "none" : "block"
      display: "block",
    },
    // [XL]: {

    // }
  })
);

export const SidebarSection = styled("div")({
  padding: "0 16px",
  overflow: "scroll",
});

export const Aside = styled("aside")(
  {
    [TABLET]: {
      display: "none",
    },
    marginLeft: 30,
    width: 320,
  },
  ({ position }) => ({
    marginLeft: position === LEFT ? 0 : 30,
    marginRight: position === LEFT ? 30 : 0,
  })
);

export const Divider = styled("div")({
  borderBottom: `1px solid ${LILAC}`,
  width: "100%",
});
