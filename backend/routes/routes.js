var express = require('express');

//Rotues
var userController = require('../src/user/userController');
var workoutController = require('../src/workout/workoutController');
var calorieController = require('../src/calorie/calorieController');

//router
const router = express.Router();

//Token Verification
const checkAuth = require("../middleware/check_auth.js");

//Primary Info CRUD Operations

router.route('/user/login').post(userController.loginUserControllerFn);

//Create Functions
router.route('/user/create').post(userController.createUserControllerFn);

//Read Functions
router.route('/user/read').get(userController.readUserControllerDataFn);

router.route('/user/readAll').get(userController.readAllUserControllerDataFn);

router.route('/user/readOne/:username').get(userController.readOneUserControllerDataFn);

//Update Functions
router.route('/user/update/:id').patch(checkAuth, userController.updateUserControllerFn);

//Delete Functions
router.route('/user/delete/:id').delete(checkAuth, userController.deleteUserControllerFn);

//Workout CRUD Operations

//Create Functions
router.route('/workout/create').post(checkAuth, workoutController.createWorkoutControllerFn);

//Read Functions (based on the actual object ID)
router.route('/workout/read/:id').get(checkAuth, workoutController.readWorkoutControllerDataFn);

//Read Function (based on userID)
router.route('/workout/readWorkoutLog/:userID').get(checkAuth, workoutController.readWorkoutUserIDControllerDataFn);

//Should return a document containing workouts that the user cannot do
router.route('/workout/disabilityRead/:disability').get(checkAuth, workoutController.readWorkoutControllerDisabilityDataFn);

//Update Functions 

router.route('/workout/update/:id').patch(checkAuth, workoutController.updateWorkoutControllerFn);

//Delete Functions
router.route('/workout/delete/:id').delete(checkAuth, workoutController.deleteWorkoutControllerFn);


//Calorie Details Crud Operations

//Create
router.route('/calorie/create').post(checkAuth, calorieController.createCalorieControllerFn);

router.route('/calorie/read/:id').get(checkAuth, calorieController.readCalorieControllerDataFn);

router.route('/calorie/readUserID/:userID').get(checkAuth, calorieController.readCalorieIDControllerDataFn);

router.route('/calorie/update/:id').patch(checkAuth, calorieController.updateCalorieController);
router.route('/calorie/delete/:id').delete(checkAuth, calorieController.deleteCalorieController);


// const AWS = require('aws-sdk');
// const multer = require('multer');
// const multerS3 = require('multer-s3');

// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION
// });

// const s3 = new AWS.S3();

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_BUCKET_NAME,
//     key: function (req, file, cb) {
//       cb(null, `uploads/${Date.now().toString()}-${file.originalname}`);
//     }
//   })
// });

// router.post('/upload', upload.single('file'), (req, res) => {
//     if (req.file) {
//       res.json({ success: true, url: req.file.location });
//     } else {
//       res.status(404).send('No file uploaded.');
//     }
//   });

const upload = require('../middleware/upload.js')

router.post('/user/uploadProfilePicture', upload.single('profilePicture'), userController.uploadProfilePictureControllerFn);







//exports the router for use by the app
module.exports = router;
