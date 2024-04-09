var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var calorieSchema = new Schema({
    foodName:{
        type: String,
        required: true
    },
    calories:{
        type: String,
        required: true
    },
    carbs:{
        type: String,
        required: true
    },
    fats:{
        type: String,
        required: true
    },
    proteins:{
        type: String,
        required: true
    },
    userID:{
        type: String,
        required: true
    }
    
}, {timestamps: true}
);

module.exports = mongoose.model('calorie', calorieSchema)