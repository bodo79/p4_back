const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('./models/user')
const Data = require('./models/data')

var index_router = require('./routes/index');
var cors = require('cors');

const bodyParser = require('body-parser');

const app = express()
app.use(cors())
app.use(express.json());
app.use('/', index_router);

const uri = "mongodb+srv://rubi_test:Aa123456@cluster7.lkise.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri)
.then((result) => app.listen(5000, () => console.log('Server started on port 5000')))
.catch((err) => console.log(err))

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// add a new data to db
app.post('/api/data/add', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if(err) {
            res.sendStatus(403)
        } else {
            const reqBody = req.body
            const procedure = reqBody.procedure
            const timestamp = reqBody.timestamp
            const value = reqBody.value
            if (!procedure || !timestamp || !value) {
                res.send('Need to enter procedure, timestamp and value')
            }
            const data = new Data({
                procedure: procedure,
                timestamp: timestamp,
                value: value
            })
            data.save()
            .then((result) => {
                res.send(result).status(200)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    })
})



// // get all data 
app.get('/api/data/get', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if(err) {
            res.sendStatus(403)
        } else {
            Data.find()
            .then((result) => {
                res.send(result)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    })
})

// verifyToken exist = middlewear
function verifyToken(req, res, next) {
    //Get the auth header value
    const bearerHeader = req.headers['authorization']
    //Check if bearer undefined
    if(typeof bearerHeader !== 'undefined') {
        //Split the header
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403)
    }
}

app.get('/api', (req, res) => {
    res.json({
        message: 'Hi API'
    })
})

// regiter a new user to db
// app.post('/api/register', (req, res) => {
//     const name = req.get('name', null)
//     const email = req.get('email', null)
//     const password = req.get('password', null)
//     if (!name || !email || !password) {
//         res.send('Need to enter name, email and password')
//     }
//     const user = new User({
//         name: name,
//         email: email,
//         password: password
//     })
//     user.save()
//     .then((result) => {
//         res.send(result).status(200)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// })

// get user to check login
// app.get('/api/user/get', (req, res) => {
//     User.findOne({email: email})
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// })

// Log in a user and res jwt token
// app.post('/api/login', (req, res) => {
//     // validate req attr
//     const reqBody = req.body
//     const email = reqBody.email
//     const password = reqBody.password
//     if (!email || !password) {
//         res.send('Need to enter email and password').status(403)
//     }
//     let user
//     // find the user by email
//     User.findOne({email: email})
//     .then((result) => {
//         console.log(result)
//         // check password is correct
//         if(result.password !== password) {
//             res.sendStatus(403)
//         } else {
//             user = result
//         }
//     })
//     .catch((err) => {
//         console.log(err)
//     })
//     // generate jwt token
//     jwt.sign({user}, 'secretKey', (err, token) => {
//         if(err) {
//             res.sendStatus(403)
//         }
//         res.json({
//             token
//         }).status(200)
//     })
// })



