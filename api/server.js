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

app.get('/switches', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM switches');
        res.json(result.rows);
    }
    catch (err) {
        res.status(500).json({ error: 'Database query failed' });
    }
});

app.listen(3001, () => console.log('Server running on port 3001'));
