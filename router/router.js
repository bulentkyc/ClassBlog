const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

router.use(express.static(__dirname + '/public'));

router.post('/login',controller.passportAuth ,controller.login);

router.post('/newContact', controller.newContact );

router.get('/', controller.home);

router.get('/delete-contact/:id', controller.deleteContact);

router.get('/profile/:id', controller.getContact)

router.get('/different', function(req, res){
    res.send('<h1>Here is different!</h1>');
});

router.post('/editContact/:id', controller.editContact);

router.get('/register', controller.register);

router.post('/registration', controller.registration);

router.get('/login', controller.loginPage);

router.get('*', function(req, res){
    res.send('<h1>There is no page!</h1>');
});

module.exports = router;