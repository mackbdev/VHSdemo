import '../index.css';

const HomeButton = ({ props }) => {

    const { setView } = { ...props }

    return (

        <button onClick={() => setView('latestBlocksView')} className="button">Home</button>

    )
};

export default HomeButton;