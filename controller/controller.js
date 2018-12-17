
const multer = require('multer');
const path = require('path');
const jimp = require('jimp');
const contacts = require('../model/contacts');
const user = require('../model/users');


var fileName = '';
//set stroge engine
const storager = multer.diskStorage({
    destination: 'public/uploads/',
    filename: function(req,file, cb){
        fileName = 'uf.' + Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

//init upload
const upload = multer({
    storage: storager
}).single('avatar');

exports.newContact = function(req, res)  {
console.log(req.body);
    upload(req, res, () => {
        var newContact = new contacts({
            name: req.body.name,
            mail: req.body.email,
            avatar: fileName
        });
        contacts.create(newContact, function(err, contacts){
            if(err){
                console.log(err);
            }else{
                console.log('Inserted:' + newContact);
            }
        });
        //here is the last line of upload function
        jimp.read('public/uploads/' + fileName, (err, lenna) => {
            if (err) throw err;
            lenna
              .resize(250, 250) // resize
              .quality(60) // set JPEG quality
              //.greyscale() // set greyscale
              .write('public/uploads/' + fileName); // save
          });
        //till here
    });
    //here is the last line of the post method
    res.redirect('/');
//till here
    }


 exports.home =   function(req, res){
    
        contacts.find({}, function(err,results){
    
            if(err){
                console.log(err);
            }else{
                res.render('index', {contactList:results});
                //console.log(results);
            }
        });
        //res.render('index', {contactList});
        //res.send('<h1>Hi there!</h1>');
    }

 exports.deleteContact =  function(req, res){
    
        const id = req.params.id;
    
        contacts.findOneAndRemove({_id: id}, function(err){
            if(err){
                console.log('The record could not deleted:' + err);
            }else{
                console.log('The record is deleted.' + id);
            }
        });
    
        res.redirect('/');
          
    }

 exports.getContact =  function(req, res){
        const id = req.params.id;
    
        contacts.find({_id: id}, function(err, contactDetails){
            if (err){
                console.log("You have some problems while fetching your contact's details" + 
                err);
            }else{
                res.render('profile', {contactDetails:contactDetails});
                console.log(contactDetails[0].avatar);
            }
        });
    }

exports.editContact = function(req,res){

    const id = req.params.id;

//---
    
//--
upload(req, res, () => {
    var newContact = new contacts({
        name: req.body.name,
        mail: req.body.email,
        avatar: fileName
    });
    contacts.updateOne({_id: id},{name: req.body.name, 
                                mail: req.body.email,
                                avatar: fileName},function(err, data){
                                    if(err){
                                        console.log('Data is not updated. ' + err);
                                    }else{
                                        //res.redirect('/profile/' + id);
                                    }
                                } );
    //here is the last line of upload function
    jimp.read('public/uploads/' + fileName, (err, lenna) => {
        if (err) throw err;
        lenna
          .resize(250, 250) // resize
          .quality(60) // set JPEG quality
          //.greyscale() // set greyscale
          .write('public/uploads/' + fileName); // save
      });
    //till here
});
//here is the last line of the post method
res.redirect('/');
//till here
}

exports.register = (req,res) => {
    res.render('register');
}

exports.registration = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'E-mail is required').notEmpty();
    req.checkBody('email', 'E-mail is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();

    const errors = req.validationErrors();

    if(errors){
        res.render('register',{
            errors:errors
        });
    }else {
        console.log('No error!')
        const newUser = new user.user({
            name: name,
            email: email,
            password: password
        });

        user.createUser(newUser, function(err, user){
            if(err){
                throw err
            }else{
                console.log(user);
            }
        });
        res.render('register',{
            errors:[{msg:'Hi, ' + name + ' your account is ready!'}]
        });
    }


    //res.send(name + '/' + email + '/' + password);
}