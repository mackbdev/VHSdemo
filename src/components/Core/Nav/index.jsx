import React from 'react';
import LoginButton from '../../Buttons/LoginButton'
import MyBlocksButton from '../../Buttons/MyBlocksButton'
import HomeButton from '../../Buttons/HomeButton'
import Logo from '../../Misc/Logo'

// toggle between views
const Nav = ({ props }) => {

    const { isUserLoggedIn } = { ...props }

    return (
        <div className="navcontain">
            <div className="nav">
                <div className="leftcontain">
                    <Logo />
                </div>
                <div className="rightnavcontain">
                    <HomeButton props={props} />

                    <LoginButton props={props} />
                    {isUserLoggedIn && <MyBlocksButton props={props} />}

                </div>
            </div>
        </div>
    )
};

export default Nav;