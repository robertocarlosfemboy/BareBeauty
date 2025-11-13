//Banco de dados
// create database BareBeauty;
// use BareBeauty;

// create table cadastro(
// idCadastro int primary key auto_increment,
// nomeUsuario varchar(30) not null,
// senhaUsuario varchar(30) not null);


const cors = require('cors');

const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 3000;
//Deixar ingual.


//ROTA POST - login do Usuário.
app.post('/loginUsuario', (req, res) => {
  const { nomeUsuario, senhaUsuario } = req.body;

  if (!nomeUsuario || !senhaUsuario) {
    return res.status(400).json({ error: 'Nome ou senha não inseridos.' });
  }

  const sql = 'SELECT * FROM Memora WHERE nomeUsuario = ? AND SenhaUsuario = ?';
  db.query(sql, [nomeUsuario, senhaUsuario], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Dados inválidos.' }); // nao encontrou no Banco de Dados.
    }

    //Login bem-sucedido.
    const user = results[0];
    res.json({
      message: 'Login bem-sucedido!',
      user: {
        id: user.id,
        nomeUsuario: user.nomeUsuario,
        senhaUsuario: user.senhaUsuario
      }
    });
  });
});


//Inicializa o servidor. Também deixar ingual.
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});