const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'movie_mojo',
  port: 5432,
});

const query = async (text, params) => {
  const res = await pool.query(text, params);
  return res.rows;
};

module.exports = {
  query,
};