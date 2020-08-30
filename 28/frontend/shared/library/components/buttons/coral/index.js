import styled from "@emotion/styled";
import SimpleButton from "../simple";
import { WEIGHT } from "../../../../style/typography";
import {
  LIGHT_CORAL,
  BRIGHT_CORAL,
  EXTRA_BRIGHT_CORAL,
  JET,
  WHITE,
} from "../../../../style/colors";

export default styled(SimpleButton)({
  borderColor: BRIGHT_CORAL,
  backgroundColor: BRIGHT_CORAL,
  color: WHITE,
  fontWeight: WEIGHT.BOLD,
  "&:hover": {
    backgroundColor: EXTRA_BRIGHT_CORAL,
    borderColor: EXTRA_BRIGHT_CORAL,
    "&:disabled": {
      borderColor: LIGHT_CORAL,
      backgroundColor: LIGHT_CORAL,
    },
  },
});
