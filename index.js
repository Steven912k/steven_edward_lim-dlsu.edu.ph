const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();

require('./config/passport')(passport);
const port = 3000;
const flash = require('connect-flash');
const session = require('express-session'); 


//DB config
const mongoose = require('mongoose');
const databaseURL = require('./config/keys').MongoURI;
 mongoose.connect(databaseURL, {useNewUrlParser: true, useUnifiedTopology: true })
 .then(()=>console.log('Connected to database..'))
 .catch(err => console.error(err));  

app.engine( 'hbs', exphbs({
  extname: 'hbs', 
  defaultView: 'main', 
  layoutsDir: path.join(__dirname, '/views/layouts'), 
  partialsDir: path.join(__dirname, '/views/partials'), 

  helpers: {
    cap: function(text) { return text.toUpperCase(); },
    em: function(text) {
      var x = `<em>${text}</em>`;
      return new handlebars.SafeString(x);
    },
    if_eq: function(a,b, opts) {
      if (a === b) {
        return opts.fn(this);
      } else {
        return opts.inverse(this);
      }
    }
  }
}));

//express session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
//middleware  
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.static('public'));

//connect flash middleware
app.use(flash());

//global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

const UserControl = require('./controllers/UserControl');
const IndexControl = require('./controllers/IndexControl');

app.set('view engine', 'hbs');

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.use('/logout', IndexControl.logout);

app.post('/register', IndexControl.register);
app.post('/', IndexControl.login);

app.post('/saveweight', UserControl.insertweight);
app.post('/saveBMI', UserControl.inserBMI);
app.post('/saveBFP', UserControl.inserBFP);

app.listen(port, function() {
  console.log('App listening at port '  + port)
});
