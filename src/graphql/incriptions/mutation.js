import { gql } from "@apollo/client";

const CREATE_INSCRIPTION = gql`
  mutation CreateInscription($project: String!, $student: String!) {
    createInscription(project: $project, student: $student) {
      _id
    }
  }
`;

const EDIT_INSCRIPTION_ENDDATE_NOW = gql`
  mutation EditInscriptionEndDateNow($_id: String!) {
    editInscriptionEndDateNow(_id: $_id) {
      dateEnd
    }
  }
`;

const EDIT_INSCRIPTION_BY_ID = gql`
  mutation EditInscription(
    $_id: String!
    $statusInscription: Enum_StatusIncription!
  ) {
    editInscription(_id: $_id, statusInscription: $statusInscription) {
      _id
    }
  }
`;

export {
  CREATE_INSCRIPTION,
  EDIT_INSCRIPTION_ENDDATE_NOW,
  EDIT_INSCRIPTION_BY_ID,
};
