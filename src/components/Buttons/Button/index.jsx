import '../index.css';

const Button = ({ onClick, buttonClass, props }) => {

    const { title } = {...props};

    return (

        <button onClick={onClick} className={buttonClass.class}>{title}</button>

    )
    
};

export default Button;