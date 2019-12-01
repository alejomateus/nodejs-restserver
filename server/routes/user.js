const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/user');
app.get('/user', (req, res) => {
    let from = req.query.from || 0;
    from = Number(from);
    let limit = req.query.from || 5;
    limit = Number(limit);
    User.find({ state: true }, 'name email role state google img')
        .skip(from)
        .limit(5)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    err
                });
            }
            User.countDocuments({ state: true }, (err, count) => {
                res.json({
                    users,
                    count
                });
            })
        });
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
    let id = req.params.id;
    // User.findByIdAndRemove(id, (err, deleteuserDB) => {
    //     if (err) {
    //         return res.status(400).json({
    //             err
    //         });
    //     }
    //     if (!deleteuserDB) {
    //         return res.status(400).json({
    //             err: {
    //                 message: 'User not found'
    //             }
    //         });
    //     }
    //     res.json({
    //         user: deleteuserDB
    //     });
    // });
    let changeState = { state: false };
    User.findByIdAndUpdate(id, changeState, { new: true }, (err, userDB) => {
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
module.exports = app;