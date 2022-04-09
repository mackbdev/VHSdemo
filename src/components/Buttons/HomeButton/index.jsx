import '../index.css';
const HomeButton = ({ props }) => {
    const { setView } = { ...props }
    return (

        <a href="#" onClick={() => setView('latestBlocksView')} className="button">Home</a>

    )
};

export default HomeButton;