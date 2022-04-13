import Button from "../Button"

const ToggleButton = ({ props }) => {

    const { data } = { ...props }
    const { state, toggleFunction, title } = { ...data }

    return (
        <span data-testid="toggle-button">
            {state ?
                <Button
                    onClick={toggleFunction}
                    buttonClass={{ class: 'togglebutton' }}
                    props={{ title: `${title} ON` }}
                />
                :
                <Button
                    onClick={toggleFunction}
                    buttonClass={{ class: 'togglebutton togglestrike' }}
                    props={{ title: `${title} OFF` }}
                />
            }
        </span>
    )

};

export default ToggleButton;