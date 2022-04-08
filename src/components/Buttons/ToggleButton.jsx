const ToggleButton = ({ props }) => {
    const { data } = { ...props }
    const { state,toggleFunction,title } = { ...data }
    return (
        <>
            {state ? <a href="#" onClick={toggleFunction} className="togglebutton w-button">{title} ON</a> : <a href="#" onClick={toggleFunction} className="togglebutton w-button"><strike>{title} OFF</strike></a>}
        </>
    )
};

export default ToggleButton;