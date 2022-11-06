import '../../css/home.css'
import { Button } from '@mui/material';
import React from 'react';
import { getSession } from '../../utils/session';
import { useNavigate } from 'react-router-dom';
function Home() {

    let user = getSession('user');
    let navigate = useNavigate();

    function handleLogout(){
        localStorage.removeItem('user');
        navigate('/')
    }

    return (
        <div className='home'>
            <div>
                <h1>Welcome {user?.firstName + ' ' + user?.lastName}!</h1>
                <p>Your account has been resgistered using the email <b>{user?.email}</b>.</p>
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