var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    //gonna need a dropdown to access / save disabilities, current level of fitness, desired level of fitness, save user goals  
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    trainerCheck: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('user', userSchema);