var calorieService = require('./calorieService');
const { getUserIdFromToken } = require('../util/utilFunction');
const { getUserNameFromToken } = require('../util/utilFunction');

// Create
var createCalorieControllerFn = async (req,res) =>
{
    // Create a reusable function returns object of all claims within the token
    try 
    {
        //grabs tokens called Authorization
        const token = req.header('Authorization').split(' ')[1];
        //console.log(token);
        var userID = getUserIdFromToken(token);
        //var username = getUserNameFromToken(token);
        //console.log(username);
        //console.log(userID);
        //console.log(req.body);
        //console.log(userID);
        var status = await calorieService.createCalorieLogDBService(req.body, userID); //insert another parameter here called userID
        console.log(status);

        if (status) 
        {
            res.send({"status": true, "message": "Calorie log created successfully"});
        }
        else
        {
            res.send({"status": false, "message": "Error creating calorie log"});
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

// Read via object ID
var readCalorieControllerDataFn = async (req,res) => 
{
    var calorie = await calorieService.readCalorieDataService(req.params.id);
    res.send({"status": true, "data": calorie, "message": "calorie data received back"});
}

var readCalorieIDControllerDataFn = async (req, res) =>
{
    var calorie = await calorieService.readCalorieIDDataService(req.params.userID);
    res.send({"status": true, "data": calorie, "message": "calorie data received back"});
}

// Update
var updateCalorieController = async (req, res) => 
{
    //Reusable function, pass ID
    const token = req.header('Authorization').split(' ')[1];
    //console.log(token);
    var userID = getUserIdFromToken(token);
    //console.log(req.params.id);
    //console.log(req.params.userID);
    //console.log(req.body);
     
    var result = await calorieService.updateCalorieDataService(req.params.id, req.body, userID); 
    if (result) {
        res.send({ "status": true, "message": "Calorie Updated"} );
    } else {
        res.send({ "status": false, "message": "Calorie Updated Failed" });
    }
}

// Delete
var deleteCalorieController = async (req, res) => 
{
     console.log(req.params.id);
     var result = await calorieService.removeCalorieDataService(req.params.id);
     if (result) {
        res.send({ "status": true, "message": "Calorie Deleted"} );
     } else {
         res.send({ "status": false, "message": "Calorie Deleted Failed" });
     }
}


module.exports = { createCalorieControllerFn, readCalorieControllerDataFn, updateCalorieController, deleteCalorieController, readCalorieIDControllerDataFn  };