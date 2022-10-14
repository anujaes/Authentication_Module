import '../../css/login.css'
import { LockOutlined }         from "@mui/icons-material";
import React, { useEffect, useState }                    from "react";
import { Avatar,
    Box,
    Typography,
    FormControlLabel,
    TextField,
    Grid,
    Link,
    Checkbox,
    Button
}                               from "@mui/material";

function Login() {

    const [credential,setCredential] = useState({email:'',password:''});
    const [validation,setValidation] = useState(true)

    function handleText(evt) {
        setCredential( (prev) => {
                return {
                    ...prev,
                    [evt.target.name] : evt.target.value
                }
            }
        )
    }

    function checkValidation() {
        if (credential.email.length && credential.password.length)
            setValidation(false)
        else
            setValidation(true)
    }

    useEffect(()=>{
        checkValidation()
    })

    return (
        <div className="container flex-center">
            <div className="login-card flex-center flex-column">
                <Avatar sx={{ m: 1, bgcolor: '#243b55' }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <Box component="form" /*onSubmit={}*/ noValidate sx={{ mt: 1 }}>
                    <TextField
                        required
                        fullWidth
                        autoFocus
                        margin          = "normal"
                        id              = "email"
                        type            = "email"
                        label           = "Email Address"
                        name            = "email"
                        autoComplete    = "email"
                        onChange        = {handleText}
                        value           = {credential.email}
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
                        value           = {credential.password}
                    />
                    <FormControlLabel
                        control     = {<Checkbox value="remember" color="primary" />}
                        disabled    = {true}
                        label       = "Remember me"
                    />
                    <Button
                        fullWidth
                        type        = "submit"
                        variant     = "contained"
                        disabled    = {validation}
                        sx          = {{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signUp" variant="body2">
                                {"Don't have an account? Sign Up!"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    )
}

export default Login;