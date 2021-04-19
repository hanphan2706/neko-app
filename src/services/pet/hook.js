import { gql } from "@apollo/client";

const CREATE_PET_PROFILE = gql`
  mutation createPetProfile($input: PetInput!) {
    createPetProfile(input: $input) {
      payload {
        id
      }
      error {
        code
        messsage
      }
    }
  }
`;

export default { mutations: { CREATE_PET_PROFILE } };
