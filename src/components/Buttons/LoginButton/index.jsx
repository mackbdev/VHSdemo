import '../index.css';

const LoginButton = ({ props }) => {

    const { web3Login, web3Logout, isUserLoggedIn, userData } = { ...props }

    return (
        <>
            {isUserLoggedIn ?
                <button onClick={web3Logout} className="button">{userData.userVanity}</button> :
                <button onClick={web3Login} className="button ">Connect</button>
            }
        </>
    )
};

export default LoginButton;