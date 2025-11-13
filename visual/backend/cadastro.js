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


//ROTA POST - Cadastro de novos usuarios.
app.post('/cadastrarUsuario', (req, res) => { 
  const { nomeUsuario, senhaUsuario } = req.body;

  if (!nomeUsuario || !senhaUsuario) {
    return res.status(400).json({ error: 'Nome ou senha não inseridos.' });
  }

  const sql = 'INSERT INTO cadastro (nomeUsuario, senhaUsuario) VALUES (?, ?)';
  db.query(sql, [nomeUsuario, senhaUsuario], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'O usuário já está cadastrado' });
      }
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({ message: 'Usuário registrado com sucesso'});
  });
});


//Inicializa o servidor. Também deixar ingual.
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});