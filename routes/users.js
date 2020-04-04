const express = require('express');
const router = express.Router();
const { ensureAuthenticated} = require('../config/auth');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.get('/home', ensureAuthenticated,(req, res) => 
    res.render('home', {
        username: req.user.username 
    }));

router.get('/weight', ensureAuthenticated,(req, res) => res.render('weight', {
    weights: req.user.weights,
    // age: (new Date() - req.user.birthdate),
    heightfeet: req.user.heightfeet,
    heightinch: req.user.heightinch,
  }
));

router.get('/bmi', ensureAuthenticated,(req, res) => res.render('bmi'));
router.get('/bodyfat', ensureAuthenticated,(req, res) => res.render('bodyfat'));
router.get('/about', ensureAuthenticated,(req, res) => res.render('about'));


router.get('/account', ensureAuthenticated,(req, res) => res.render('account', {
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    heightfeet: req.user.heightfeet,
    heightinch: req.user.heightinch,
    sex: req.user.sex,
    country: req.user.country,
    email: req.user.email,
    username: req.user.username,
    password: req.user.password
}));


module.exports=router;

