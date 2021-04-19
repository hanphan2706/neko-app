import { v4 as uuidv4 } from "uuid";

export const resolvers = {
  Query: {
    pet: () => ({
      name: "Pom",
    }),
  },
  Mutation: {
    createPetProfile: () => ({
      payload: {
        id: uuidv4(),
        name: "Pom",
        jobDescription: "",
        jobType: "Bodyguard",
      },
      error: null,
    }),
  },
};
