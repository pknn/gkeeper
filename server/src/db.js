import { Pool } from 'pg';

const pool = new Pool();

export default {
  end: () => pool.end(),
  query: (text, params) => pool.query(text, params)
};
