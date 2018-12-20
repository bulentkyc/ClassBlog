const db = require('./db');
const bcrypt = require('bcrypt');

const userSchema = db.Schema({
    _id: {
        type: db.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true
      },
    name: String,
    email: String,
    password: String
});

const user = db.model('user', userSchema);
module.exports.user = user;
exports.createUser = (newUser, callback) => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

exports.getUserByEmail = function(email,callback){
    console.log(email);
    const query  = {email: email};
    user.findOne(query, callback);
}

exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if (err) throw err;
        callback(null, isMatch);
    });
}

exports.getUserById = function(id, callback){
	user.findById(id, callback);
}