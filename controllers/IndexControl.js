const brcrypt = require('bcryptjs');
const passport = require('passport');

//user model
const User = require('../models/User');


module.exports = {

    register: (req, res) =>{
        const { firstname, lastname, gender, birthdate, country, email, username, psw, psw2} = req.body;
    
        //Check if passwords match
        if(psw !== psw2){
        }
        else{
            User.findOne({email: email})
            .then(user =>{
                if (user){
                    //user exists error
                    console.log("user exists");
                    res.send("user exists");
                }else{
                    const newUser = new User({
                        firstname: firstname, 
                        lastname: lastname, 
                        sex: gender, 
                        birthdate: birthdate, 
                        country: country, 
                        email: email, 
                        username: username, 
                        password: psw
                    });
    
                    //Hash Password
                    brcrypt.genSalt(10, (err, salt) =>  
                     brcrypt.hash(newUser.password, salt, (err, hash)=>{
                        if(err) throw err;
                        //set password to hash
                        newUser.password=hash;
                        //save user
                        newUser.save()
                        .then(user => {
                            res.redirect('/');
                        })
                        .catch(err => console.log(err));
                    }))
                }
            });
        }
    },

    login: (req, res, next)=>{
        passport.authenticate('local', {
            successRedirect: '/users/home',
            failureRedirect: '/'
        })(req, res, next);
    },

    logout: (req, res)=>{
        req.logout();
        req.flash('success_msg', 'You are logged out');
        res.redirect('/');
    }
}