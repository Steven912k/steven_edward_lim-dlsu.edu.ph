const express = require('express');
const router = express.Router();
const { ensureAuthenticated} = require('../config/auth');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.get('/home', ensureAuthenticated,(req, res) => 
    res.render('home', {
        username: req.user.username 
    }));

// const dbweights = req.user.weights;

// var arrayweights

// for (const wval of dbweights){

// }

router.get('/weight', ensureAuthenticated,(req, res) => res.render('weight', {
    weights: req.user.weights
}));



router.post('/saveweight', (req, res) =>{
    User.update({_id: req.user._id}, 
    {   $push: { "weights": {
        value: parseFloat(req.body.weight),
        date: new Date()
    }}
  })
  .then(user=> {
    if(!user) console.log('user do not exists');

    console.log('success');

    })
    .catch(err=>{
        console.log(err)
    });
});

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

