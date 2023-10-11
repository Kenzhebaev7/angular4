const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const config = require('./config/db')
const {mongo} = require("mongoose");
const {db} = require("./config/db");
const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) =>{
    res.send('SECOND PROJECT WITH STACK MEAN')
});

app.get('/test', (req, res) =>{
    // const collection = client.db('todos').collection('todos'); // замените на имя вашей коллекции
    res.sendFile(path.join(__dirname, '/public/test.html'));
}
);

const main = () => {
    return new Promise( (resolve,reject)=>
    {
        mongoose
            .connect(db)
            .then(() => {
                console.log('DB Connected');
                app.listen(port, () => {
                    console.log('Server started' + port)
                    resolve();
                })
            })
            .catch((err)=>{
                console.log(err)
            })
    })
}

main()
    .then(() => {
        console.log("Success")
    })
    .catch((err)=>{
        console.log("ERROR")
    })
