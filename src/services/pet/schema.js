import gql from "graphql-tag";

export const typeDefs = gql`
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
