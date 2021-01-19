const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')
const config = require('config')
const logger = require('./middleware/logger')
const authenticator = require('./authenticator')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const Joi = require('joi') // Class is returned
const helmet = require('helmet')
const morgan = require('morgan')
const genre = require('./api-routes/genres')
const home = require('./api-routes/home')

app.set('view engine', 'pug') //internally node will do the 'require('pug')'
//optional setting
app.set('views', './views')


//config
console.log('ApplicaitonName :' + config.get('name'))
console.log('Mail Server Name :' + config.get('mail.host'))
console.log('Mail Server Password :' + config.get('mail.password'))

// console.log(`Node_Env : ${process.env.NODE_ENV}`)
// console.log(`app : ${app.get('env')}`)

if (app.get('env') === 'development') {
    app.use(morgan('tiny')) // used for logging, reduces performance of the app
    startupDebugger('Morgan Enabled')
}
dbDebugger('Connected to db')

app.use(helmet()) //Mainly used for headers
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('static'))
app.use(logger)
app.use(authenticator)
app.use('/api/genre', genre)
app.use('/', home)

app.listen(3000, () => {
    console.log('connected to port 3000')
})