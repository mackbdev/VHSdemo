import { useNavigate } from 'react-router-dom';
import '../index.css';

const LoginButton = ({ props }) => {

    const { web3Login, web3Logout, isUserLoggedIn, userDataState } = { ...props }
    
    const navigate = useNavigate();
    
    const web3LogoutNavigate = async () => {
        await web3Logout()
        navigate('/')
    }

    return (
        <>
            {isUserLoggedIn ?
                <button onClick={()=> web3LogoutNavigate()} className="button">{userDataState.userVanity}</button> :
                <button onClick={web3Login} className="button ">Connect</button>
            }
        </>
    )
};

export default LoginButton;