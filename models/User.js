const mongoose = require('mongoose');
// const databaseURL = "mongodb+srv://admin:admin@weightmate-onmru.mongodb.net/WeightMateDb?retryWrites=true&w=majority";
// const options = { useNewUrlParser: true,
//     useUnifiedTopology: true};
  
// mongoose.connect(databaseURL, options);

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    birthdate: {type: Date, default: Date.now},
    country: {type: String, required: true},
    sex: {type: String, required: true},
    heightfeet: Number,
    heightinch: Number,
    lastlogdate: Date,
    login: Boolean,
    weights: [{value:Number, date: Date}],
    BMIs: [{value:Number, date: Date}],
    BFPs: [{value:Number, date: Date}]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
    


