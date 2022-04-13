import { useNavigate } from "react-router-dom";
import Button from "../Button";

const LoginButton = ({ props }) => {
    const { web3Login, web3Logout, isUserLoggedIn, userDataState } = { ...props };

    const navigate = useNavigate();

    const web3LogoutNavigate = async () => {
        await web3Logout();
        navigate("/");
    };

    return (
        <>
            {isUserLoggedIn ? (
                <Button
                    onClick={web3LogoutNavigate}
                    buttonClass={{ class: 'button' }}
                    props={{ title: userDataState.userVanity }}
                />
            ) : (
                <Button
                    onClick={web3Login}
                    buttonClass={{ class: 'button' }}
                    props={{ title: 'Connect' }}
                />
            )}
        </>
    );
};

export default LoginButton;
