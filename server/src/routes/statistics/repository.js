import db from '../../db';

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
  },
  createByGreenhouseID: async (greenhouseID, type, value) => {
    await db.query('INSERT INTO statistics(greenhouse_id, type, value) VALUES ($1, $2, $3)', [
      greenhouseID,
      type,
      value
    ]);
  },
  getMinutely: async (greenhouseID, type) => {
    const query = [
      'SELECT statistics.value as average_value, collected_at as dt',
      'FROM statistics',
      'WHERE greenhouse_id=$1',
      'AND type=$2',
      'ORDER BY collected_at DESC',
      'LIMIT 20'
    ].join(' ');
    const result = await db.query(query, [greenhouseID, type]);
    return result.rows.reverse();
  },
  getHourly: async (greenhouseID, type) => {
    const query = [
      "SELECT AVG(statistics.value) as average_value, date_trunc('hour', collected_at) as dt",
      'FROM statistics',
      'WHERE greenhouse_id=$1',
      'AND type=$2',
      "GROUP BY date_trunc('hour', collected_at)",
      "ORDER BY date_trunc('hour', collected_at) DESC",
      'LIMIT 20'
    ].join(' ');
    const result = await db.query(query, [greenhouseID, type]);
    return result.rows.reverse();
  },
  getDaily: async (greenhouseID, type) => {
    const query = [
      "SELECT AVG(statistics.value) as average_value, date_trunc('day', collected_at) as dt",
      'FROM statistics',
      'WHERE greenhouse_id=$1',
      'AND type=$2',
      "GROUP BY date_trunc('day', collected_at)",
      "ORDER BY date_trunc('day', collected_at) DESC",
      'LIMIT 20'
    ].join(' ');
    const result = await db.query(query, [greenhouseID, type]);
    return result.rows.reverse();
  },
  getLatest: async (greenhouseID, type) => {
    const result = await db.query(
      'SELECT statistics.value FROM statistics WHERE greenhouse_id=$1 AND type=$2 ORDER BY collected_at DESC LIMIT 1',
      [greenhouseID, type]
    );
    return result.rows[0];
  },
  getWatering: async greenhouseID => {
    const result = await db.query(
      "SELECT statistics.value FROM statistics WHERE type='watering' AND collected_at BETWEEN NOW() - INTERVAL '24 HOURS' AND NOW() ORDER BY collected_at DESC LIMIT 1",
      [greenhouseID]
    );
    return result.rows[0];
  }
};
