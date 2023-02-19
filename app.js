// Use of Babel compiler implemented here.
import express from 'express'
import data from './data.json' assert { type: 'json' }

const app = express()

// also const  projects  = data.projects
const { projects } = data

/**
 * Setting the view engine to pug
 * @param  {string} 'view engine'
 * @param  {string} 'pug'
 */
app.set('view engine', 'pug')

/**
 * Using the public folder at the route /static
 * static middleware route to serve public files
 * @param  {string} '/static'
 * @param  {route} express.static('public')
 */
app.use('/static', express.static('public'))

/**
 * Get / method
 * @param  {string} '/' - home directory
 * @param  {request} req - request
 * @param  {response} res - response
 */
app.get('/', (req, res) => {
  console.log('index called!')
  res.render('index', { projects })
})

/**
 * Get /about method
 * @param  {string} '/about' - about directory
 * @param  {request} req - request
 * @param  {response} res - response
 */
app.get('/about', (req, res) => {
  console.log('/about called!')
  res.render('about')
})

/**
 * Get /projects/:id method
 * @param  {id'} '/projects/ - projects directory id
 * @param  {request} req - request
 * @param  {response} res - response
 */
app.get('/projects/:id', (req, res, next) => {
  console.log('/projects/' + projects[req.params.id].id + ' called!')
  if (projects[req.params.id]) {
    res.render('project', { projects: projects[req.params.id] })
  } else {
    const err = new Error()
    err.status = 404
    err.message = 'Project not found!...'
    next(err)
  }
})

/**
 * Custom error handler
 * @param  {request} req - request
 * @param  {response} res - response
 * @param  {next} next - next
 */
app.use((req, res, next) => {
  const err = new Error()
  err.status = 404
  err.message = 'Page not found!'
  next(err)
})

/**
 * Custom error handler
 * @param  {error} err - error
 * @param  {request} req - request
 * @param  {response} res - response
 * @param  {next} next - next
 */
app.use((err, req, res, next) => {
  if (err.status === 404) {
    console.log(err.status + ' Page not found!...')
    res.status(err.status)
    res.render('page-not-found', { err })
  } else {
    err.status = 500
    console.log(err.status + ' Internal server error!...')
    err.message = 'Oops! It looks like something went wrong on the server.'
    res.status(err.status || 500).render('error', { err })
  }
})

const PORT = 3000
/**
 * Localhost listens on port 3000
 * console.log info of home and port address
 * @param  {integer} PORT - port number
 * @param  {function} () - anonymous arrow function
 */
app.listen(PORT, () => {
  console.log(`The server is running on 127.0.0.1:${PORT}`)
})
