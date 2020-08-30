import styled from "@emotion/styled";
import { BASE_TEXT, WEIGHT } from "@style/typography";
import { ALABASTER, DETROIT, LILAC, POWDER_BLUE, BLUSH } from "@style/colors";

export const InputWrapper = styled("div")({
  position: "relative"
});

export const Input = styled("input")(
  {
    ...BASE_TEXT,
    outline: "none",
    padding: 10,
    paddingRight: 50,
    borderRadius: 3,
    boxSizing: "border-box",
    border: "1px solid",
    height: 35,
    width: "100%",
    "&:disabled": {
      cursor: "not-allowed",
      backgroundColor: ALABASTER
    }
  },
  ({ valid }) => ({
    borderColor: valid ? LILAC : BLUSH,
    "&:hover": {
      borderColor: valid ? POWDER_BLUE : BLUSH
    }
  })
);

export const Textarea = styled("textarea")(
  {
    ...BASE_TEXT,
    outline: "none",
    padding: 10,
    paddingRight: 50,
    borderRadius: 3,
    boxSizing: "border-box",
    border: "1px solid",
    minHeight: 93,
    resize: "none",
    width: "100%",
    "&:disabled": {
      cursor: "not-allowed",
      backgroundColor: ALABASTER
    }
  },
  ({ valid }) => ({
    borderColor: valid ? LILAC : BLUSH,
    "&:hover": {
      borderColor: valid ? POWDER_BLUE : BLUSH
    }
  })
);

export const CharacterCounter = styled("span")(
  {
    ...BASE_TEXT,
    fontSize: 11,
    color: DETROIT,
    position: "absolute",
    padding: "0 2px",
    borderRadius: "3px 0 0 0",
    lineHeight: "16px"
  },
  ({ bottom = 1, right = 2 }) => ({
    bottom,
    right
  })
);

export const Label = styled("div")({
  marginBottom: 10,
  display: "flex",
  flexDirection: "column"
});

export const LabelName = styled("span")({
  ...BASE_TEXT,
  fontWeight: WEIGHT.ULTRA_BOLD,
  lineHeight: "20px"
});

export const LabelQualifier = styled("span")({
  fontWeight: WEIGHT.NORMAL,
  color: DETROIT
});

export const LabelDetail = styled("div")({
  ...BASE_TEXT,
  color: DETROIT
});

export const Field = styled("div")(
  {
    marginBottom: 20
  },
  ({ styles = {} }) => ({
    ...styles
  })
);
