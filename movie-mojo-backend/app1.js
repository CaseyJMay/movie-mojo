const { graphqlHTTP } = require('express-graphql');
const express = require('express');
const schema = require('./src/graphql/schemas');
const userResolvers = require('./src/graphql/resolvers');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: userResolvers,
  graphiql: true,
}));

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

module.exports = app;