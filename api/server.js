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
        console.log('🔗 DB config:', {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });          
        const result = await pool.query('SELECT * FROM switches');
        res.json(result.rows);
    } catch (err) {
        console.error('💥 Query Error:', err.message);
        console.error('🧵 Stack Trace:', err.stack);
        res.status(500).json({ error: 'Database query failed' });
    }
      
});

app.listen(3001, () => console.log('Server running on port 3001'));
