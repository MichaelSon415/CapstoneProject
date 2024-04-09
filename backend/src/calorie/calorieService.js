var calorieModel = require('./calorieModel');
const { Types } = require('mongoose')

module.exports.createCalorieLogDBService = (calorieDetails, userID) =>
{
    return new Promise(function calorieData(resolve, reject) {
        calorieModelData = new calorieModel();

        calorieModelData.foodName = calorieDetails.foodName;
        calorieModelData.calories = calorieDetails.calories;
        calorieModelData.carbs = calorieDetails.carbs;
        calorieModelData.fats = calorieDetails.fats;
        calorieModelData.proteins = calorieDetails.proteins;
        calorieModelData.userID = userID;

        calorieModelData.save(function resultsHandler(error,result) {
            if (error)
            {
                console.log(error)
                reject(false)
            }
            else
            {
                resolve(true)
            }
        });
    });
}

module.exports.readCalorieDataService = () => 
{
    return new Promise(function readRequested(resolve,reject)
    {
        calorieModel.find({}, function readData(error, result)
        {
            if(error)
            {
                reject(false);
            }
            else
            {
                resolve(result);
            }
        });
    });
}

module.exports.readCalorieIDDataService = (targetUserID) =>
{
    return new Promise(function readRequested(resolve,reject)
    {
        calorieModel.find({userID: targetUserID}, function readData(error, result)
        {
            if(error)
            {
                reject(false);
            }
            else
            {
                resolve(result);
            }
        });
    });
}

module.exports.updateCalorieDataService = (id, calorieDetails, userID) =>
{
    //empty calorie
    /*
    let bodyData = 
    {
        "foodName": '',
        "calories":'',
        "carbs":'',
        "fats":'',
        "proteins":'',
        "userID": ''
    }
    */
    //calID = new calorieModel();
    //calID = calorieModel.findById({_id: id});
    //bodyData.foodName = calID.foodName;
    //console.log(bodyData.foodName);
    // Make the validation within the service file, checking the ID within the database and the token ID
    //console.log("1");
    //console.log(calorie.userID);
    //calID = calorieModel.findById(id);
    //console.log(calID.userID);
    //console.log("2");
    //console.log(userID);
    //console.log(calID.userID.toString());
    //const user = calorieModel.findById(Types.ObjectId(id));
    //console.log(user.find(userID));
    return new Promise(function changeData(resolve, reject)
    {
        if(userID == userID) 
        {
            calorieModel.findByIdAndUpdate(id, calorieDetails, function getData(error, result)
            {
                if(error)
                {
                    reject(false);
                }
                else
                {
                    resolve(result);
                }
            });
        }
        else{
            reject(false);
        }
    });
}

module.exports.removeCalorieDataService = (id) => { 
    return new Promise(function myFn(resolve, reject) {
        calorieModel.findByIdAndDelete(id, function returnData(error, result) {
 
          if(error)
          {
                reject(false);
          }
          else
          {
             resolve(result);
          }          
        });
    });
}