const express = require('express');
const app = express();
const User = require('../models/user');
app.get('/user', (req, res) => {
    res.json('get User')
})
app.post('/user', (req, res) => {
    let body = req.body;
    let user = new User({
        name: body.name,
        email: body.email,
        password: body.password,
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
    // if (body.name === undefined) {
    //     res.status(400).json({
    //         message: 'The name is required'
    //     });
    // } else {
    //     res.json({
    //         request: body
    //     });
    // }
    // res.json('get User')
});
app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    res.json({
        id
    });
});
app.delete('/user/:id', (req, res) => {
    res.json(`delete User ${req.id}`);
});
module.exports = app;