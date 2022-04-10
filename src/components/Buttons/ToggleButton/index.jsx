import '../index.css';

const ToggleButton = ({ props }) => {

    const { data } = { ...props }
    const { state, toggleFunction, title } = { ...data }
    
    return (
        <span data-testid="toggle-button">
            {state ?
                <button onClick={toggleFunction} className="togglebutton">{title} ON</button> :
                <button onClick={toggleFunction} className="togglebutton"><strike>{title} OFF</strike></button>
            }
        </span>
    )
};

export default ToggleButton;