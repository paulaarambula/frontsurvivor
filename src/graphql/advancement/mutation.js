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

export { CREATE_ADVANCEMENT };
