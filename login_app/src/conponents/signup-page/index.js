import '../../css/signup.css'
import '../../css/common.css'
import React, { useEffect, useState }       from "react";
import { isValidEmail }                     from '../../utils/validateEmail';
import {HowToRegOutlined}                   from '@mui/icons-material';
import {Alert}                              from '@mui/material';
import { Avatar,
    Box,
    Typography,
    TextField,
    Grid,
    Link,
    Button
}                               from "@mui/material";

function SignUp(){
    const [userData,setUserData]        = useState({email:'',fname:'',lname:'',password:'',cpassword:''})
    const [validation,setValidation]    = useState(true);
    const [flag, setFlag]               = useState(false)

    function handleText(event) {
        setUserData( (prev)=> {
            return {
                ...prev,
                [event.target.name] : event.target.value
            }
        })
    }

    function checkValidation(){
        if( userData.fname.length &&
            userData.lname.length &&
            isValidEmail(userData.email) &&
            userData.password.length &&
            userData.cpassword == userData.password) {
                setValidation(false)
            }
        else{
            setValidation(true)
        }
    }

    function checkMail() {
        if(!isValidEmail(userData.email))
            setFlag(true)
        else
            setFlag(false)
    }

    useEffect(()=>{
        checkValidation();
    })

    return(
        <div className="container flex-center">
            <div className="signup-card flex-column flex-center">
                <Avatar sx={{ m: 1, bgcolor: '#243b55' }}>
                    <HowToRegOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create Account
                </Typography>
                <Box component="form" /*onSubmit={}*/ noValidate sx={{ mt: 1 }}>
                    <Grid container>
                        <Grid item>
                            <TextField
                                required
                                fullWidth
                                margin          = "normal"
                                id              = "fname"
                                type            = "text"
                                label           = "First Name"
                                name            = "fname"
                                autoComplete    = "fname"
                                onChange        = {handleText}
                                value           = {userData.fname}
                            />
                        </Grid>
                        <Grid item sx={{marginLeft:'1.1rem'}}>
                            <TextField
                                required
                                fullWidth
                                margin          = "normal"
                                id              = "lname"
                                type            = "text"
                                label           = "Last Name"
                                name            = "lname"
                                autoComplete    = "lname"
                                onChange        = {handleText}
                                value           = {userData.lname}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        required
                        fullWidth
                        margin          = "normal"
                        id              = "email"
                        label           = "Email Address"
                        name            = "email"
                        type            = "email"
                        autoComplete    = "email"
                        onChange        = {handleText}
                        onBlur          = {checkMail}
                        variant         = "outlined"
                        value           = {userData.email}
                    />
                    <TextField
                        required
                        fullWidth
                        margin          = "normal"
                        name            = "password"
                        label           = "Password"
                        type            = "password"
                        id              = "password"
                        autoComplete    = "current-password"
                        onChange        = {handleText}
                        value           = {userData.password}
                    />
                    <TextField
                        required
                        fullWidth
                        margin          = "normal"
                        name            = "cpassword"
                        label           = "Confirm Password"
                        type            = "password"
                        id              = "cpassword"
                        autoComplete    = "current-password"
                        onChange        = {handleText}
                        value           = {userData.cpassword}
                    />
                    <Button
                        fullWidth
                        type        = "submit"
                        variant     = "contained"
                        disabled    = {validation}
                        sx          = {{ mt: 3, mb: 2 }}
                    >
                        Create Account
                    </Button>
                    <Grid container sx={{justifyContent:'center'}}>
                        <Grid item>
                            <Link href="/" variant="body2">
                                {"Already have a account? Login here!"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </div>
            {
                flag ? <Alert sx={{position:'absolute',top:50,right:15,transition:'0.5s ease'}} close="close" severity="error">incorrect mail!</Alert> : ''
            }
        </div>
    )
}
export default SignUp;