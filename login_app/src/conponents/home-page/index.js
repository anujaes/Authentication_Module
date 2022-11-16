import '../../css/home.css'
import { Button }                       from '@mui/material';
import React, { useEffect, useState }   from 'react';
import { useNavigate }                  from 'react-router-dom';
import { authentication }               from '../../apis/auth';


function Home() {

    let navigate = useNavigate();
    let [currentUser,setCurrentUser] = useState('');

    useEffect(()=>{
        initUser();
    },[])

    async function initUser() {

        let storedSession = JSON.parse(sessionStorage.getItem('user'));

        if(!storedSession)
            storedSession = JSON.parse(localStorage.getItem('user'));

        if( storedSession.login) {
            const currentUser = await authentication(storedSession);
            if(currentUser)
                setCurrentUser({
                    firstName   :currentUser.userData.firstName,
                    lastName    :currentUser.userData.lastName,
                    email       :currentUser.userData.email
                });
        }
    }

    function handleLogout(){
        localStorage.removeItem('user');
        sessionStorage.removeItem('user')
        navigate('/login')
    }

    function handleLogin(){
        navigate('/login')
    }

    return (
        currentUser===''?
            <div className='home'>
            <div>
                <h1>Welocome to home page!</h1>
                <p>You are not logged in, click below to login!</p>
                <Button
                    type="submit"
                    variant="contained"
                    color='info'
                    sx={{ mt: 3, mb: 2 }}
                    onClick = {handleLogin}
                >
                    Sign In
                </Button>
            </div>
        </div>
        :
        <div className='home'>
            <div>
                <h1>Welcome {currentUser?.firstName + ' ' + currentUser?.lastName}!</h1>
                <p>Your account has been resgistered using the email <b>{currentUser?.email}</b>.</p>
                <Button
                    type="submit"
                    variant="contained"
                    color='error'
                    sx={{ mt: 3, mb: 2 }}
                    onClick = {handleLogout}
                >
                    LOGOUT
                </Button>
            </div>
        </div>
    )
}

export default Home;