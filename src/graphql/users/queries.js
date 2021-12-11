import { gql } from "@apollo/client";

const GET_USERS = gql`
  query Users {
    Users {
      _id
      name
      lastname
      identification
      email
      status
      rol
    }
  }
`;

const GET_USER = gql`
  query User($_id: String!) {
    User(_id: $_id) {
      name
      lastname
      identification
      email
      status
      rol
    }
  }
`;

export { GET_USERS, GET_USER };
