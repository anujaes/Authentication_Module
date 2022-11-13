const { sign, verify } = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})

const createTokens = (user) => {
    const accessToken = sign (
        {   email       : user.email,
            firstName   : user.firstName,
            lastName    : user.lastName
        },
        process.env.SECRETKEY
    );
    return accessToken;
}

module.exports = {createTokens};