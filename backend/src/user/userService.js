var userModel = require('./userModel.js');
var key = '123456789trytryrtyr';
var encryptor = require('simple-encryptor')(key);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports.createUserDBService = (userDetails) => {

    return new Promise(function myFn(resolve, reject) {
        var userModelData = new userModel();

        userModelData.firstName = userDetails.firstName;
        userModelData.lastName = userDetails.lastName;
        userModelData.email = userDetails.email;
        userModelData.dateOfBirth = userDetails.dateOfBirth;
        userModelData.trainerCheck = userDetails.trainerCheck;
        userModelData.username = userDetails.username;
        userModelData.password = userDetails.password;
        userModelData.confirmPassword = userDetails.confirmPassword;
        userModelData.profilePicture = '';
        var encrypted = encryptor.encrypt(userDetails.password);
        var encryptedOne = encryptor.encrypt(userDetails.confirmPassword);
        userModelData.password = encrypted;
        userModelData.confirmPassword = encryptedOne;

        userModel.findOne({username: userDetails.username}).then(user1 => {
            if (user1)
            {
                reject(false);
            }
            else
            {
                userModelData.save(function resultHandle(error, result) {
                    if (error)
                    {
                        reject(false);
                    }
                    else
                    {
                        resolve(true);
                    }
                });
            }

            
        });

        /*
        userModelData.save(function resultHandle(error, result) {
            if (error)
            {
                reject(false);
            }
            else
            {
                resolve(true);
            }
        });
        */

    });
}

//gets a user
module.exports.readUserDataService = (userID) => 
{
    return new Promise(function readRequested(resolve,reject)
    {
        userModel.find({id: userID}, function readData(error, result)
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

module.exports.readAllUserDataService = () => 
{
    return new Promise(function readRequested(resolve,reject)
    {
        userModel.find({}, function readData(error, result)
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

module.exports.readOneUserDataService = (userN) => 
{
    return new Promise(function readRequested(resolve,reject)
    {
        userModel.findOne({username: userN}, function readData(error, result)
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

module.exports.updateUserDBService = (id, userDetails) =>
{
    console.log(userDetails);
    return new Promise (function updateRequested(resolve, reject) {
        userModel.findByIdAndUpdate(id, userDetails, function returnData(error, result) {
            if (error)
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

module.exports.removeUserDBService = (id) =>
{
    return new Promise(function deleteRequested(resolve, reject) {
        userModel.findByIdAndDelete(id, function returnData(error, result) {
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

module.exports.loginUserDBService = (userDetails) => 
{
    return new Promise(function loginFn(resolve, reject) {
        userModel.findOne({ username: userDetails.username}, function getresult(errorvalue, result)
        {
            if(errorvalue)
            {
                reject({status: false, msg: "No such username."});
            }
            else
            {
                if(result != undefined && result != null)
                {
                    var decrypted = encryptor.decrypt(result.password);
                    if(decrypted == userDetails.password)
                    {
                        const token = jwt.sign(
                            { username: userDetails.username, id: result.id,  },
                            "michael-secret-key",
                            {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true, 
                                expiresIn: 86400,
                            });
                        resolve({status: true, msg: "User Validated Successfully", token});
                    }
                    else
                    {
                        reject({status: false, msg: "User Validation Failed"});
                    }
                }
                else
                {
                    reject({status: false, msg: "Invalid User Details"});
                }
                
            }
        });
    });
}



