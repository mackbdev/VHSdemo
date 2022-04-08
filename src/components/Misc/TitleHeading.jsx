const TitleHeading = ({props}) => {
    const { title } = {...props};
    return (
        <h4 className="titleheading">{title}</h4>
    );
};

export default TitleHeading;