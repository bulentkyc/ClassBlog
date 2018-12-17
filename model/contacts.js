const db = require('./db');

var contactSchema = new db.Schema({
    _id: {
        type: db.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true
      },
    name: String,
    mail: String,
    avatar: String
});

var contacts = db.model('contacts', contactSchema);

module.exports = contacts;