import '../index.css';
const MyBlocksButton = ({ props }) => {
    const { userData, myBlocksViewSelect } = { ...props };
    return (
        <>
            <button href='#' onClick={() => myBlocksViewSelect(userData.userID)} className="button">My Blocks</button>
        </>
    )
};

export default MyBlocksButton;