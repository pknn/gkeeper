import db from '../../db';

export default {
  create: async (username, email, passwordHash) => {
    await db.query('INSERT INTO users(username, email, password_hash) VALUES ($1, $2, $3)', [
      username,
      email,
      passwordHash
    ]);
  },
  getUserByUsername: async username => {
    const result = await db.query('SELECT * FROM users WHERE username=$1', [username]);
    return result.rows[0];
  }
};
