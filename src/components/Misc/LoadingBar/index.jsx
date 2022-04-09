import DivContainer from '../../Containers/DivContainer'

const Loadingbar = ({ props }) => {

    let { msg, showLoader } = { ...props }

    return (

        <DivContainer containerClass={{ class: 'loadingbarcontain' }}>
            <h4 className="loadingtitleheading">{msg}</h4>
            {showLoader && <div className="loadingbar"></div>}
        </DivContainer>
    );
};

export default Loadingbar;