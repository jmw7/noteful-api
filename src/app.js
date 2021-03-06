require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config.js')
const foldersRouter = require('./folders/folders-router')
const notesRouter = require('./notes/notes-router')


const app = express();
app.use(cors())

const morganSetting = NODE_ENV === 'production' ? 'tiny' : 'dev';
app.use(morgan(morganSetting))
app.use(helmet())
app.use('/api/folders', foldersRouter)
app.use('/api/notes', notesRouter)



app.use((error, req, res, next) => {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error('error');
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app