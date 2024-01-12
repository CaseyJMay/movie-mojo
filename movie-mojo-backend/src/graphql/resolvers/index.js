const userResolvers = require('./user');
// If you have other resolvers, import them here

module.exports = {
  ...userResolvers,
  // Spread other resolvers here
};