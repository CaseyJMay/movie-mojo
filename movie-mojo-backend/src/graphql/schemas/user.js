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

  type Movie {
    id: ID!
    title: String!
    posterPath: String
    description: String!
    releaseDate: String!
  }

  type Query {
    getAllUsers: [User]
    getUser(id: ID!): User
    getUserByUsername(username: String!): User
    getMoviesBySearchTerm(searchTerm: String!): [Movie]
  }
`);

module.exports = schema;