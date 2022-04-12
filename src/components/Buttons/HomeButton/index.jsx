import { useNavigate } from 'react-router-dom';
import '../index.css';

const HomeButton = ({ props }) => {

    const navigate = useNavigate();

    return (

        <button onClick={() => navigate('/')} className="button">Home</button>

    )
};

export default HomeButton;