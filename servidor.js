const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static(__dirname));

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

app.get("/menu", async (req, res) => {
  try {
    const cafes = await pool.query("SELECT * FROM cafes");
    const doces = await pool.query("SELECT * FROM doces");
    res.json({ cafes: cafes.rows, doces: doces.rows });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/cafes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cafes");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/doces", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM doces");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
