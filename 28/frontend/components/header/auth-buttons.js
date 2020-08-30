import styled from "@emotion/styled";
import LogInButton from "../../shared/library/components/buttons/log-in";
import SignUpButton from "../../shared/library/components/buttons/sign-up";
import SimpleButton from "../../shared/library/components/buttons/simple";
import StyledButton from "../../shared/library/components/buttons/styled";
import { LinkWrapper } from "../../shared/library/components/buttons/shared";
import { WEIGHT } from "../../shared/style/typography";
import {
  CHARCOAL,
  FOCUS_LAVENDER,
  LAVENDER,
  PURPLE
} from "../../shared/style/colors";
import { LOGIN_ROUTE } from "../../shared/constants/routes";

const Container = styled("div")({
  "> a:first-of-type": {
    marginRight: 10
  }
});

const styles = {
  fontSize: 11,
  textTransform: "uppercase",
  fontWeight: WEIGHT.BOLD,
  lineHeight: "16px"
};

const StyledSimpleButton = styled(SimpleButton)({
  ...styles
});

const StyledStyleButton = styled(StyledButton)({
  ...styles,
  backgroundColor: PURPLE,
  borderColor: PURPLE,
  "&:hover": {
    color: CHARCOAL,
    backgroundColor: FOCUS_LAVENDER,
    borderColor: FOCUS_LAVENDER
  }
});

const AuthButtons = () => (
  <Container>
    <LinkWrapper href={LOGIN_ROUTE}>
      <StyledSimpleButton>Log In</StyledSimpleButton>
    </LinkWrapper>
    <LinkWrapper href={LOGIN_ROUTE}>
      <StyledStyleButton>Sign Up</StyledStyleButton>
    </LinkWrapper>
  </Container>
);

export default AuthButtons;
