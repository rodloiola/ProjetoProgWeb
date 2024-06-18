const express = require('express');
const router = express.Router();
const Tarefa = require('../models/tarefa');
const Lista = require('../models/lista');

// GET /api/tarefas?lista=listaId
router.get('/', async (req, res) => {
  try {
    const { lista } = req.query;
    const tarefas = await Tarefa.find({ lista });
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
});

// POST /api/tarefas/create
router.post('/create', async (req, res) => {
  try {
    const { description, lista } = req.body;
    const novaTarefa = new Tarefa({ description, lista });
    await novaTarefa.save();

    // Atualizar a lista para incluir a nova tarefa
    const listaAtual = await Lista.findById(lista);
    listaAtual.tasks.push(novaTarefa);
    await listaAtual.save();

    res.json(novaTarefa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
});

// DELETE /api/tarefas/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Tarefa.findByIdAndDelete(id);
    res.json({ msg: 'Tarefa removida' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar tarefa' });
  }
});

module.exports = router;
