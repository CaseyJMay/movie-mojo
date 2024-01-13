
const { query } = require('../../models/database');

// Define your resolver functions
const root = {
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
    getUser: async ({ id }) => {
        try {
          const user = await query('SELECT * FROM users WHERE id = $1', [id]);
          if (user.length > 0) {
            return user[0]; // Return the first user from the result
          } else {
            throw new Error(`User with ID ${id} not found`);
          }
        } catch (error) {
          console.log(`Error fetching user with ID ${id}:`, error);
          throw error; // Re-throw the error to be handled by GraphQL
        }
      },
    getUserByUsername: async ({ username }) => {
    try {
        const user = await query('SELECT * FROM users WHERE username = $1', [username]);
        if (user.length > 0) {
        return user[0]; // Return the first user from the result
        } else {
        throw new Error(`User with username ${username} not found`);
        }
    } catch (error) {
        console.log(`Error fetching user with username ${username}:`, error);
        throw error; // Re-throw the error to be handled by GraphQL
    }
    },
};

module.exports = root;

