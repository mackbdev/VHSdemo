import "./index.css";

const Container = ({ children, onClick, containerClass }) => {

    return (
        <div onClick={onClick} className={containerClass.class}>
            {children}
        </div>
    );
    
};

export default Container;
