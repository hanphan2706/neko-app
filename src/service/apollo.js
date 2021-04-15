import React from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { SchemaLink } from "@apollo/client/link/schema";
import { makeExecutableSchema } from "@graphql-tools/schema";
import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    pet: Pet
  }

  type Pet {
    name: String!
  }
`;

const resolvers = {
  Query: {
    pet: () => ({
      name: "Pom",
    }),
  },
};

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const mockClient = new ApolloClient({
  link: new SchemaLink({ schema: executableSchema }),
  cache: new InMemoryCache(),
});

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export const ApiProvider = ({ children, useMock }) => (
  <ApolloProvider client={useMock ? mockClient : client}>
    {children}
  </ApolloProvider>
);

ApiProvider.defaultProps = {
  useMock: false,
};
