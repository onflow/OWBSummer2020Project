import React, { useContext } from "react";
import styled from "@emotion/styled";
import { BASE_TEXT } from "@style/typography";
import { Container, Column, Main } from "@library/components/layout";
import { LAPTOP } from "../shared/style/breakpoints";
import { CurrentUserContext } from "@enhancers/current-user";
import Header from "@components/header";
import Sidebar from "@components/sidebar";
import WalletPanel from "@components/wallet/panel";

const StyledContainer = styled(Container)({
  width: "100%",
});

// const Wrapper = styled("div")({
//   fontSize:
// });

// font-size: var(--fs-base);
// width: 100%;
// max-width: var(--site-width);
// margin: 0 auto;
// display: grid;
// grid-gap: var(--layout-gap);
// grid-template-columns: var(--layout);
// padding: var(--layout-padding);
// }

const MobileMsg = styled("div")({
  marginBottom: 10,
  display: "flex",
  [LAPTOP]: {
    display: "none",
  },
});

const Text = styled("div")({
  ...BASE_TEXT,
});

const Page = ({ children }) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <Column>
      <Header />
      <Column>
        <StyledContainer>
          {currentUser && <Sidebar />}
          <Main>
            <MobileMsg>
              <Text>
                Not optimized for mobile devices yet. Some features may not be
                available (e.g. Flow Wallet) 🧐
              </Text>
            </MobileMsg>
            {children}
          </Main>
        </StyledContainer>
      </Column>
    </Column>
  );
};

export default Page;
