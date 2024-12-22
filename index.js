const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Note = require('./models/app');
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/notes", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
console.log("Connected to MongoDB");


// const NoteSchema = new mongoose.Schema({
//     title: String,
//     description: String
// });

// const Note = mongoose.model("Note", NoteSchema);

app.get('/notes', async (req, res) => {
        
    const notes = await Note.find();
    res.json(notes);
    })

app.get('/notes/:id', async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.json(note);
})

app.delete('/notes/:id', async (req, res) => {
    const note = await Note.findByIdAndDelete(req.params.id);
    res.json(note);  
})

app.put('/notes/:id', async (req, res) => {
    const { title, description } = req.body;
    const note = await Note.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
    res.json(note);
})

app.post('/notes', async (req, res) => {
    const { title, description } = req.body;
    const note = new Note({ title, description });
    await note.save();
    res.json(note);
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})