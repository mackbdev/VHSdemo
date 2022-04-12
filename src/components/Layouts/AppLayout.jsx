import DivContainer from '../Containers/DivContainer'
import { ToastContainer } from 'react-toastify';
import InfoBox from '../Core/InfoBox'
import Loadingbar from '../Misc/LoadingBar';
import TitleHeading from '../Misc/TitleHeading';
import ErrorPage from '../Pages/ErrorPage';
import Nav from '../Core/Nav'

const AppLayout = ({ props, navProps, infoProps, children }) => {

    const { didCoreDataFail } = { ...props }
    
    return (
        <DivContainer containerClass={{ class: 'appcontain' }}>
            <Nav props={navProps} />
            <DivContainer containerClass={{ class: 'sectioncontain' }}>
                <DivContainer containerClass={{ class: 'dashcontain' }}>
                    {/* load try again later page if data cannot be pulled successfully */}
                    {didCoreDataFail ?
                        <ErrorPage props={{message:'Core Data Failed to Load....Please Try Again!'}} /> :
                        <>
                            <InfoBox props={infoProps} />
                            {children}
                        </>
                    }
                    {/* mobile view placeholder */}
                    <DivContainer containerClass={{ class: 'mobiledisclaimercontain' }}>
                        <DivContainer containerClass={{ class: 'minititlecontain' }}>
                            <TitleHeading props={{ headerSize: 6, title: `Mobile Not Ready :)` }} titleClass={{ class: 'discalimertitleheading' }} />
                        </DivContainer>
                    </DivContainer>
                </DivContainer>
            </DivContainer>
            <DivContainer containerClass={{ class: 'footercontain' }} />
            {/* container used to display toast notifications */}
            <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </DivContainer>
    )

};

export default AppLayout;
