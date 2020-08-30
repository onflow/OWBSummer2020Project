import React, { Fragment, useContext, useState } from "react";
import styled from "@emotion/styled";

import { withTheme } from "emotion-theming";
import { Container, Row, SIDEBAR_WIDTH } from "@library/components/layout";
import { CurrentUserContext } from "@enhancers/current-user";
import Logo from "./logo";
import LinkForm from "./link-form";
import Search from "./search";
import Navigation from "./navigation";
import AuthButtons from "./auth-buttons";
import UserAvatar from "./user-avatar";
import { DESKTOP, TABLET } from "@style/breakpoints";
import { CHARCOAL, GUNSMOKE, LILAC, WHITE } from "@style/colors";
import { BASE_TEXT, WEIGHT } from "@style/typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBell, faBars } from "@fortawesome/pro-light-svg-icons";

export const HEADER_HEIGHT = 60;

const Wrapper = styled("header")(({ theme: { COLORS: { WHITE, LILAC } } }) => ({
  backgroundColor: WHITE,
  borderBottom: `1px solid ${LILAC}`,
  boxShadow: "0 1px 1px 0 rgba(0,0,0,.05)",
  height: HEADER_HEIGHT,
  display: "flex",
  position: "sticky",
  top: 0,
  zIndex: 1,
}));

const Aside = styled("div")({
  flexShrink: 0,
  [DESKTOP]: {
    maxWidth: SIDEBAR_WIDTH,
  },
});

const LogoContainer = styled("div")(
  {
    display: "flex",
    alignItems: "center",
    marginRight: 20,
    marginLeft: 8,
    [DESKTOP]: {
      marginLeft: 16,
    },
  },
  ({ formVisible }) => ({
    [TABLET]: {
      display: formVisible ? "none" : "flex",
    },
    // " > div:last-of-type": {
    //   zIndex: isOpen ? 999 : 1
    // }
  })
);

const StyledContainer = styled(Container)({
  width: "100%",
  display: "flex",
  alignItems: "center",
});

const Actions = styled("div")({
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  marginRight: ".5rem",
  [DESKTOP]: {
    marginRight: "1rem",
  },
});

const CtaLink = styled("div")({
  display: "flex",
  cursor: "pointer",
  fontSize: "1.5rem",
  color: CHARCOAL,
  marginRight: 16,
  [TABLET]: {
    marginRight: 8,
  },
});

const NavMenuCta = styled(FontAwesomeIcon)({
  display: "none",
  marginRight: 8,
  [TABLET]: {
    display: "flex",
  },
});

const Name = styled("div")({
  ...BASE_TEXT,
  fontSize: "1.5rem",
  marginLeft: ".5rem",
});

const Title = styled("div")({
  display: "flex",
});

const BetaTag = styled("div")({
  ...BASE_TEXT,
  fontSize: 10,
});

const Header = () => {
  const [formVisible, setFormVisible] = useState(false);
  const currentuser = useContext(CurrentUserContext);
  return (
    <Wrapper>
      <StyledContainer>
        <Aside>
          <LogoContainer formVisible={formVisible}>
            {/* <NavMenuCta icon={faBars} /> */}

            <Logo />
            <Title>
              <Name>Lyra Labs</Name>
              <BetaTag>beta</BetaTag>
            </Title>
          </LogoContainer>
        </Aside>

        {/* <Search /> */}
        {/* <Navigation /> */}
        {formVisible && <LinkForm setFormVisible={setFormVisible} />}
        {!formVisible && (
          <Actions>
            {currentuser && (
              <CtaLink onClick={() => setFormVisible(true)}>
                <FontAwesomeIcon icon={faPlus} />
              </CtaLink>
            )}

            {currentuser && <UserAvatar user={currentuser} />}
            {!currentuser && <AuthButtons />}
          </Actions>
        )}
      </StyledContainer>
    </Wrapper>
  );
};

export default withTheme(Header);
