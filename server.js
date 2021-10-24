if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app =express();
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors') //import the router into server.js

app.set('view engine','ejs') // setting view engine
app.set('views', __dirname + '/views') // where our views come from
app.set('layout', 'layouts/layout') // setting layouts
app.use(expressLayouts) // tell our ex app we wanna use layouts
app.use(express.static('public')) //tell ex where our public files gonna be 
app.use(bodyParser.urlencoded({limit:'10mb',extended:false}))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true})

const db = mongoose.connection
db.on('error',(error)=> console.error(error))
db.once('open' , ()=> console.log('connected to mongoDB'))

app.use('/', indexRouter) // tell the app to use the router, after you export router from index.js
app.use('/authors', authorRouter)

app.listen(process.env.PORT || 3000)