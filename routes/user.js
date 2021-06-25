var express = require('express');
var router = express.Router();
var md5 = require('md5');
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const User = require('../models/user')


router.post('/register', async function (req, res, next) {
    try {
        let { name, email, password } = req.body;
        const hashed_password = md5(password.toString())

        const user = new User({
            name: name,
            email: email,
            password: hashed_password
        })

        user.save()
        .then((result) => {
            let token = jwt.sign({result}, 'secretKey')
            res.send({ status: 1, data: result, token : token }).status(200)
        })
        .catch((err) => {
            console.log(err)
        })
    } catch (error) {res.send({ status: 0, error: error });}
});
    
router.post('/login', async function (req, res, next) {
    try {
        let { email, password } = req.body;
        const hashed_password = md5(password.toString())

        User.findOne({email: email})
        .then((result) => {
            // check password is correct
            if(result.password !== hashed_password) {
                res.sendStatus(403)
            } else {
                // generate jwt token
                jwt.sign({result}, 'secretKey', (err, token) => {
                    if(err) {
                        res.sendStatus(403)
                    } else {
                        res.send({ status: 1, data: result, token : token }).status(200)
                    }
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    } catch (error) {res.send({ status: 0, error: error });}
})

module.exports = router;