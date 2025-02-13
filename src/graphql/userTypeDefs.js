const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    created_at: String!
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): String!
    login(email: String!, password: String!): String!
  }
`;

module.exports = userTypeDefs;