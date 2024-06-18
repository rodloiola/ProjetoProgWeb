const express = require('express');
const router = express.Router();
const Lista = require('../models/lista');

// GET /api/listas
router.get('/', async (req, res) => {
  try {
    const listas = await Lista.find().populate('tasks');
    res.json(listas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar listas' });
  }
});

// POST /api/listas/create
router.post('/create', async (req, res) => {
  try {
    const { name } = req.body;
    const novaLista = new Lista({ name });
    await novaLista.save();
    res.json(novaLista);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar lista' });
  }
});

// DELETE /api/listas/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Lista.findByIdAndDelete(id);
    res.json({ msg: 'Lista removida' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar lista' });
  }
});

module.exports = router;
