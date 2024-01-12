var express = require("express")
var { graphqlHTTP } = require("express-graphql")
var { buildSchema } = require("graphql")
const { query } = require('./src/models/database'); // Update the path

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type User {
    id: ID!
    username: String!
    password: String!
    email: String
    created_at: String
  }

  type Query {
    getAllUsers: [User]
  }
`)

// The root provides a resolver function for each API endpoint
var root = {
  getAllUsers: async () => {
    let users = []; // Initialize users as an empty array
    console.log("getAllUsers query received");
    try {
      users = await query('SELECT * FROM users');
      return users;
    } catch (error) {
      console.log('Error fetching users:', error);
    }
    return users; // Now users is accessible here
  },
}

var app = express()
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")