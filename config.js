require('dotenv').config();

const PORT = process.env.PORT;
module.exports = {
    DOMAIN_NAME: `http://localhost:${PORT}`,
    DB_NAME: 'military_db',
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.PORT,
    PORT,
};