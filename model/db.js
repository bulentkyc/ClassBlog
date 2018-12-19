const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog', 
{ useNewUrlParser: true });

const connection = mongoose;
module.exports = connection;