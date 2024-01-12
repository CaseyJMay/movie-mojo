
const {  getUserById,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser} = require('../../models/userModel')

const userResolvers = {
  Query: {
    // Resolver for getUser query
    getUser: async (_, { id }) => {
      // Implement logic to retrieve a user by ID from the database
      console.log("getAllUsers query received");
      const user = await getUserById(id);
      return user;
    },
    // Resolver for getAllUsers query
    getAllUsers: async () => {
        let users = []; // Initialize users as an empty array
        console.log("getAllUsers query received");
        try {
          users = await getAllUsers();
        } catch (error) {
          console.log('Error fetching users:', error);
        }
        return users; // Now users is accessible here
      },
  },
  Mutation: {
    // Resolver for createUser mutation
    createUser: async (_, { username, password, email }) => {
      // Implement logic to create a new user
      // Remember to hash the password before storing it
      const newUser = await createUser({ username, password, email });
      return newUser;
    },
    // Resolver for updateUser mutation
    updateUser: async (_, { id, username, password, email }) => {
      // Implement logic to update an existing user
      const updatedUser = await updateUser({ id, username, password, email });
      return updatedUser;
    },
    // Resolver for deleteUser mutation
    deleteUser: async (_, { id }) => {
      // Implement logic to delete a user
      await deleteUser(id);
      return `User with ID ${id} was deleted.`;
    },
  },
};

module.exports = userResolvers;