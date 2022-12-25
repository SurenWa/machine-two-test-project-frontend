import React, { useState } from 'react'

import RegisterForm from '../components/RegisterForm';
import HomeIntro from '../components/HomeIntro';

const Register = () => {

    // const [loading, setLoading] = useState(false)
    // const [user, setUser] = useState({
    //     firstName: '',
    //     lastName: '',
    //     email: '',
    //     password: ''
    // })


    return (
        <div className="container">
            <div className="register">
                <div className="left1">
                    <HomeIntro />      
                </div>
                <div className="right1">
                    <h1 className='title2'>Register</h1>
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}

export default Register