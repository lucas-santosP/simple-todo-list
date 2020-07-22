const express = require("express");
const routes = express.Router();

//Fazendo conexão com o banco de dados
const Pool = require("pg").Pool;
const db = new Pool({
  user: "postgres",
  password: "8369",
  host: "localhost",
  port: 5432,
  database: "database_tasks",
});

routes.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err)
      return res.status(500).send({ error: "GET - Erro no banco de dados." });

    const tasks = result.rows;
    return res.json(tasks);
  });
});

routes.post("/tasks", (req, res) => {
  const { text, state } = req.body;

  const query = `INSERT INTO tasks ("text", "state") 
    VALUES ('${text}', '${state}')`;

  db.query(query, (err) => {
    if (err) return res.send("POST - Erro no banco de dados.");

    return res.json({ text, state });
  });
});

routes.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  db.query(
    `UPDATE tasks
      SET state= '${state}'
      WHERE id = ${id};`,
    (err) => {
      if (err) return res.send("PUT - Erro no banco de dados.");

      return res.json({ id, state });
    }
  );
});

routes.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    `DELETE FROM tasks
      WHERE id = ${id};`,
    (err) => {
      if (err) return res.send("DELETE - Erro no banco de dados.");

      return res.status(204).send();
    }
  );
});

module.exports = routes;
