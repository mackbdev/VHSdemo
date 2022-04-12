import DivContainer from '../../Containers/DivContainer'
import TitleHeading from '../../Misc/TitleHeading'
import { useNavigate } from 'react-router-dom';

import '../index.css';

const GoBackButton = () => {

    const navigate = useNavigate();

    return (
        
        <DivContainer onClick={() => navigate(-1)} containerClass={{class:'closebuttoncontain'}}>
            <TitleHeading props={{ headerSize: 4, title: `Go Back` }} titleClass={{ class: 'closebuttontitleheading' }} />
        </DivContainer>

    );
};

export default GoBackButton;