import React from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { SchemaLink } from "@apollo/client/link/schema";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { typeDefs, resolvers } from "./pet";

const commonMocks = {
  Int: () => 1,
  String: () => "Pet",
};

const schema = makeExecutableSchema({
  typeDefs,
});

const schemaWithMocks = addMocksToSchema({
  schema,
  resolvers,
  mocks: commonMocks,
  preserveResolvers: false,
});

const client = new ApolloClient({
  link: new SchemaLink({ schema: schemaWithMocks }),
  cache: new InMemoryCache(),
});

const MockProvider = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default MockProvider;
