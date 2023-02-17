import express from 'express'
import data from './data.json'

const app = express()

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.send('Its no matter')
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`The server is running on 127.0.0.1:${PORT}`)
})
