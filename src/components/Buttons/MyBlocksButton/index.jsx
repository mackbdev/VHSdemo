const MyBlocksButton = ({ props }) => {
    const { userData,myBlocksViewSelect } = { ...props };
    return (
        <>
            <a href='#' onClick={() => myBlocksViewSelect(userData.userID)} className="button ">My Blocks</a>
        </>
    )
};

export default MyBlocksButton;