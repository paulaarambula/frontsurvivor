import { gql } from "@apollo/client";

const GET_INSCRIPTIONS = gql`
  query Inscriptions {
  Inscriptions {
    _id
    dateStart
    dateEnd
    statusInscription
    student {
      _id
      name
      lastname
    }
    project {
      _id
      nameProject
    }
  }
}
`;

const GET_INSCRIPTIONS_BY_ID = gql`
  query Inscription($_id: String!) {
    Inscription(_id: $_id) {
      statusInscription
    }
  }
`;



export { GET_INSCRIPTIONS, GET_INSCRIPTIONS_BY_ID };
