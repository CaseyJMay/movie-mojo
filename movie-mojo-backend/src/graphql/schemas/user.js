const { buildSchema } = require("graphql");

// Define your GraphQL schema
const schema = buildSchema(`
  type User {
    id: ID!
    username: String!
    password: String!
    email: String
    created_at: String
  }

  type Query {
    getAllUsers: [User]
    getUser(id: ID!): User
    getUserByUsername(username: String!): User
  }
`);

module.exports = schema;