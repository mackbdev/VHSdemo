const LoginButton = ({ props }) => {
   const { web3Login, web3Logout, isUserLoggedIn,loadingUserLogin,userData } = { ...props }
    return (
        <>
            {isUserLoggedIn ? <a href="#" onClick={web3Logout} className="button w-button">{userData.userVanity}</a> : <a href="#" onClick={web3Login} className="button w-button">Connect</a> }
        </>
    )
};

export default LoginButton;