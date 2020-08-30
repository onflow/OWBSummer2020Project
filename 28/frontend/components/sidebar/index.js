import React, { useContext } from "react";
import styled from "@emotion/styled";
import {
  Sidebar as Container,
  SidebarSection,
} from "@library/components/layout";

import { Divider } from "@library/components/layout";

import WalletDetails from "@components/wallet-details";
import UserCard from "@components/user-card";
import Nav from "./nav";
import { CurrentUserContext } from "@enhancers/current-user";
import TopicList from "@components/topic-list";
import SponsorList from "@components/sponsor-list";

const StickySidebarSection = styled(SidebarSection)({
  position: "sticky",
  top: 77,
});

const StyledDivider = styled(Divider)({
  marginTop: 20,
  marginBottom: 20,
});

const Sidebar = () => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <Container>
      {currentUser && (
        <StickySidebarSection>
          <UserCard user={currentUser} />
          <Nav />
          <StyledDivider />
          <WalletDetails currentUser={currentUser} />
          {/* <SponsorList /> */}
        </StickySidebarSection>
      )}
      {/* <TopicList query={CURATED_TOPICS_QUERY} dataKey={"curatedTopics"} /> */}
      {/* <SidebarSection>
            <CTALink path={"/tags"} text={"View all-time top tags"} />
          </SidebarSection>
          <SidebarSection>
            <StyledDivider />
          </SidebarSection>
          <SponsorList /> */}
    </Container>
  );
};

export default Sidebar;
