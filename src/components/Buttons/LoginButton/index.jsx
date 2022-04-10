import '../index.css';

const LoginButton = ({ props }) => {

    const { web3Login, web3Logout, isUserLoggedIn, userDataState } = { ...props }
    
    return (
        <>
            {isUserLoggedIn ?
                <button onClick={web3Logout} className="button">{userDataState.userVanity}</button> :
                <button onClick={web3Login} className="button ">Connect</button>
            }
        </>
    )
};

export default LoginButton;