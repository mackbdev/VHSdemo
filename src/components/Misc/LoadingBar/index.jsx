import DivContainer from '../../Containers/DivContainer'
import TitleHeading from '../../Misc/TitleHeading'

const Loadingbar = ({ props }) => {

    let { msg, showLoader } = { ...props }

    return (

        <DivContainer containerClass={{ class: 'loadingbarcontain' }}>
            <TitleHeading props={{ headerSize: 4, title: `${msg}` }} titleClass={{ class: 'loadingtitleheading' }} />
            {showLoader && <div className="loadingbar"></div>}
        </DivContainer>
    );
};

export default Loadingbar;