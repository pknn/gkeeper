import db from '../../db';

export default {
  create: async username => {
    return db.query('INSERT INTO users(username) VALUES ($1)', [username]);
  },
  getAll: async () => {
    const result = await db.query('SELECT * FROM users');
    return result.rows;
  },
  getByUsername: async username => {
    const result = await db.query('SELECT username FROM users WHERE username=$1', [username]);
    return result.rows[0];
  },
  getByEmail: async email => {
    const result = await db.query('SELECT email FROM users WHERE email=$1', [email]);
    return result.rows[0];
  },
  get: async id => {
    const result = await db.query('SELECT * FROM users WHERE id=$1', [id]);
    return result.rows[0];
  },
  update: async (id, username) => {
    const result = await db.query(
      'UPDATE users SET username=$1 WHERE id=$2 RETURNING id, username',
      [username, id]
    );
    return result.rows[0];
  },
  getGreenhousesOf: async id => {
    const query = [
      'SELECT greenhouses.id, name, plant FROM users',
      'JOIN greenhouses ON users.id=greenhouses.user_id',
      'WHERE users.id=$1'
    ].join(' ');
    const result = await db.query(query, [id]);
    return result.rows;
  },
  newGreenhouseOf: async (id, name, plant) => {
    return db.query('INSERT INTO greenhouses(user_id, name, plant) VALUES ($1, $2, $3)', [
      id,
      name,
      plant
    ]);
  }
};
