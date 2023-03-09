const { DOMAIN_NAME, PORT } = require('./config');
const express = require('express');
const cors = require('cors');

// Import directories of the webpages
const homepage = require('./server-side/chatbot/chatbot');
const registrationpage = require('./server-side/registration');
const profilepage = require('./server-side/profilePage');

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

// Connect the routers of the webpage to the main app
app.use(homepage);
app.use(registrationpage);
app.use(profilepage);

app.listen(PORT, () => console.log(`${DOMAIN_NAME}`));