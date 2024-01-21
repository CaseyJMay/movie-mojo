const userResolvers = require('./user');
const movieResolvers = require('./movie')
// If you have other resolvers, import them here

module.exports = {
  ...userResolvers,
  ...movieResolvers,
  // Spread other resolvers here
};