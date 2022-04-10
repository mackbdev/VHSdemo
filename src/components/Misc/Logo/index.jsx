import DivContainer from '../../Containers/DivContainer'
import './index.css';

const Logo = ({ props }) => {

    return (

        <DivContainer containerClass={{ class: 'logocontain' }}>
            <a href='/' style={{ all: 'unset', width: '100%', cursor: 'pointer' }}>
                <img src="/logo.gif" alt="logo" className="logo" />
            </a>
        </DivContainer>

    )
};

export default Logo;