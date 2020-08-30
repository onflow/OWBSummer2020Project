import React from "react";
const MobileDetect = require("mobile-detect");

export const MobileContext = React.createContext(false);

export const withMobile = (Component, options = {}) => {
  const WithMobile = props => {
    return (
      <MobileContext.Provider value={props.isMobile}>
        <Component {...props} />
      </MobileContext.Provider>
    );
  };
  WithMobile.getInitialProps = async ctx => {
    const req = ctx.ctx.req;
    const md = req ? new MobileDetect(req.headers["user-agent"]) : null;
    const isMobile = md ? (md.phone() ? true : false) : false;
    let pageProps = {};
    pageProps = await Component.getInitialProps(ctx);
    return { ...pageProps, isMobile };
  };
  return WithMobile;
};
