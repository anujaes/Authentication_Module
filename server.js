const express       = require('express')
const dotenv        = require('dotenv')
const cors          = require('cors')
const userRouter    = require('./routers/user')
const DBconnection  = require("./conn")

const app           = express()

// environment Variables
dotenv.config({path:'./config.env'})

// creatint DB Connection
DBconnection.init();

app.use(cors({origin:'*'}));
app.use(express.json())
app.use('/user',userRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Authentication app listening on _PORT ${PORT}`)
})