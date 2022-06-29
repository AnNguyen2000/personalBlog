//Require express:
const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

//Require handlebars:
const hdbars = require('express-handlebars');
const path = require('path');
app.use('/css',express.static(__dirname +'/css'));
app.use(express.static(path.join(__dirname,'public')));
const port = 2112;
////set engine (handlebars):
app.engine('handlebars',hdbars({
 helpers:{
    ifEquals:(arg1, arg2, options) => {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  },
  iter:(context, options)=> {
    var fn = options.fn, inverse = options.inverse;
    var ret = "";
  
    if(context && context.length > 0) {
      for(var i=0, j=context.length; i<j; i++) {
        ret = ret + fn(_.extend({}, context[i], { i: i, iPlus1: i + 1 }));
      }
    } else {
      ret = inverse(this);
    }
    return ret;
  }
 }
}));
app.set('view engine','handlebars');
app.set('views',path.join(__dirname, 'resources/views'));

//method Override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//Set up Passport:
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'yamete kudasai',
                  resave: true,
                  saveUninitialized: true,
                  cookie:{
                    maxAge:6000000,
                  }}));
app.use(flash());
app.use(passport.initialize()); 
app.use(passport.session());
app.use(flash());
require('./config/passport');
//route:
const route = require('./routes/index');
route(app);
//Connect MonngoDB:
const connect_db = require('./config/index.js');
connect_db();
//Listen port:
app.listen(port, () => {console.log("http://localhost:"+port)});