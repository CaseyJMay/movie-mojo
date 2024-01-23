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

  type Provider {
    logo_path: String!
    provider_id: ID!
    provider_name: String!
    display_priority: Int!
  }

  type Movie {
    id: ID!
    title: String!
    posterPath: String
    description: String!
    releaseDate: String!
    watchProviders: [Provider]
    genreList: [Int!]
  }

  type Query {
    getAllUsers: [User]
    getUser(id: ID!): User
    getUserByUsername(username: String!): User
    getMoviesBySearchTerm(searchTerm: String!): [Movie]
  }
`);

module.exports = schema;