import '../index.css';

const MyBlocksButton = ({ props }) => {

    const { userDataState, myBlocksViewSelect } = { ...props };

    return (
        <>
            <button  onClick={() => myBlocksViewSelect(userDataState.userID)} className="button">My Blocks</button>
        </>
    )
};

export default MyBlocksButton;