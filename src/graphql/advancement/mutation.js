import { gql } from "@apollo/client";

const CREATE_ADVANCEMENT = gql`
  mutation CreateAdvancement(
    $date: Date!
    $description: String!
    $observations: [String]!
    $project: String!
    $createdBy: String!
  ) {
    createAdvancement(
      date: $date
      description: $description
      observations: $observations
      project: $project
      createdBy: $createdBy
    ) {
      _id
    }
  }
`;

const EDIT_ADVANCEMENT_BY_ID = gql`
  mutation Mutation(
    $_id: String!
    $description: String
    $observations: [String]!
  ) {
    editAdvancement(
      _id: $_id
      description: $description
      observations: $observations
    ) {
      description
      observations
    }
  }
`;

export { CREATE_ADVANCEMENT, EDIT_ADVANCEMENT_BY_ID };
