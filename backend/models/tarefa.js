const mongoose = require('mongoose');

const tarefaSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  lista: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lista',
    required: true,
  },
});

module.exports = mongoose.model('Tarefa', tarefaSchema);
