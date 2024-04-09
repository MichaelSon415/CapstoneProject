var workoutService = require('./workoutService');
const { getUserIdFromToken } = require('../util/utilFunction')

//Create
var createWorkoutControllerFn = async (req,res) => 
{
    try
    {
        const token = req.header('Authorization').split(' ')[1];
        var userID = getUserIdFromToken(token);
        //console.log(req.body);
        var status = await workoutService.createWorkoutLogDBService(req.body, userID);
        console.log(status);

        if (status)
        {
            
            res.send({"status": true, "message": "Workout log created successfully"});
        }
        else
        {
            res.send({"status": false, "message": "Error creating workout log"});
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

//Read(based on workout Document Object ID)
var readWorkoutControllerDataFn = async (req,res) => 
{
    var workout = await workoutService.readWorkoutDataService(req.params.id);
    res.send({"status": true, "data": workout, "message": "workout data received back"});
}

//Read(based on userID)
var readWorkoutUserIDControllerDataFn = async (req, res) =>
{
    var workout = await workoutService.readWorkoutUserIDDataService(req.params.userID);
    res.send({"status": true, "data": workout, "message": "workout data received back"});
}

//Read Muscle Groups based on selected disabilities; don't know how to specify how to use a field here and have been looking for a while
var readWorkoutControllerDisabilityDataFn = async (req, res) =>
{
    //only need the value of the disability
    var muscleGroup = await workoutService.readWorkoutDisabilityService(req.params.disability);
    res.send({"status": true, "data": muscleGroup, "message": "Muscle group data received back"});
}

//Update
var updateWorkoutControllerFn = async (req, res) =>
{
    console.log(req.params.id);
    console.log(req.body);

    var result = await workoutService.updateWorkoutDataService(req.params.id, req.body);
    if(result)
    {
        res.send({"status": true, "message": "workout updated"});
    }
    else
    {
        res.send({"status": false, "message": "Workout update failed"});
    }
}

//Delete
var deleteWorkoutControllerFn = async (req,res) => 
{
    console.log(req.params.id);
    var result = await workoutService.deleteWorkoutDataService(req.params.id);
    if(result)
    {
        res.send({"status": true, "message": "workout deleted"});
    }
    else
    {
        res.send({"status": false, "message": "workout deletion failed"});
    }
}

module.exports = { createWorkoutControllerFn, readWorkoutControllerDataFn, readWorkoutControllerDisabilityDataFn, updateWorkoutControllerFn, deleteWorkoutControllerFn, readWorkoutUserIDControllerDataFn};