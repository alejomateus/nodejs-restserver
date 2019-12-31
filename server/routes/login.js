const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
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
async function verify(token) {
    console.log(token);
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    });
    console.log(token);
    const payload = ticket.getPayload();
    console.log(payload);
    return {
        name: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}
app.post('/google', async (req, res) => {
    let token = req.body.idtoken;
    let googleUser = await verify(token)
        .catch(err => {
            res.status(403).json({
                ok: false,
                err
            })
        });
    User.findOne({ email: googleUser.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                err
            });
        }
        if (userDB) {
            console.log(userDB);
            
            if (userDB.google === false) {
                return res.status(400).json({
                    message: 'Incorrect method to Sign In, try User and Password'
                });
            }  else {
                let token = jwt.sign({
                    user: userDB
                }, process.env.SEED, { expiresIn: 60 * 60 })
                res.json({
                    ok: true,
                    user: userDB,
                    token
                });
            }
        } else {
            let user = new User({
                name: googleUser.name,
                email: googleUser.email,
                img: googleUser.img,
                role: googleUser.role,
                google: true,
                password: ':)'
            });
            console.log(user);
            
            user.save((err, userDB) => {
                if (err) {
                    return res.status(400).json({
                        err
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
        }
    })
})
module.exports = app;