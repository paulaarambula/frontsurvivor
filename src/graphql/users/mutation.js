import { gql } from "@apollo/client";

const EDIT_USER = gql`
  mutation EditUser(
    $_id: String!
    $name: String
    $lastname: String
    $identification: String
    $email: String
    $status: Enum_StatusUsers
    $rol: Enum_Rol
  ) {
    editUser(
      _id: $_id
      name: $name
      lastname: $lastname
      identification: $identification
      email: $email
      status: $status
      rol: $rol
    ) {
      name
      lastname
      identification
      email
      status
      rol
    }
  }
`;

export { EDIT_USER };
