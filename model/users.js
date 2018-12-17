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

exports.user = db.model('user', userSchema);

exports.createUser = (newUser, callback) => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}