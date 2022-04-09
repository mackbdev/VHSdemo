import DivContainer from '../../Containers/DivContainer'
import '../index.css';

const GoBackButton = ({ props }) => {

    const { latestBlocksViewSelect } = { ...props };

    return (
        
        <DivContainer onClick={latestBlocksViewSelect} containerClass={{class:'closebuttoncontain'}}>
            <h4 className="closebuttontitleheading">Go Back</h4>
        </DivContainer>

    );
};

export default GoBackButton;