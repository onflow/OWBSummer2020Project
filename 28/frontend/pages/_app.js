import React from "react";
import * as fcl from "@onflow/fcl";
import App from "next/app";
import Layout from "../components/layout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withMobile } from "../shared/enhancers/mobile-enhancer";
import flowConfig from "@config/flow";

const { ACCESS_NODE_API, CHALLENGE_HANDSHAKE } = flowConfig;

toast.configure();

fcl
  .config()
  .put("accessNode.api", ACCESS_NODE_API)
  .put("challenge.handshake", CHALLENGE_HANDSHAKE);

class MyApp extends App {
  render(props) {
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default withMobile(MyApp);
