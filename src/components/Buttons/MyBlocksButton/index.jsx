import '../index.css';
import { useNavigate } from 'react-router-dom';

const MyBlocksButton = ({ props }) => {

    const { myBlocksViewSelect } = { ...props };
    
    const navigate = useNavigate();
    
    const myBlocksViewNavigate = async () => {
        await myBlocksViewSelect()
        navigate('/myBlocksView')
    }

    return (
            <button onClick={() => myBlocksViewNavigate()} className="button">My Blocks</button>
    )
};

export default MyBlocksButton;