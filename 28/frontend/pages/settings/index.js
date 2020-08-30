import React from "react";
import Page from "@components/page";
import { withCurrentUser } from "@enhancers/current-user";
import { withLoginModal } from "@enhancers/login-modal";
import { withPrivateRoute } from "@enhancers/private-route";
import { flowRight as compose } from "lodash";

const SettingsPage = ({ user }) => {
  return (
    <Page>
      <div>Settings Page</div>
    </Page>
  );
};

const enhance = compose(
  withPrivateRoute,
  withCurrentUser,
  withLoginModal,
  withPrivateRoute
);
export default enhance(SettingsPage);
