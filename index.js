const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect('mongodb+srv://af242764:242764@cluster0.jxtuley.mongodb.net/tarefas?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Schema da Tarefa
const TarefaSchema = new mongoose.Schema({
    descricao: String,
    statusRealizada: Boolean
});

const Tarefa = mongoose.model('Tarefa', TarefaSchema);

// Rotas
app.get('/api/getAll', async (req, res) => {
    const tarefas = await Tarefa.find();
    res.json(tarefas);
});

app.post('/api/post', async (req, res) => {
    const novaTarefa = new Tarefa({
        descricao: req.body.descricao,
        statusRealizada: false
    });
    await novaTarefa.save();
    res.json(novaTarefa);
});

app.put('/api/put/:id', async (req, res) => {
    const tarefa = await Tarefa.findById(req.params.id);
    tarefa.statusRealizada = req.body.statusRealizada;
    await tarefa.save();
    res.json(tarefa);
});

app.delete('/api/delete/:id', async (req, res) => {
    await Tarefa.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tarefa deletada com sucesso' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});