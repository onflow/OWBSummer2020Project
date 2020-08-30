import styled from "@emotion/styled";
import { LILAC } from "../../../../style/colors";
import { BASE_TEXT } from "../../../../style/typography";

export default styled("button")({
  ...BASE_TEXT,
  outline: 0,
  borderRadius: 3,
  height: 34,
  border: `1px solid ${LILAC}`,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: LILAC
  },
  "&:disabled": {
    cursor: "not-allowed"
  }
});
