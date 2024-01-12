const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    id: ID!
    username: String!
    password: String!
    email: String
    created_at: String
  }

  type Query {
    getUser(id: ID!): User
    getAllUsers: [User]
  }

  type Mutation {
    createUser(username: String!, password: String!, email: String): User
    updateUser(id: ID!, username: String, password: String, email: String): User
    deleteUser(id: ID!): String
  }
`);