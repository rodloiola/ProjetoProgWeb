const express = require('express');
const router = express.Router();
const Lista = require('../models/lista');

// Adicionar tarefa à lista
router.post('/:listaId/tarefas', async (req, res) => {
  try {
    const lista = await Lista.findById(req.params.listaId);
    if (!lista) {
      return res.status(404).json({ error: 'Lista não encontrada' });
    }
    lista.tasks.push({ text: req.body.text, completed: false });
    await lista.save();
    res.status(201).json(lista);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar a tarefa' });
  }
});

// Obter todas as tarefas de uma lista
router.get('/:listaId/tarefas', async (req, res) => {
  try {
    const lista = await Lista.findById(req.params.listaId);
    if (!lista) {
      return res.status(404).json({ error: 'Lista não encontrada' });
    }
    res.json(lista.tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
});

// Deletar uma tarefa de uma lista
router.delete('/:listaId/tarefas/:tarefaId', async (req, res) => {
  try {
    const lista = await Lista.findById(req.params.listaId);
    if (!lista) {
      return res.status(404).json({ error: 'Lista não encontrada' });
    }
    lista.tasks.id(req.params.tarefaId).remove();
    await lista.save();
    res.json({ message: 'Tarefa removida' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar a tarefa' });
  }
});

module.exports = router;
