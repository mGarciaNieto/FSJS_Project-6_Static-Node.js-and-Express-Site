import express from 'express'
import data from './data.json' assert { type: 'json' }

const app = express()
const { projects } = data

app.set('view engine', 'pug')

app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  console.log('Home called!')
  res.render('index', { projects })
})

app.get('/about', (req, res) => {
  console.log('about called!')
  res.render('about')
})

app.get('/projects/:id', (req, res) => {
  console.log('Id called!')
  if (projects[req.params.id]) {
    res.render('project', { projects: projects[req.params.id] })
  } else {
    const err = new Error()
    err.status = 404
    err.message = 'Project not found!...'
    throw err
  }
})

// error route
app.get('/error', (req, res, next) => {
  console.log('Error 500 called')
  const err = new Error()
  err.message = 'Oops! It looks like something went wrong on the server.'
  err.status = 500
  throw err
})

app.use((req, res, next) => {
  console.log('404 error handler called!')
  res.status(404).render('page-not-found')
})

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).render('page-not-found', { err })
  } else {
    err.message = err.message || `Oops! It looks like something went wrong on the server.`
    res.status(err.status || 500).render('error', { err })
  }
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`The server is running on 127.0.0.1:${PORT}`)
})
