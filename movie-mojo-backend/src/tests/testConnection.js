const resolvers = require('../graphql/resolvers');

async function testGetAllUsers() {
  try {
    const result = await resolvers.Query.getAllUsers();
    console.log('getAllUsers result:', result);
  } catch (error) {
    console.error('Error testing getAllUsers:', error);
  }
}

testGetAllUsers();