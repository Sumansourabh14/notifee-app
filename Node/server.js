const express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(bodyParser.json());

const admin = require('firebase-admin');

const serviceAccount = require("../test-notif-fcm-firebase-adminsdk-hb15b-dffbe1d144.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.get("/", (req, res) => {
    res.send("Server is running!");
});

const registrationTokens = [
    'c9tysMHDQGSZWOdJXSO7Bg:APA91bFEO3utlptUcJN2jZKM3xxVHMHkq_nOoWKzj5x4mjDkRUaNh0qTl5t9logEnhSKJ2VAEhzlecUOvrddqWj1Qb0dl9FJvv_ur_a895CWPq0HcCTDBHx_vZ0k8YjAd4uvE4UzVUkY',
    'cRf-VW2xRxiogWIEdxB9W9:APA91bHT5O4QFZ-yG2MXfnk6pS3z8tcMWY8JcgaOPc-E72DMVajnB-H5d3lTHeYUE0LLIAdhIgfQ1pPzLYOTqQvtEBWq3W1rV_tM0jFw42TA2KfBqqQjjVVfxqn1BpC5eend4cJgxQGe',
];

const token = 'c9tysMHDQGSZWOdJXSO7Bg:APA91bFEO3utlptUcJN2jZKM3xxVHMHkq_nOoWKzj5x4mjDkRUaNh0qTl5t9logEnhSKJ2VAEhzlecUOvrddqWj1Qb0dl9FJvv_ur_a895CWPq0HcCTDBHx_vZ0k8YjAd4uvE4UzVUkY';

app.get("/send", (req, res) => {
    res.sendFile(__dirname +"/views/sendNotif.html");
})

app.post("/send", (req, res) => {
    // const message = {
    //     // token,
    //     tokens: registrationTokens,
    //     notification: {
    //         body: "Body of Notification",
    //         title: "Title of Notification",
    //         imageUrl: "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
    //     }
    // };

    // const message = req.body;

    const token = req.body.pushToken;
    const notifTitle = req.body.messageTitle;
    const notifBody = req.body.messageBody;
    const notifImage = req.body.messageImage;

    const message = {
        token: token,
        notification: {
            body: notifBody,
            title: notifTitle,
            imageUrl: notifImage
        }
    }
    
    admin.messaging()
        .send(message)
        .then(res => {
            console.log('success')
        })
        .catch(err => {
            console.log(err)
        })
    
    res.send("Notification has been sent successfully!");
})

app.listen(3000, () => {
    console.log('listening at port 3000')
})