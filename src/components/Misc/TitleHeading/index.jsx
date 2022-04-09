const TitleHeading = ({props, titleClass, onClick}) => {

    const { headerSize, title } = {...props};
    const HeaderElement = `h${headerSize}`;

    return (
        <HeaderElement onClick={onClick} className={titleClass.class}>{title}</HeaderElement>
    );
};

export default TitleHeading;