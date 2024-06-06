import { graphql } from 'gql.tada'

export const LoginMutation = graphql(`
  mutation Login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
    }
  }
`)

export const UserQuery = graphql(`
  query User($id: ID!) {
    user(id: $id) {
      id
      email
      firstName
      lastName
    }
  }
`)
