var workoutModel = require("./workoutModel");

//Create (Copy everything from calorie)
module.exports.createWorkoutLogDBService = (workoutDetails, userID) =>
{
    return new Promise(function createData(resolve, reject) {
        workoutModelData = new workoutModel();
        workoutModelData.workoutOption = workoutDetails.workoutOption;
        workoutModelData.workoutType = workoutDetails.workoutType;
        workoutModelData.sets = workoutDetails.sets;
        workoutModelData.reps = workoutDetails.reps;
        workoutModelData.userID = userID;
        
        workoutModelData.save(function resultsHandler(error,result) {
            if(error)
            {   
                
                reject(false)
            }
            else
            {
                resolve(true)
            }
        });
    });
}

//Read (based on object ID)
module.exports.readWorkoutDataService = (Id) => 
{
    //console.log(userObjectId)
    return new Promise(function readRequested(resolve,reject)
    {
        workoutModel.find({id: Id}, function readData(error, result)
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

module.exports.readWorkoutUserIDDataService = (TargetUserID) =>
{
    console.log(TargetUserID)
    return new Promise(function readRequested(resolve,reject)
    {
        workoutModel.find({userID: TargetUserID}, function readData(error, result)
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

//Look for documents based on userID


//Read Muscle Array (will add a unique variable to search for in workout backend [Disability])
/*

ObjectID on the left to search for when populating muscleGroup Array

Chest Muscles: abdominals, chest

Arm Muscles: biceps, forearms, lats, triceps

Leg Muscles: abductors, adductors, calves, glutes, hamstrings, quadriceps

Back: lower_back, middle_back, traps

Neck: neck

Currently not Running as intended; cannot search based on parameter specifically; Works now as of 11/13/2023
*/
module.exports.readWorkoutDisabilityService = (disabilityValue) =>
{
    return new Promise(function readSpecific(resolve,reject)
    {
        workoutModel.find({disability: disabilityValue}, function readMuscle(error, result)
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

//Update using user object ID; HAVE TO USER _id
module.exports.updateWorkoutDataService = (targetUserID,workoutDetails) =>
{
    console.log(workoutDetails);
    return new Promise(function changeData(resolve, reject)
    {
        workoutModel.findByIdAndUpdate({_id: targetUserID}, workoutDetails, function getData(error, result)
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

//Delete using user object ID
module.exports.deleteWorkoutDataService = (targetUserID) =>
{
    return new Promise(function deleteData(resolve, reject)
    {
        //if statement comparing token ID with userID that is being targeted
        workoutModel.findByIdAndDelete({_id: targetUserID}, function getData(error, result)
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