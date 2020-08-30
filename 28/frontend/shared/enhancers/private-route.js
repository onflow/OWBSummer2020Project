import React from "react";
import Router from "next/router";

const login = "/";

const checkUserAuthentication = async (req) => {
  const dev = process.env.NODE_ENV !== "production";
  const server = dev ? "http://localhost:3000" : "https://lyralabs.io";
  const headers = req && req.headers ? { cookie: req.headers.cookie } : {};
  try {
    const response = await fetch(`${server}/api/me`, {
      headers,
    });
    const profile = await response.json();
    if (profile.error) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    return false;
  }
};

export const withPrivateRoute = (Component, options = {}) => {
  const WithPrivateRoute = (props) => {
    return <Component {...props} />;
  };
  WithPrivateRoute.getInitialProps = async (ctx) => {
    const { req, res } = ctx;
    const isAuthorized = await checkUserAuthentication(req);
    if (!isAuthorized) {
      // Handle server-side and client-side rendering.
      if (res) {
        res?.writeHead(302, {
          Location: login,
        });
        res?.end();
      } else {
        Router.replace(login);
      }
    } else {
      let pageProps = {};
      pageProps = await Component.getInitialProps(ctx);
      return { ...pageProps };
    }
  };
  return WithPrivateRoute;
};
