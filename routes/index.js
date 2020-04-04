const express = require('express');
const router = express.Router();
const brcrypt = require('bcryptjs');
const passport = require('passport');

//user model
const User = require('../models/User');

router.get('/', (req, res) => res.render('login') );
router.get('/register', (req, res) => res.render('register') );

module.exports=router;