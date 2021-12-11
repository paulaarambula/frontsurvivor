import { gql } from "@apollo/client";

const CREATE_PROJECT = gql`
  mutation CreateProject(
    $nameProject: String!
    $budget: Float!
    $leader: String!
    $objective: [inputObjective]
  ) {
    createProject(
      nameProject: $nameProject
      budget: $budget
      leader: $leader
      objective: $objective
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

const EDIT_STAGE_PROJECT = gql`
  mutation EditStageProject($_id: String!, $stageProject: Enum_ProjectStage!) {
    editStageProject(_id: $_id, stageProject: $stageProject) {
      _id
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

export { CREATE_PROJECT, CREATE_OBJECTIVE, EDIT_PROJECT, EDIT_STAGE_PROJECT };
