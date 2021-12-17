import { gql } from "@apollo/client";

const CREATE_PROJECT = gql`
  mutation CreateProject(
    $nameProject: String!
    $budget: Float!
    $leader: String!
    $objective: [inputObjective]
    $startDate: Date!
    $endDate: Date!
  ) {
    createProject(
      nameProject: $nameProject
      budget: $budget
      leader: $leader
      objective: $objective
      startDate: $startDate
      endDate: $endDate
    ) {
      _id
      nameProject
      budget
    }
  }
`;

const EDIT_PROJECT = gql`
  mutation EditProject($_id: String!, $fields: fieldsProject!) {
    editProject(_id: $_id, fields: $fields) {
      _id
      nameProject
    }
  }
`;

const CREATE_OBJECTIVE = gql`
  mutation CreateObjective($idProject: String!, $field: fieldObjective!) {
    createObjective(idProject: $idProject, field: $field) {
      nameProject
    }
  }
`;

export { CREATE_PROJECT, CREATE_OBJECTIVE, EDIT_PROJECT };
