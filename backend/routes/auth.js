const express = require('express');
const router = express.Router();

// Registro de usuário
router.post('/register', (req, res) => {
  // Lógica para registrar usuário
  res.send('Usuário registrado');
});

// Login de usuário
router.post('/login', (req, res) => {
  // Lógica para login de usuário
  res.send('Usuário logado');
});

module.exports = router;
