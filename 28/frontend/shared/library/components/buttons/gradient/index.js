// linear-gradient(255deg,#b6509e 25%,#2ebac6)

import styled from "@emotion/styled";
import SimpleButton from "../simple";
import { WEIGHT } from "../../../../style/typography";
import { LIGHT_CORAL, WHITE, LIGHT_MINT } from "../../../../style/colors";

const gradient = `linear-gradient(255deg,${LIGHT_CORAL} 25%,${LIGHT_MINT})`;

export default styled(SimpleButton)({
  borderColor: LIGHT_CORAL,
  backgroundImage: gradient,
  color: WHITE,
  fontWeight: WEIGHT.BOLD,
  "&:hover": {
    backgroundImage: gradient,
    borderColor: LIGHT_CORAL,
    "&:disabled": {
      borderColor: LIGHT_CORAL,
      backgroundImage: gradient,
    },
  },
});
