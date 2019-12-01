const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/user');
app.get('/user', (req, res) => {
    res.json('get User')
})
app.post('/user', (req, res) => {
    let body = req.body;
    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });
    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                err
            });
        }
        res.json({
            user: userDB
        });
    })
});
app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, [
        'name',
        'email',
        'img',
        'role',
        'state'
    ]);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                err
            });
        }
        res.json({
            user: userDB
        });
    })
});
app.delete('/user/:id', (req, res) => {
    res.json(`delete User ${req.id}`);
});
module.exports = app;