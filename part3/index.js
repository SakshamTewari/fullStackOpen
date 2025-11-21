// const http = require('http');
const express = require('express');
let notes = require('./data/notes');
let persons = require('./data/persons');
const app = express();

app.use(express.json());



// const app = http.createServer((req, res) => {
//     res.writeHead(200, {'content-type': 'application/json'})
//         res.end(JSON.stringify(notes));
// })

app.get('/', (req,res) => {
  res.send('<h1> Hi Full Stack Open! </h1>');
})

// GET Requests
app.get('/api/notes', (req,res) => {
  res.json(notes);
})

app.get('/api/notes/:id', (req,res) => {
  const id = req.params.id;
  const note = notes.find(note => note.id === id);
  if (note) res.json(note);
  else res.status(404).end();
})

app.get('/api/persons', (req,res) => {
  console.log(persons.length);
  res.json(persons);
})

app.get('/api/persons/:id', (req,res) => {
  const id = req.params.id;
  const person = persons.find(person => person.id === id);
  if(person) res.json(person);
  else res.status(404).end();
})

app.get('/info', (req,res) => {
  const info = `<p> Phonebook has info for ${persons.length} people </p> <p> ${new Date()} </p>`
  res.send(info);
})

// DELETE Requests

app.delete('/api/notes/:id', (req,res) => {
  const id = req.params.id;
  const notes = notes.filter(note => note.id !== id);
  res.status(204).end();
})

app.delete('/api/persons/:id', (req,res) => {
  const id = req.params.id;
  const persons = persons.filter(person => person.id !== id);
  res.status(204).end();
})

// POST Requests

app.post('/api/notes', (req,res) => {
  console.log(req.get('content-type'));
  const body = req.body;
  
  if(!body.content){
    return res.status(400).json({
      error: 'content missing'
    })
  }
  //const maxId = notes.length > 0? Math.max(...notes.map(n => Number(n.id))) : 0
  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }
  // note.id = String(maxId + 1);
  notes = [...notes, note];
  console.log(note);
  res.json(note);
})

app.post('/api/persons', (req,res) => {
  const body = req.body;

  if(!body.name || !body.number){
    return res.status(400).json({
      error:'name or number is missing'
    });
  }
  const personExists = persons.find(person => person.name === body.name);
  if(personExists){
    return res.status(400).json({
      error:'name must be uniquq'
    });
  }

  const person = {
    id: generateIdMath(),
    name: body.name,
    number: body.number,
  }

  persons = [...persons, person];
  res.json(person);
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

// Helper functions

const generateId = () => {
  const maxId = notes.length > 0? Math.max(...notes.map(n => Number(n.id))):0;
  return String(maxId + 1);
}

const generateIdMath = () => {
  const id = Math.floor(Math.random() * 10000);
  return String(id);
}