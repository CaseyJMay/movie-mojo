var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var schema = require("./src/graphql/schemas"); // Import the schema
var root = require("./src/graphql/resolvers"); // Import the resolvers

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
var customIPAddress = '10.0.0.169'; // Replace with your desired IP address
app.listen(4000, customIPAddress);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");