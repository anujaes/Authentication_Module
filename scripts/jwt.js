const { sign, verify } = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config({path:'../config.env'})

const createTokens = (user) => {
    const accessToken = sign (
        {   email       : user.email,
            firstName   : user.firstName,
            lastName    : user.lastName
        },
        process.env.SECRET_ACCESS_KEY
    );
    return accessToken;
}

const verifyTokens = (tokens) =>{
    const decoded = verify(tokens,process.env.SECRET_ACCESS_KEY,function(err,decoded) {
        if(err)
        {
            console.log('Error at JWT:\n',err)
            return err;
        }

        return decoded
    });

    return decoded;
}

module.exports = {createTokens,verifyTokens};