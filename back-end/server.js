const express = require("express");
const server = express();
const cors = require("cors");
const bodyParser = require("body-parser");

server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true })); //habilitando body da req
server.use(cors());

//Fazendo conexão com o banco de dados
const Pool = require("pg").Pool;
const db = new Pool({
  user: "postgres",
  password: "8369",
  host: "localhost",
  port: 5432,
  database: "database_tasks",
});

server.get("/", (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) return res.send("GET - Erro no banco de dados.");

    const tasks = result.rows;
    return res.send(tasks);
  });
});

server.post("/", (req, res) => {
  const newTask = {
    text: req.body.text,
    state: req.body.state,
  };

  const query = `INSERT INTO tasks ("text", "state") 
  VALUES ('${newTask.text}', '${newTask.state}')`;

  db.query(query, (err) => {
    if (err) return res.send("POST - Erro no banco de dados.");

    return res.send(newTask);
  });
});

server.put("/:id", (req, res) => {
  const task = {
    id: req.body.state,
    state: req.params.id,
  };

  db.query(
    `UPDATE tasks
    SET state= '${task.id}'
    WHERE id = ${task.state};`,
    (err) => {
      if (err) return res.send("PUT - Erro no banco de dados.");

      return res.send(task);
    }
  );
});

server.delete("/:id", (req, res) => {
  // db.query("ALTER SEQUENCE tasks_id_seq RESTART WITH 1");
  db.query(
    `DELETE FROM tasks
    WHERE id = ${req.params.id};`,
    (err) => {
      if (err) return res.send("DELETE - Erro no banco de dados.");

      return res.send({ test: "dfas" });
    }
  );
});

server.listen(1414);
