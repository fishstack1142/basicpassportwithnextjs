const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const crypto = require('crypto');
// var routes = require('./routes');

const connection = require('./config/database');

require('dotenv').config();

const User = connection.models.User;

const MongoStore = require('connect-mongo')(session);

app.prepare().then(() => {
  const server = express()

  server.use(express.json());
  server.use(express.urlencoded({extended: true}));

  const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'sessions' });

  server.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
  }));

  require('./config/passport');

  server.use(passport.initialize());
  server.use(passport.session());


  server.get('/home', (req, res) => {
    console.log('user in home page is')
    console.log(req.user.username)
    return app.render(req, res, '/home', req.query)
  })

  server.get('/register', (req, res) => {
    
    return app.render(req, res, '/register', req.query)
  })

  server.post('/register', (req, res) => {

    console.log('register started')

    const body = {
      uname : req.body.uname,
      pw : req.body.pw
    }
    
    console.log(body);

    User.findOne({username: req.body.uname}).then((user) => {

      if (user) { 
        console.log('existing user')
        return  res.redirect('/home');
      }

      if(!user) {

        const saltHash = genPassword(req.body.pw);

        const salt = saltHash.salt;
        const hash = saltHash.hash;

      const newUser = new User({
        username: req.body.uname,
        // raw: req.body.pw
        hash: hash,
        salt: salt,
        admin: false
      });

      newUser.save().then((user) => {
        console.log(user);
      });

     res.redirect('/');

      }

    }).catch((err) => {
        console.log(err);
    });

  })

  server.post('/login', passport.authenticate('local', { failureRedirect: '/failed', successRedirect: '/success' }));

  server.get('/login', (req, res) => {
    return app.render(req, res, '/login', req.query)
  })

  server.get('/success', (req, res) => {
    console.log(req.user)
    return app.render(req, res, '/success', req.query)
  })

  server.get('/failed', (req, res) => {
    return res.send('login failed');
  })

  server.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

  server.all('*', (req, res) => {
    return handle(req, res)
  })


  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

function genPassword(password) {
  var salt = crypto.randomBytes(32).toString('hex');
  var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  
  return {
    salt: salt,
    hash: genHash
  };
}