const mongoose = require('mongoose');
const databaseURL = "mongodb+srv://admin:admin@weightmate-onmru.mongodb.net/WeightMateDb?retryWrites=true&w=majority";
const options = { useNewUrlParser: true,
    useUnifiedTopology: true};
  
mongoose.connect(databaseURL, options);

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    firstname: String,
    lastname: String,
    birthdate: Date,
    country: String,
    sex: String,
    heightfeet: Number,
    heightinch: Number,
    lastlogdate: Date,
    login: Boolean,
    weights: [{value:Number, date: Date}],
    BMIs: [{value:Number, date: Date}],
    BFPs: [{value:Number, date: Date}]
});

module.exports = mongoose.model('user', UserSchema);
    


