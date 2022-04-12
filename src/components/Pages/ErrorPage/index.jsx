import DivContainer from '../../Containers/DivContainer'
import Loadingbar from '../../Misc/LoadingBar';

const ErrorPage = ({ props }) => {

    let { message } = {...props}

    return (
                        <DivContainer containerClass={{ class: 'blockslistcontain' }}>
                            <Loadingbar props={{ msg: message , showLoader: false }} />
                        </DivContainer> 
    )

};

export default ErrorPage;
