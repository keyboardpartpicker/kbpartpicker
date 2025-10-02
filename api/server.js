const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
});

// Generic query handler
const queryHandler = (table) => async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM ${table}`);
    res.json(result.rows);
  } catch (err) {
    console.error(`Error fetching ${table}:`, err);
    res.status(500).json({ error: `Failed to fetch ${table}` });
  }
};

// Routes for each component
app.get('/switches', queryHandler('switches'));
app.get('/stabilizers', queryHandler('stabilizers'));
app.get('/keycaps', queryHandler('keycaps'));
app.get('/cases', queryHandler('cases'));
app.get('/pcbs', queryHandler('pcbs'));
app.get('/inserts', queryHandler('inserts'));
app.get('/lubricants', queryHandler('lubricants'));
app.get('/deskmats', queryHandler('deskmats'));
app.get('/cables', queryHandler('cables'));

// List all tables
app.get('/tables', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    `);
    res.json(result.rows.map(row => row.table_name));
  } catch (err) {
    console.error('Error fetching table list:', err);
    res.status(500).json({ error: 'Failed to fetch table list' });
  }
});

// Get column names
app.get('/schema/:table', async (req, res) => {
  const { table } = req.params;
  try {
    const result = await pool.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = $1
    `, [table]);
    res.json(result.rows.map(row => row.column_name));
  } catch (err) {
    console.error(`Error fetching schema for ${table}:`, err);
    res.status(500).json({ error: `Failed to fetch schema for ${table}` });
  }
});

// Server start
app.listen(3001, () => console.log('Server running on port 3001'));