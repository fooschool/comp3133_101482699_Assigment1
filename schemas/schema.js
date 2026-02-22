import { gql } from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    created_at: String
    updated_at: String
  }

  type Query {
    login(usernameOrEmail: String!, password: String!): User
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
  }
`;

export default typeDefs;
