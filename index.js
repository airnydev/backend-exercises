let phonebook = require('./phonebook.json')
const express = require('express')
const morgan = require('morgan')
const app = express()

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())
app.use(requestLogger)
app.use(morgan('tiny'))

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/api/persons', (req, res) => {
  res.json(phonebook)
})

app.get('/info', (req, res) => {
  const dateTime = new Date(Date.now())
  const dateString = dateTime.toString()
  const payload = `<p>Phonebook has info for ${phonebook.length} people</p><p>${dateString}</p>`
  console.log(payload)
  res.send(payload)
})

app.get('/api/persons/:id', (req, res) => {
  const entry = phonebook.find(e => e.id === req.params.id)
  console.log(entry)
  if (entry) {
    res.json(entry)
  }
  res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
  phonebook = phonebook.filter(entry => entry.id !== req.params.id)
  res.status(204).end()
})

let generateId = function() {
  return Math.floor(Math.random()*1000).toString()
}
let confirmEntryExists = function(name) {
  return phonebook.findIndex(entry => entry.name === name) > -1 ? true : false
}
app.post('/api/persons', (req, res) => {
  const {body} = req
  if (confirmEntryExists(body.name)) {
    res.status(400).json({error: 'name already exists'})
  }
  if (!body.name || !body.number) {
    res.status(400).json({error: 'name or number are missing'})
  }
  const newEntry = Object.assign({id: generateId()}, body)
  phonebook.push(newEntry)
  res.json(phonebook)
  
})

const PORT = 3002
app.listen(PORT)

console.log(`running on ${PORT}`)