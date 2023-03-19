const { DOMAIN_NAME, PORT } = require('./config');
const express = require('express');
const cors = require('cors');
require('./database/create_db'); // Create database at initial server setup

// Import directories of the webpages
const homepage = require('./server-side/chatbot/chatbot');
const registrationPage = require('./server-side/registration');
const profilepage = require('./server-side/profilePage');
const forgetPasswordPage = require('./server-side/forgetPassword');

const app = express();

// Enable CORS only for GET and POST methods
app.use('*', cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    return next();
});
app.use(express.json());

app.use(express.static('./images')); // Host all public images

// Connect the routers of the webpage to the main app
app.use(homepage);
app.use(registrationPage);
app.use(profilepage);
app.use(forgetPasswordPage);

app.listen(PORT, () => console.log(`Open this link: ${DOMAIN_NAME}`));