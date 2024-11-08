const phonebook = require('./phonebook.json')
const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/api/persons', (req, res) => {
  res.json(phonebook)
})

const PORT = 3002
app.listen(PORT)

console.log(`running on ${PORT}`)