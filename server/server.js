const express = require('express')
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/user', (req, res) => {
    res.json('get User')
})
app.post('/user', (req, res) => {
    let body = req.body;
    if (body.name === undefined) {
        res.status(400).json({
            message: 'The name is required'
        });
    } else {
        res.json({
            request: body
        });
    }
    res.json('get User')
});
app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    res.json({
        id
    });
})
app.delete('/user/:id', (req, res) => {
    res.json(`delete User ${req.id}`);
})

app.listen(3000, () => {
    console.log('Listen port: ', 3000);
})