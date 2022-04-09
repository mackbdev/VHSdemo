import '../index.css';

const ToggleButton = ({ props }) => {

    const { data } = { ...props }
    const { state, toggleFunction, title } = { ...data }
    
    return (
        <span data-testid="toggle-button">
            {state ?
                <button href="#" onClick={toggleFunction} className="togglebutton w-button">{title} ON</button> :
                <button href="#" onClick={toggleFunction} className="togglebutton w-button"><strike>{title} OFF</strike></button>
            }
        </span>
    )
};

export default ToggleButton;