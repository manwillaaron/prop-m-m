require('dotenv').config()
const massive = require('massive')
const express = require('express')
const session = require('express-session')
const app = express()
const pc = require('./controllers/propertyCtrl')
const uc = require('./controllers/userCtrl')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const {userInit} = require('./customMiddleware/initSession')

app.use(express.json())

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db is all good');
    app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} is good in the hood`))
    
}).catch(err=> console.log(err))

app.use(session({
    resave: false,
    saveUninitialized:false,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 
    }
}))

///property endpoints\\\
app.get('/api/properties', pc.getUsersProperties)

///user endpoint\\\
app.post('/api/register', uc.register)
app.post('/api/login', userInit , uc.login)
app.delete('/api/logout', uc.logout)
