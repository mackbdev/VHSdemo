import DivContainer from "../../Containers/DivContainer";
import "./index.css";

const Logo = () => {

    return (
        <DivContainer containerClass={{ class: "logocontain" }}>
            <a href="/">
                <img src="/logo.gif" alt="logo" className="logo" />
            </a>
        </DivContainer>
    );
    
};

export default Logo;
