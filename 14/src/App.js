import React, {useContext} from "react"
import styled from 'styled-components'

import Section from './components/Section'
import Header from './components/Header'
import Curve from './components/Curve.js'
import GetLatestBlock from './demo/GetLatestBlock'
import GetAccount from './demo/GetAccount'
import ScriptOne from "./demo/ScriptOne"
import ScriptTwo from './demo/ScriptTwo'
import Authenticate from './demo/Authenticate'
import UserInfo from './demo/UserInfo'
import SendTransaction from './demo/SendTransaction'
import DeployContract from './demo/DeployContract'
import InteractWithContract from './demo/InteractWithContract'
import GetLiquidity from './dex/GetLiquidity'
import CheckPrice from './dex/CheckPrice'
import GetBalance from './dex/GetBalance'
import CheckVault from './dex/CheckVault'
import SetupVault from './dex/SetupVault'
import BuyBaloon from './dex/BuyBaloon'
import SellBaloon from './dex/SellBaloon'
import "./App.css";

// import MintFlowToken from './dex/MintFlowToken'
import GlobalContext, {Provider} from './Global'

const Wrapper = styled.div`
  font-size: 13px;
  font-family: Arial, Helvetica, sans-serif;
`;

function App() {
  const context = useContext(GlobalContext);
  return (
    <Wrapper>
      <h1 class="App_Title">🤾🏿‍♂️‍Alley-oop</h1>
      <Section style={{width:'50%'}}>
        {/* <Header>READ from FCL</Header>
        <GetLatestBlock />
        <GetAccount />
        <ScriptOne />
        <ScriptTwo /> */}
        <GetLiquidity />

        <Authenticate />
        {context.user && context.user.addr ? (
          <>
            <CheckVault />
            {context.vault ? (
              <>
                <GetBalance />
                <BuyBaloon />
                <SellBaloon />
              </>
            ):(
              <SetupVault />
            )}
          </>
        ) : (
          ''
        )}
        <div style={{position:"fixed",right:0,top:50,padding:10}}>
          <Curve
            addingFlow={context.addingFlow || 0}
            addingBaloon={context.addingBaloon || 0}
            flowReserve={context.flowReserve}
            baloonReserve={context.baloonReserve}
            width={500} height={500}
          />
        </div>

      </Section>
    </Wrapper>
  );
}

export default App;
