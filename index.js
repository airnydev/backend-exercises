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

app.get('/info', (req, res) => {
  const dateTime = new Date(Date.now())
  const dateString = dateTime.toString()
  const payload = `<p>Phonebook has info for ${phonebook.length} people</p><p>${dateString}</p>`
  console.log(payload)
  res.send(payload)
})

const PORT = 3002
app.listen(PORT)

console.log(`running on ${PORT}`)