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
 * @param  {} '/about' - about directory
 * @param  {} req - request
 * @param  {} res - response
 */
app.get('/about', (req, res) => {
  console.log('about called!')
  res.render('about')
})

/**
 * Get /projects/:id method
 * @param  {id'} '/projects/ - projects directory id
 * @param  {} req - request
 * @param  {} res - response
 */
app.get('/projects/:id', (req, res) => {
  console.log('Id called!')
  if (projects[req.params.id]) {
    res.render('project', { projects: projects[req.params.id] })
  } else {
    const err = new Error()
    console.error(err.stack)
    err.status = 404
    err.message = 'Project not found!...'
    throw err
  }
})

/**
 * Custom error handler
 * @param  {} req - request
 * @param  {} res - response
 * @param  {} next - next
 */
app.use((req, res, next) => {
  console.log('404 error handler called!')
  res.status(404).render('page-not-found')
})

/**
 * Custom error handler
 * @param  {} err - error
 * @param  {} req - request
 * @param  {} res - response
 * @param  {} next - next
 */
app.use((err, req, res, next) => {
  console.error(err.stack)
  if (err.status === 404) {
    res.status(404).render('page-not-found', { err })
  } else {
    err.message = `Oops! It looks like something went wrong on the server.`
    res.status(err.status || 500).render('error', { err })
  }
})

const PORT = 3000
/**
 * Localhost listens at port 3000
 * console.log info of home and port address
 * @param  {} PORT - port number
 * @param  {} () - anonymous arrow function
 */
app.listen(PORT, () => {
  console.log(`The server is running on 127.0.0.1:${PORT}`)
})
