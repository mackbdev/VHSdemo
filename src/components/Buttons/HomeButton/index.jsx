import '../index.css';

const HomeButton = ({ props }) => {

    const { setView } = { ...props }

    return (

        <button href="#" onClick={() => setView('latestBlocksView')} className="button">Home</button>

    )
};

export default HomeButton;