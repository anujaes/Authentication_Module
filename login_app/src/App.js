import './App.css';
import React    from 'react';
import Login    from './conponents/login-page';
import SignUp   from './conponents/signup-page';
import Home     from './conponents/home-page';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router basename='/'>
            <Routes>
                <Route path="/"         element={<Login />} />
                <Route path="/signUp"   element={<SignUp />} />
                <Route path="/home"     element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;