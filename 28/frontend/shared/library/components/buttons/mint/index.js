import styled from "@emotion/styled";
import SimpleButton from "../simple";
import { WEIGHT } from "../../../../style/typography";
import {
  LIGHT_MINT,
  WHITE,
  JET,
  BRIGHT_MINT,
  EXTRA_BRIGHT_MINT,
} from "../../../../style/colors";

export default styled(SimpleButton)({
  borderColor: LIGHT_MINT,
  backgroundColor: LIGHT_MINT,
  color: JET,
  fontWeight: WEIGHT.BOLD,
  "&:hover": {
    backgroundColor: EXTRA_BRIGHT_MINT,
    borderColor: EXTRA_BRIGHT_MINT,
    "&:disabled": {
      borderColor: LIGHT_MINT,
      backgroundColor: LIGHT_MINT,
    },
  },
});
