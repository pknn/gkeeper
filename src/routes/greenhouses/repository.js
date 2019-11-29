import db from '../../db';

export default {
  get: async id => {
    const result = await db.query('SELECT * FROM greenhouses WHERE id=$1', [id]);
    return result.rows[0];
  },
  update: async (id, name, plant) => {
    const result = await db.query(
      'UPDATE greenhouses SET name=$1, plant=$2 WHERE id=$3 RETURNING name, plant',
      [name, plant, id]
    );
    return result.rows[0];
  },
  getStatOfType: async (id, type) => {
    const query = [
      'SELECT statistics.collected_at collected_at, statistics.value FROM greenhouses',
      'JOIN statistics ON greenhouses.id=statistics.greenhouse_id',
      'WHERE greenhouses.id=$1 AND',
      'statistics.type=$2',
      'ORDER BY statistics.collected_at DESC',
      'LIMIT 50'
    ].join(' ');
    const result = await db.query(query, [id, type]);
    return result.rows;
  },
  getStatOf: async id => {
    const query = [
      'SELECT statistics.collected_at collected_at, statistics.value, statistics.type FROM greenhouses',
      'JOIN statistics ON greenhouses.id=statistics.greenhouse_id',
      'WHERE greenhouses.id=$1',
      'ORDER BY statistics.collected_at DESC',
      'LIMIT 50'
    ].join(' ');
    const result = await db.query(query, [id]);
    return result.rows;
  }
};
