require('dotenv').config();

const PORT = process.env.PORT;
module.exports = {
    DOMAIN_NAME: `http://localhost:${PORT}`,
    PORT,
};