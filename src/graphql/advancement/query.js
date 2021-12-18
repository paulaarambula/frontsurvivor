import { gql } from "@apollo/client";

const GET_ADVANCEMENTS = gql`
  query Query {
    Advancements {
      _id
      date
      description
      observations
      project {
      nameProject
    }
    createdBy {
      name
      lastname
    }
    }
  }
`;

const GET_ADVANCEMENT_BY_ID = gql`
  query Advancement($_id: String!) {
    Advancement(_id: $_id) {
      description
      observations
    }
  }
`;

export { GET_ADVANCEMENTS, GET_ADVANCEMENT_BY_ID };
