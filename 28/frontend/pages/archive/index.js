import React, { useContext } from "react";
import { withPrivateRoute } from "@enhancers/private-route";
import Page from "@components/page";
import PostList from "@components/post-list";
import { withWallet } from "@enhancers/wallet-provider";
import { withCurrentUser } from "@enhancers/current-user";
import { withLoginModal } from "@enhancers/login-modal";
import { flowRight as compose } from "lodash";
import { AuxiliaryPanelHeaderLarge } from "@library/components/typography/headers/auxiliary-panel";

const ArchivePage = () => {
  return (
    <Page>
      <AuxiliaryPanelHeaderLarge>Archive</AuxiliaryPanelHeaderLarge>
      <PostList archived={true} />
    </Page>
  );
};

const enhance = compose(
  withPrivateRoute,
  withCurrentUser,
  withLoginModal,
  withWallet
);
export default enhance(ArchivePage);
