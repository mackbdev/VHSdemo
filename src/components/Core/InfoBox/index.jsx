import DivContainer from '../../Containers/DivContainer'
import TitleHeading from '../../Misc/TitleHeading'
import ToggleButton from '../../Buttons/ToggleButton'
import './index.css';

const InfoBox = ({ props }) => {

    const { priceData, blocksData, toggleLiveUpdates, toggleLiveUpdatesState, toggleLiveDashboardUpdates, toggleLiveDashboardUpdatesState, toggleLiveNotifyUpdates, toggleLiveNotifyUpdatesState } = { ...props };
    let price = priceData.price;
    let priceString = priceData.priceString || '.....';
    let totalTx = blocksData.totalTx || '.....';
    let totalValueOfTxSendingEth = blocksData.totalValueOfTxSendingEth || '....';
    let totalValueOfTxSendingEthUSD = (Number(totalValueOfTxSendingEth) * (price));
    totalValueOfTxSendingEth = totalValueOfTxSendingEth.toLocaleString("en-US");
    totalValueOfTxSendingEthUSD = totalValueOfTxSendingEthUSD.toLocaleString("en-US");
    let totalGasBurned = blocksData.totalGasBurned || '....';
    let totalGasBurnedUSD = (Number(totalGasBurned) * (price)).toLocaleString("en-US");
    let toggleButtons = [
        { state: toggleLiveUpdatesState, toggleFunction: toggleLiveUpdates, title: 'Updates' },
        { state: toggleLiveNotifyUpdatesState, toggleFunction: toggleLiveNotifyUpdates, title: 'Notify Updates' },
        { state: toggleLiveDashboardUpdatesState, toggleFunction: toggleLiveDashboardUpdates, title: 'Dash Updates' }
    ]
    return (
            <DivContainer containerClass={{class:'infocontain'}}>
                <DivContainer containerClass={{class:'minititlecontain'}}>
                    <h6 className="minititleheading">Latest 10 Blocks</h6>
                </DivContainer>
                <DivContainer containerClass={{class:'infoblockscontain'}}>
                    <DivContainer containerClass={{class:'leftcontain'}}>
                        <DivContainer containerClass={{class:'topcontain'}}>
                            <DivContainer containerClass={{class:'titlecontain'}}>
                                <TitleHeading props={{ title: 'ETH Price (USD)' }} />
                            </DivContainer>
                            <h6 className="miniinfotitleheading">${priceString}</h6>
                        </DivContainer>
                        <DivContainer containerClass={{class:'bottomcontain'}}>
                            <DivContainer containerClass={{class:'titlecontain'}}>
                                <TitleHeading props={{ title: 'Total ETH Sent' }} />
                            </DivContainer>
                            <h6 className="miniinfotitleheading">{totalValueOfTxSendingEth} (~${totalValueOfTxSendingEthUSD})</h6>
                        </DivContainer>
                    </DivContainer>
                    <DivContainer containerClass={{class:'rightcontain'}}>
                        <DivContainer containerClass={{class:'topcontain'}}>
                            <DivContainer containerClass={{class:'titlecontain'}}>
                                <TitleHeading props={{ title: 'Total Transactions' }} />
                            </DivContainer>
                            <h6 className="miniinfotitleheading">{totalTx}</h6>
                        </DivContainer>
                        <DivContainer containerClass={{class:'bottomcontain'}}>
                            <DivContainer containerClass={{class:'titlecontain'}}>
                                <TitleHeading props={{ title: 'Total Gas Burned' }} />
                            </DivContainer>
                            <h6 className="miniinfotitleheading">{totalGasBurned} (~${totalGasBurnedUSD})</h6>
                        </DivContainer>
                    </DivContainer>
                </DivContainer>
                <DivContainer containerClass={{class:'togglebuttoncontain'}}>
                    {toggleButtons.map((data) => <ToggleButton key={data.title} props={{ data }} />)}
                </DivContainer>
            </DivContainer >
    );
};

export default InfoBox;