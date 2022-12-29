const express = require('express');
const dotenv = require("dotenv");
const db = require('./config/mongooseConfig');
const app = express();

//midleware to parse json payloads 
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', require('./routes/index'));

app.listen(3000, (err) => {
    if (err) { console.log('error running port'); }
    console.log('running in port 3000');
})

//fix link in votelink
