const LoginButton = ({ props }) => {
   const { web3Login, web3Logout, isUserLoggedIn,loadingUserLogin,userData } = { ...props }
    return (
        <>
            {isUserLoggedIn ? <a href="#" onClick={web3Logout} className="button ">{userData.userVanity}</a> : <a href="#" onClick={web3Login} className="button ">Connect</a> }
        </>
    )
};

export default LoginButton;