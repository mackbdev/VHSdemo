import { useNavigate } from "react-router-dom";
import Button from "../Button"

const MyBlocksButton = ({ props }) => {

    const { myBlocksViewSelect } = { ...props };
    const navigate = useNavigate();

    const myBlocksViewNavigate = async () => {
        await myBlocksViewSelect();
        navigate("/myBlocksView");
    };

    return (
        <Button
            onClick={myBlocksViewNavigate}
            buttonClass={{ class: 'button' }}
            props={{ title: 'My Blocks' }}
        />
    );

};

export default MyBlocksButton;
