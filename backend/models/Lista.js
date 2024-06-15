const mongoose = require('mongoose');

const listaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tarefa',
  }],
});

module.exports = mongoose.model('Lista', listaSchema);
