require('dotenv').config();

const config = {
    API_PATH: process.env.API_PATH || 4000,
    PORT: process.env.PORT
}

module.exports = config;