import TitleHeading from '../../Misc/TitleHeading'
const InfoPane = ({ props }) => {
    const { title, data } = { ...props };
    return (
        <>
            <div className="titlecontain">
                <TitleHeading props={{ title }} />
            </div>
            <h6 className="miniinfotitleheading">{data}</h6>
        </>
    );
};

export default InfoPane;