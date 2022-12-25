import React from 'react';
import logo from '../assets/hms.jpg';

const HomeIntro = () => {
    return (
        <div className="logo-content">
            <div className="main-logo">
                <img
                    className="logo"
                    src={logo}
                    alt='hospital-logo'
                />
            </div>

            <h1 className='welcome-header'>
                Welcome To Global AI Lab
            </h1>
        </div>
    )
}

export default HomeIntro