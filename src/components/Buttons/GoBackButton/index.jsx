import '../index.css';
const GoBackButton = ({ props }) => {
    const { latestBlocksViewSelect } = { ...props };
    return (

        <div onClick={latestBlocksViewSelect} className="closebuttoncontain">
            <h4 className="closebuttontitleheading">Go Back</h4>
        </div>

    );
};

export default GoBackButton;