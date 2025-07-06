const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

app.use(cors());
const pool = new Pool({
    user: 'kbadmin',
    host: 'localhost',
    database: 'kbdb',
    password: 'securepass',
    port: 5432,
});

app.get('/switches', async (req, res) => {
    const result = await pool.query('SELECT * FROM switches');
    res.json(result.rows);
});

app.listen(3001, () => console.log('Server running on port 3001'));
