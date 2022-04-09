import '../index.css';
import TitleHeading from '../../Misc/TitleHeading'
import ToggleButton from '../../Buttons/ToggleButton'
const InfoBox = ({ props }) => {

    const { priceData, blocksData, toggleAllLiveUpdates, toggleAllLiveUpdatesState, toggleLiveDashboardUpdates, toggleLiveDashboardUpdatesState, toggleLiveNotifyUpdates, toggleLiveNotifyUpdatesState } = { ...props };
    let price = priceData.price;
    let priceString = priceData.priceString || '.....';
    let totalTx = blocksData.totalTx || '.....';
    let totalValueOfTxSendingEth = blocksData.totalValueOfTxSendingEth || '.....';
    // calculations crash and randomly throw NaN, relying on toFixed()
    let totalValueOfTxSendingEthUSD = (Number(totalValueOfTxSendingEth) * (price));
    // NaN error thrown when trying calculate USD amount of 1000+ ETH
    totalValueOfTxSendingEthUSD = totalValueOfTxSendingEthUSD.toFixed(2).toLocaleString("en-US")
    // commify util fails as well
    //totalValueOfTxSendingEthUSD = ethers.utils.commify(totalValueOfTxSendingEthUSD)
    let totalGasBurned = blocksData.totalGasBurned || '.....';
    let totalGasBurnedUSD = (Number(totalGasBurned) * (price)).toLocaleString("en-US");
    let toggleButtons = [
        { state: toggleAllLiveUpdatesState, toggleFunction: toggleAllLiveUpdates, title: 'Updates' },
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