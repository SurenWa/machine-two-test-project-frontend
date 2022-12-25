import React from 'react'

import LoginForm from '../components/LoginForm';
import HomeIntro from '../components/HomeIntro';

const Login = () => {
    return (
        <div className="container">
            <div className="register">
                <div className="left1">
                    <HomeIntro />      
                </div>
                <div className="right1">
                    <h1 className='title2'>Sign In</h1>
                    <LoginForm />                    
                </div>
                
            </div>
        </div>
    )
}

export default Login