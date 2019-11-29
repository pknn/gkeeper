import db from './db';

export default {
  create: async (username, greenhouseName, type, value) => {
    const selectQuery = [
      'SELECT greenhouses.id FROM users',
      'JOIN greenhouses ON greenhouses.user_id=users.id',
      'WHERE users.username=$1 AND',
      'greenhouses.name=$2'
    ].join(' ');
    const greenhouseResult = await db.query(selectQuery, [username, greenhouseName]);
    const { id } = greenhouseResult.rows[0];
    await db.query('INSERT INTO statistics(greenhouse_id, type, value) VALUES ($1, $2, $3)', [
      id,
      type,
      value
    ]);
  }
};
