import { gql } from '@apollo/client';

export const GET_USER_BY_USERNAME = gql`
  query GetUserByUsername($username: String!) {
    getUserByUsername(username: $username) {
      id
      username
      password
      email
    }
  }
`;