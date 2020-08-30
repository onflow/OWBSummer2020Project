import React, { Fragment } from "react";
import styled from "@emotion/styled";
import { Panel } from "../../shared/library/components/layout";
import { AuxiliaryPanelHeader } from "../../shared/library/components/typography/headers/auxiliary-panel";

const Container = styled("div")({
  marginTop: 11,
});

const WalletPanel = () => {
  return (
    <Container>
      {/* <AuxiliaryPanelHeader text="Wallet" /> */}
      <Panel>Wallet Panel!</Panel>
    </Container>
  );
};

export default WalletPanel;
