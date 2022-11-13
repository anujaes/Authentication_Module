import '../../css/login.css'
import React, { useEffect, useState }                       from "react";
import { LockOutlined }                                     from "@mui/icons-material";
import { useNavigate }                                      from 'react-router-dom';
import { login }                                            from '../../apis/login';
import { isValidEmail }                                     from '../../utils/validateEmail';
import { setSession, getLocalSession, setCurrentSession }   from '../../utils/session';
import { Avatar,
    Box,
    Typography,
    FormControlLabel,
    TextField,
    Grid,
    Link,
    Checkbox,
    Button,
    Alert
}                                                           from "@mui/material";



function Login() {
    const [credential,setCredential]        = useState({email:'',password:''});
    const [validation,setValidation]        = useState(true)
    const [flag, setAlertFlag]              = useState(false)
    const [alertOptions,setAlertOptions]    = useState({})
    const navigate                          = useNavigate();

    function handleText(evt) {
        setCredential( (prev) => {
                return {
                    ...prev,
                    [evt.target.name] : evt.target.value
                }
            }
        )
    }

    function checkFormValidation() {
        if (credential.email.length && credential.password.length && isValidEmail(credential.email))
            setValidation(false)
        else
            setValidation(true)
    }

    function isValid(){
        if(!isValidEmail(credential.email)){
            showAlert({severity:"error",message:'incorrect email!'},5)
        }
    }

    useEffect(()=>{
        checkFormValidation()
    })

    useEffect(() =>{
        let user = getLocalSession('user');
        if ( user ) {
            setCurrentSession('user',user)
            navigate('/home');
        }
    },[])

    const handleForm = async(event) => {
        event.preventDefault();

        let res = await login(credential);
        let {reply,status,userData}  = res;

        let isRememberChecked = document.getElementById('remember').checked;

        if(isRememberChecked){
            userData.rememberSession = true;
        }

        if(reply === 'success' && status){
            setSession('user',userData);
            setCredential({email:'',password:''});
            navigate('/home');
        }

        if( reply === 'invalid' && status ) {
            showAlert({severity:"error",message:'invalid email and password!'},5);
            setCredential({email:'',password:''});
        }
        if ( !status )
            showAlert({severity:"error",message:'Something went wrong'},5);
    };

    function showAlert(options,sec){
        setAlertOptions(options)
        setAlertFlag(true);
        setTimeout(() => {
            setAlertFlag(false)
        }, sec*1000);
    }

    return (
        <div className="container flex-center">
            <div className="login-card flex-center flex-column">
                <Avatar sx={{ m: 1, bgcolor: '#243b55' }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <Box component="form" onSubmit={handleForm} noValidate sx={{ mt: 1 }}>
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
                        onBlur          = {isValid}
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
                        required
                        control         = {<Checkbox id="remember" color="primary" />}
                        label           = "Remember me"
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
            {
                flag ? <Alert sx={{position:'absolute',top:10}} severity={alertOptions.severity}>{alertOptions.message}</Alert> : ''
            }
        </div>
    )
}

export default Login;