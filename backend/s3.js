// const aws = require('aws-sdk');

// const crypto = require('crypto');
// const raw = require('express').raw;

// const { promisify } = require("util");




// const region = "us-west-1"
// const bucketName = "fitn3ss-profile-pictures"
// const accessKeyId = process.env.AWS_ACCESS_KEY
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

// const s3 = new aws.S3({
//     region,
//     accessKeyId,
//     secretAccessKey,
//     signatureVersion: '4'
// })



// async function generateUploadURL(){
//     const rawBytes = await randomBytes(16)
//     const imageName = rawBytes.toString('hex')
//     const params = ({
//         Bucket: bucketName,
//         Key: imageName,
//         Expires: 60
//     })

//     const uploadURL = await s3.getSignedUrlPromise('putObject', params)
//     return uploadURL


// }

// module.exports.generateUploadURL = generateUploadURL;

