const express = require('express');
const app = express();
const hbs = require('hbs');
const bodyParser = require('body-parser');
const router = require('./router/router');
const expressValidator = require('express-validator');

const flash = require('connect-flash');
const session = require('express-session');

app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

app.use(flash());

app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  //req.locals.user = req.user || null;
  next();
});

app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));

app.use(express.static(__dirname + '/public'));

app.engine('html', require('hbs').__express);
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', router);

//server listens 3000 port
app.listen(3000, function() {
    console.log('server started on port 3000');
});