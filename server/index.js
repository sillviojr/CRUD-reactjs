const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "crud3lm",
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const { func_nome } = req.body;
  const { func_sobrenome } = req.body;
  const { func_nascimento } = req.body;
  const { func_salario } = req.body;
  const { cargo_descricao } = req.body;

  let SQL =
    "INSERT INTO FUNCIONARIOS (func_nome, func_sobrenome, func_nascimento, func_salario) VALUES ( ?,?,?,?)";
  let CAR = "INSERT INTO CARGOS (cargo_descricao) VALUES ( ? )";

  db.query(
    SQL,
    [func_nome, func_sobrenome, func_nascimento, func_salario],
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
  db.query(CAR, [cargo_descricao], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { func_nome } = req.body;
  const { func_sobrenome } = req.body;
  const { func_nascimento } = req.body;
  const { func_salario } = req.body;
  const { cargo_id } = req.body;

  let SQL =
    "UPDATE FUNCIONARIOS SET func_nome = ?, func_sobrenome = ?, func_nascimento = ?, func_salario = ? WHERE funcionarios_id = ?";

  db.query(
    SQL,
    [func_nome, func_sobrenome, func_nascimento, func_salario, id, cargo_id],
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

app.delete("/delete/:funcionarios_id", (req, res) => {
  const { funcionarios_id } = req.params;
  let SQL = "DELETE FROM FUNCIONARIOS WHERE funcionarios_id = ?";

  db.query(SQL, [funcionarios_id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.get("/getCards", (req, res) => {
  let mysql = "SELECT * FROM FUNCIONARIOS";
  let mysq = "SELECT * FROM CARGOS";
  db.query(mysql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Rodando servidor");
});
