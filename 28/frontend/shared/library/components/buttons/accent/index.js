import styled from "@emotion/styled";
import { BASE_TEXT, WEIGHT } from "../../../../style/typography";
import SimpleButton from "../simple";
import {
  WHITE,
  PURPLE,
  CHARCOAL,
  LILAC,
  LAVENDER,
  FOCUS_LAVENDER
} from "../../../../style/colors";

const DEFAULT_WIDTH = "4px";
const DEFAULT_COLOR = PURPLE;

const TRANSITION_PROPERTIES = {
  transitionDelay: "75ms",
  transition: "all .1s ease"
};

export const StyledSimpleButton = styled(SimpleButton)(
  {
    transitionDelay: "75ms",
    fontWeight: WEIGHT.BOLD,
    textTransform: "uppercase",
    transition: "all .1s ease",
    zIndex: 1,
    borderRadius: 0,
    fontSize: 11,
    lineHeight: "16px"
  },
  ({ bgColor, fontColor, borderColor }) => ({
    backgroundColor: bgColor,
    color: fontColor,
    borderColor
  })
);

const TopLeftCorner = styled("div")(
  {
    position: "absolute",
    top: 0,
    left: 0,
    ...TRANSITION_PROPERTIES
  },
  ({ width, color }) => ({
    borderBottom: `${width} solid transparent`,
    borderRight: `${width} solid ${color}`,
    borderTop: `${width} solid transparent`
  })
);

const LeftSide = styled("div")(
  {
    position: "absolute",
    bottom: 0,
    top: 0,
    ...TRANSITION_PROPERTIES
  },
  ({ width, color }) => ({
    width,
    background: color
  })
);

const BottomRightCorner = styled("div")(
  {
    position: "absolute",
    right: 0,
    bottom: 0,
    ...TRANSITION_PROPERTIES
  },
  ({ width, color }) => ({
    borderLeft: `${width} solid transparent`,
    borderRight: `${width} solid transparent`,
    borderTop: `${width} solid ${color}`
  })
);

const BottomSide = styled("div")(
  {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    ...TRANSITION_PROPERTIES
  },
  ({ width, color }) => ({
    height: width,
    background: color
  })
);

const Container = styled("div")(
  {},
  ({ width, hoverBgColor, hoverFontColor, hoverBorderColor }) => ({
    display: "inline-flex",
    position: "relative",
    textDecoration: "none",
    "&:hover": {
      [StyledSimpleButton]: {
        transform: `translate3d(${width},-${width},0)`,
        backgroundColor: hoverBgColor,
        color: hoverFontColor,
        borderColor: hoverBorderColor
      },
      [TopLeftCorner]: {
        transform: `translateY(-${width}) scale(1)`
      },
      [LeftSide]: {
        transform: "scaleX(1)"
      },
      [BottomRightCorner]: {
        transform: `translateX(${width}) scale(1)`
      },
      [BottomSide]: {
        transform: "scaleY(1)"
      }
    }
  })
);

const AccentButton = ({
  width = DEFAULT_WIDTH,
  color = DEFAULT_COLOR,
  text = "Hello Button",
  bgColor = WHITE,
  hoverBgColor = LILAC,
  fontColor = CHARCOAL,
  hoverFontColor = CHARCOAL,
  borderColor = LILAC,
  hoverBorderColor = LILAC
}) => (
  <Container
    width={width}
    hoverBgColor={hoverBgColor}
    hoverFontColor={hoverFontColor}
    hoverBorderColor={hoverBorderColor}
  >
    <TopLeftCorner width={width} color={color} />
    <BottomRightCorner width={width} color={color} />
    <LeftSide width={width} color={color} />
    <BottomSide width={width} color={color} />
    <StyledSimpleButton
      borderColor={borderColor}
      bgColor={bgColor}
      fontColor={fontColor}
    >
      {text}
    </StyledSimpleButton>
  </Container>
);

export default AccentButton;
