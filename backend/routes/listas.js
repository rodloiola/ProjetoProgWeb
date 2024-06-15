const express = require('express');
const router = express.Router();
const Lista = require('../models/Lista');

// Criar uma nova lista
router.post('/create', async (req, res) => {
  try {
    const newLista = new Lista({ name: req.body.name, tasks: [] });
    const lista = await newLista.save();
    res.json(lista);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao criar a lista', message: err.message });
  }
});

// Visualizar todas as listas
router.get('/', async (req, res) => {
  try {
    const listas = await Lista.find();
    res.json(listas);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao buscar as listas', message: err.message });
  }
});

// Deletar uma lista
router.delete('/:id', async (req, res) => {
  try {
    const result = await Lista.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Lista não encontrada' });
    }
    res.json({ msg: 'Lista removida' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao deletar a lista', message: err.message });
  }
});

module.exports = router;
