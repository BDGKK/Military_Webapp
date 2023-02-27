require('dotenv').config();

const PORT = process.env.PORT;
const DOMAIN_NAME = `http://localhost:${PORT}`;

module.exports = { DOMAIN_NAME, PORT };