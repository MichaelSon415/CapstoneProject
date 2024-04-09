// const { generateUploadURL } = require("./s3");




//Enables use of environment variables (specifically for CORS and Connection String)
require("dotenv").config();

//sets up express and mongoose to start up the server and connect to mongo through mongo
const express = require('express');



const app = express();
const mongoose = require('mongoose');
//const mongoURL = "mongodb://localhost:27017/fitness";
var routes = require('./routes/routes');
mongoose.set('strictQuery', false);
const cors = require('cors');
const cookieSession = require('cookie-session');

//restricted access for resources so we can change/access the database?
//from what domains do we allow communication for the backend
//mutliple origins; check node formatting (can possibly do comma separated)

app.use(cors(
    {
        origin: process.env.CORS_URI
    }
));

app.use(
    cookieSession({
        name: "user-session",
        keys: ["COOKIE_SECRET"],
        httpOnly: true
    })
);

port = 9992;
//original line: app.listen(9992, function check(err)
app.listen(process.env.PORT || port, function check(err)
{
    console.log('Listening on Port 9992');
    if(err)
    console.log("error");
    else
    console.log("started");
});

/*const connectToMongo = async() => {
    mongoose.connect(mongoURL, await console.log("Connected to Mongo success"));
}*/

/*changed string: HAVE TO ENTER IN PASSWORD MANUALLY HERE <pw>
   try-catch for server connection                       */
mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true },)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Connection Error to MongoDB');
        console.log(err);
    }) 

/*app.listen(9002, function check(error)
{
    if(error)
    console.log("Error.....!!!!!");
    else
    console.log("Started....!!!!");
});*/

//module.exports = connectToMongo;
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static('uploads'));




// app.get('/s3Url', async (req, res) => {
//     const url = s3.generateUploadURL()
//     res.send({url})
// })