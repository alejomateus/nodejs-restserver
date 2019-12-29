const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
app.post('/login', (req, res) => {
    let body = req.body;
    User.findOne({ email: body.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                err
            });
        }
        if (!userDB) {
            return res.status(400).json({
                message: 'Incorrect username or password'
            });
        }
        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                message: 'Incorrect username or password'
            });
        }
        let token = jwt.sign({
            user: userDB
        }, process.env.SEED, { expiresIn: 60 * 60 })
        res.json({
            ok: true,
            user: userDB,
            token
        });
    })
});
module.exports = app;