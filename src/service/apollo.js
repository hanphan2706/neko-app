import React from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { SchemaLink } from "@apollo/client/link/schema";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    pet: Pet
  }

  type Mutation {
    createPetProfile(input: PetInput!): ResolveCreatePetOrError
  }

  input PetInput {
    name: String!
    jobDescription: String
    jobType: String!
  }

  type ResolveCreatePetOrError {
    payload: Pet
    error: Error
  }

  type Pet {
    id: String!
    name: String!
    jobDescription: String
    jobType: String!
  }

  type Error {
    code: Int
    message: String
  }
`;

const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => "Hello",
  DateTime: () => casual.date((format = "YYYY-MM-DDTHH:mm:ss.SSSZZ")),
};

const resolvers = {
  Query: {
    pet: () => ({
      name: "Pom",
    }),
  },
  Mutation: {
    createPetProfile: () => ({
      payload: {
        id: 1,
        name: "Pom",
        jobDescription: "hihi",
        jobType: "meomeo",
      },
      error: null,
    }),
  },
};

const schema = makeExecutableSchema({
  typeDefs,
});

const schemaWithMocks = addMocksToSchema({
  schema,
  resolvers,
  preserveResolvers: false,
  mocks,
});

const mockClient = new ApolloClient({
  link: new SchemaLink({ schema: schemaWithMocks }),
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
