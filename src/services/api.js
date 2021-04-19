import React from "react";
import PropTypes from "prop-types";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import MockProvider from "./mock";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export const ApiProvider = ({ children, useMock }) =>
  useMock ? (
    <MockProvider>{children}</MockProvider>
  ) : (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  );

ApiProvider.defaultProps = {
  useMock: false,
};

ApiProvider.propTypes = {
  useMock: PropTypes.bool,
};
