import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($input: LoginInput!) {
    loginUser(input: $input) {
      user {
        id
        fullName
        email
        firstName
        lastName
      }
      token
      message
    }
  }
`;

export const CREATE_USER = gql`
  mutation createNewUser($input: CreateInput!) {
    createUser(input: $input) {
      user {
        id
        email
        firstName
        lastName
      }
      message
      token
      errors
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getSingleUser($id: ID!) {
    showUser(id: $id) {
      id
      email
      fullName
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateExistingUser($input: UpdateInput!) {
    updateUser(input: $input) {
      user {
        id
        fullName
        email
      }
      errors
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteExistingUser($input: DeleteInput!) {
    deleteUser(input: $input) {
      message
      errors
    }
  }
`;
