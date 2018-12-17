const express = require('express');
const app = express();
const hbs = require('hbs');
const bodyParser = require('body-parser');
const router = require('./router/router');
const expressValidator = require('express-validator');

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