const { DOMAIN_NAME, PORT } = require('./config');
const express = require('express');
const cors = require('cors');
require('./database/create_db'); // Create database at initial server setup

// Import directories of the webpages
const homepage = require('./server-side/chatbot/homePage');
const registrationPage = require('./server-side/registration');
const profilePage = require('./server-side/profilePage');
const forgetPasswordPage = require('./server-side/forgetPassword');
const downloadApplicationPage = require('./server-side/downloadApplication');
const loanPage = require('./server-side/loan');
const needHelpPage = require('./server-side/needHelp');
const pensionPage = require('./server-side/pension');
const userLogPage = require('./server-side/userLog');
const adminLoginPage = require('./server-side/adminLogin');
const adminHomePage = require('./server-side/adminHomepage');
const adminUserPage = require('./server-side/adminUser');

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
app.use(profilePage);
app.use(forgetPasswordPage);
app.use(downloadApplicationPage);
app.use(loanPage);
app.use(needHelpPage);
app.use(pensionPage);
app.use(userLogPage);
app.use(adminLoginPage);
app.use(adminHomePage);
app.use(adminUserPage);

app.listen(PORT, () => console.log(`Open this link: ${DOMAIN_NAME}`));