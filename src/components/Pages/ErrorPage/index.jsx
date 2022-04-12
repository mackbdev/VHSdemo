import DivContainer from '../../Containers/DivContainer'
import Loadingbar from '../../Misc/LoadingBar';
import TitleHeading from '../../Misc/TitleHeading';
import Nav from '../../Core/Nav'

const ErrorPage = ({ props }) => {

    let { message } = {...props}

    return (
                        <DivContainer containerClass={{ class: 'blockslistcontain' }}>
                            <Loadingbar props={{ msg: message , showLoader: false }} />
                        </DivContainer> 
    )

};

export default ErrorPage;
