const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/contactlist', 
{ useNewUrlParser: true });

const connection = mongoose;
module.exports = connection;