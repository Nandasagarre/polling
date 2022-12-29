const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/pollingApi';

mongoose.connect(uri);

const db = mongoose.connection;

db.on('error', console.error.bind('console', 'error in connection to db'));

db.once('open', () => {console.log('connected to DB') })