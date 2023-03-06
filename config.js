require('dotenv').config();

const PORT = process.env.PORT;
const config = {
    DOMAIN_NAME: `http://localhost:${PORT}`,
    PORT
};
module.exports = config;