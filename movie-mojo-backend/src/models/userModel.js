const { query } = require('./database'); // Import the generalized database module

const getUserById = async (id) => {
  const users = await query('SELECT * FROM users WHERE id = $1', [id]);
  return users[0];
};

const getAllUsers = async () => {
  const users = await query('SELECT * FROM users');
  return users;
};

const createUser = async ({ username, password, email }) => {
  const users = await query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *', [username, password, email]);
  return users[0];
};

const updateUser = async ({ id, username, password, email }) => {
  const users = await query('UPDATE users SET username = $1, password = $2, email = $3 WHERE id = $4 RETURNING *', [username, password, email, id]);
  return users[0];
};

const deleteUser = async (id) => {
  const result = await query('DELETE FROM users WHERE id = $1', [id]);
  return result.rowCount > 0;
};

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};