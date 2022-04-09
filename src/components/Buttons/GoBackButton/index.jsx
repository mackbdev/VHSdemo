import DivContainer from '../../Containers/DivContainer'
import TitleHeading from '../../Misc/TitleHeading'

import '../index.css';

const GoBackButton = ({ props }) => {

    const { latestBlocksViewSelect } = { ...props };

    return (
        
        <DivContainer onClick={latestBlocksViewSelect} containerClass={{class:'closebuttoncontain'}}>
            <TitleHeading props={{ headerSize: 4, title: `Go Back` }} titleClass={{ class: 'closebuttontitleheading' }} />
        </DivContainer>

    );
};

export default GoBackButton;