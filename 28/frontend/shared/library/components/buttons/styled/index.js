import styled from "@emotion/styled";
import SimpleButton from "../simple";
import { WEIGHT } from "../../../../style/typography";
import {
  WHITE,
  LAVENDER,
  PURPLE,
  FOCUS_LAVENDER
} from "../../../../style/colors";

export default styled(SimpleButton)({
  borderColor: PURPLE,
  backgroundColor: PURPLE,
  color: WHITE,
  fontWeight: WEIGHT.BOLD,
  "&:hover": {
    backgroundColor: FOCUS_LAVENDER,
    borderColor: FOCUS_LAVENDER,
    "&:disabled": {
      borderColor: LAVENDER,
      backgroundColor: LAVENDER
    }
  }
});
