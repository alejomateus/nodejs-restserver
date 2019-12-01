require('./../config/config')
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes/user'))
mongoose.connect('mongodb://localhost:27017/restserver',(err, res)=>{
    if(err) throw err;
    
    console.log('Database Online');
})
app.listen(process.env.PORT, () => {
    console.log('Listen port: ', process.env.PORT);
});
