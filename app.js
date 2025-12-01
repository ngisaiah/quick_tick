const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const hbs = require('express-handlebars')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env'} )

// Passport config
require('./config/passport')(passport)

connectDB()

const app = express()

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Handlebars
app.engine('hbs', hbs.engine({
    extname: '.hbs',
    defaultLayout: 'main' // default layout file
}));
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'));

//Session middleware
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 5000

app.listen(
    PORT, 
    console.log(`Server running on ${PORT}`)
)