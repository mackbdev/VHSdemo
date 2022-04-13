import { useNavigate } from 'react-router-dom';
import Button from '../Button';

const HomeButton = () => {

    const navigate = useNavigate();

    return (

        <Button onClick={() => navigate('/')} buttonClass={{class:"button"}} props={{title:'Home'}}/>

    )
    
};

export default HomeButton;