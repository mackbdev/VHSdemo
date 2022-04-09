import '../index.css';
import TitleHeading from '../../Misc/TitleHeading'
import ToggleButton from '../../Buttons/ToggleButton'
const InfoBox = ({ props }) => {

    const { priceData, blocksData, toggleLiveUpdates, toggleLiveUpdatesState, toggleLiveDashboardUpdates, toggleLiveDashboardUpdatesState, toggleLiveNotifyUpdates, toggleLiveNotifyUpdatesState } = { ...props };
    let price = priceData.price;
    let priceString = priceData.priceString || '.....';
    let totalTx = blocksData.totalTx || '.....';
    let totalValueOfTxSendingEth = blocksData.totalValueOfTxSendingEth || '....';
    let totalValueOfTxSendingEthUSD = (Number(totalValueOfTxSendingEth) * (price));
    console.log({msg:'weird error with price 1000+ eth',totalValueOfTxSendingEth,totalValueOfTxSendingEthUSD,price},Number(totalValueOfTxSendingEth))
    totalValueOfTxSendingEth = totalValueOfTxSendingEth.toLocaleString("en-US")
    totalValueOfTxSendingEthUSD = totalValueOfTxSendingEthUSD.toLocaleString("en-US")
    let totalGasBurned = blocksData.totalGasBurned || '....';
    let totalGasBurnedUSD = (Number(totalGasBurned) * (price)).toLocaleString("en-US");
    let toggleButtons = [
        { state: toggleLiveUpdatesState, toggleFunction: toggleLiveUpdates, title: 'Updates' },
        { state: toggleLiveNotifyUpdatesState, toggleFunction: toggleLiveNotifyUpdates, title: 'Notify Updates' },
        { state: toggleLiveDashboardUpdatesState, toggleFunction: toggleLiveDashboardUpdates, title: 'Dash Updates' }
    ]
    return (
        <>
            <div className="infocontain">
                <div className="minititlecontain">
                    <h6 className="minititleheading">Latest 10 Blocks</h6>
                </div>
                <div className="infoblockscontain">
                    <div className="leftcontain">
                        <div className="topcontain">
                            <div className="titlecontain">
                                <TitleHeading props={{ title: 'ETH Price (USD)' }} />
                            </div>
                            <h6 className="miniinfotitleheading">${priceString}</h6>
                        </div>
                        <div className="bottomcontain">
                            <div className="titlecontain">
                                <TitleHeading props={{ title: 'Total ETH Sent' }} />
                            </div>
                            <h6 className="miniinfotitleheading">{totalValueOfTxSendingEth} (~${totalValueOfTxSendingEthUSD})</h6>
                        </div>
                    </div>
                    <div className="rightcontain">
                        <div className="topcontain">
                            <div className="titlecontain">
                                <TitleHeading props={{ title: 'Total Transactions' }} />
                            </div>
                            <h6 className="miniinfotitleheading">{totalTx}</h6>
                        </div>
                        <div className="bottomcontain">
                            <div className="titlecontain">
                                <TitleHeading props={{ title: 'Total Gas Burned' }} />
                            </div>
                            <h6 className="miniinfotitleheading">{totalGasBurned} (~${totalGasBurnedUSD})</h6>
                        </div>
                    </div>
                </div>
                <div className="togglebuttoncontain">
                    {toggleButtons.map((data) => <ToggleButton key={data.title} props={{ data }} />)}
                </div>
            </div>
        </>
    );
};

export default InfoBox;