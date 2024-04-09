var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//may or may not need to add more here (calories burned?)
var workoutSchema = new Schema({
    workoutOption:{
        type: String,
        required: true
    },
    workoutType:{
        type: String,
        required: true
    },
    sets:{
        type: Number,
        required: true
    },
    reps:{
        type: Number,
        required: true
    },
    
    userID:{
        type: String,
        required: true
    }
},
    {timestamps: true}
);

module.exports = mongoose.model('workout', workoutSchema);