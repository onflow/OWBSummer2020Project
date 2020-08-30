import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { withApollo } from "./apollo";
import { CURRENT_USER_QUERY } from "../../data/queries";

export const CurrentUserContext = React.createContext({});

export const withCurrentUser = (Component) => {
  const WithCurrentUser = ({ user }) => {
    const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {});
    if (loading) {
      return <div>{`loading: ${loading}`}</div>;
    }
    if (error) {
      return <div>{JSON.stringify(error)}</div>;
    }
    if (data) {
      return (
        <CurrentUserContext.Provider value={data.me}>
          <Component />
        </CurrentUserContext.Provider>
      );
    }
  };

  return withApollo(WithCurrentUser);
};
