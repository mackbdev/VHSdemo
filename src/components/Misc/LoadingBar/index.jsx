const Loadingbar = ({ props }) => {
let {msg,showLoader} = {...props}


    return (

            <div className="loadingbarcontain">
                <h4 className="loadingtitleheading">{msg}</h4>
                {showLoader && <div className="loadingbar"></div>}
            </div>
    );
};

export default Loadingbar;