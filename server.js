const { DOMAIN_NAME, PORT } = require('./config');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
require('./database/create_db'); // Create database at initial server setup

// Import directories of the webpages
const homepage = require('./server-side/chatbot/homePage');
const registrationPage = require('./server-side/registration');
const profilePage = require('./server-side/profilePage');
const forgetPasswordPage = require('./server-side/forgetPassword');
const downloadApplicationPage = require('./server-side/downloadApplication');
const loanPage = require('./server-side/loan');
const loanCalculatedPage = require('./server-side/loanCalculated');
const needHelpPage = require('./server-side/needHelp');
const pensionPage = require('./server-side/pension');
const pensionCalculatedPage = require('./server-side/pensionCalculated');
const userLogPage = require('./server-side/userLog');
const adminLoginPage = require('./server-side/adminLogin');
const adminHomePage = require('./server-side/adminHomepage');
const adminUserPage = require('./server-side/adminUser');

const app = express();

// Setup session middleware
app.use(session({
    secret: 'randomcharactersxyz',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: false
    }
}));

// Enable CORS only for GET and POST methods
app.use('*', cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    return next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./download-application-documents')); // Host the download application documents
app.use(express.static('./images')); // Host the images

// Connect the routers of the webpage to the main app
app.use(homepage);
app.use(registrationPage);
app.use(profilePage);
app.use(forgetPasswordPage);
app.use(downloadApplicationPage);
app.use(loanPage);
app.use(loanCalculatedPage);
app.use(needHelpPage);
app.use(pensionPage);
app.use(pensionCalculatedPage);
app.use(userLogPage);
app.use(adminLoginPage);
app.use(adminHomePage);
app.use(adminUserPage);

app.listen(PORT, () => console.log(`Open this link: ${DOMAIN_NAME}`));