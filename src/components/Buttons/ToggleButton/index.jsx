import '../index.css';
const ToggleButton = ({ props }) => {
    const { data } = { ...props }
    const { state, toggleFunction, title } = { ...data }
    return (
        <span data-testid="toggle-button">
            {state ?
                <a href="#" onClick={toggleFunction} className="togglebutton w-button">{title} ON</a> :
                <a href="#" onClick={toggleFunction} className="togglebutton w-button"><strike>{title} OFF</strike></a>
            }
        </span>
    )
};

export default ToggleButton;