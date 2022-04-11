import DivContainer from '../../Containers/DivContainer'
import TitleHeading from '../../Misc/TitleHeading'
import ToggleButton from '../../Buttons/ToggleButton'


const InfoBox = ({ props }) => {

    const { priceData, blocksData, toggleLiveUpdates, toggleLiveUpdatesState, toggleLiveDashboardUpdates, toggleLiveDashboardUpdatesState, toggleLiveNotifyUpdates, toggleLiveNotifyUpdatesState } = { ...props };
    let price = priceData.price;
    let priceString = priceData.priceString || '.....';
    let totalTx = blocksData.totalTx || '.....';
    let totalValueOfTxSendingEth = blocksData.totalValueOfTxSendingEth || '....';
    let totalValueOfTxSendingEthUSD = (Number(totalValueOfTxSendingEth) * (price));
    totalValueOfTxSendingEth = totalValueOfTxSendingEth.toLocaleString("en-US");
    totalValueOfTxSendingEthUSD = totalValueOfTxSendingEthUSD.toLocaleString("en-US");
    totalValueOfTxSendingEthUSD = totalValueOfTxSendingEthUSD === 'NaN' ? 0 : totalValueOfTxSendingEthUSD;
    let totalGasBurned = blocksData.totalGasBurned || '....';
    let totalGasBurnedUSD = (Number(totalGasBurned) * (price)).toLocaleString("en-US");
    totalGasBurnedUSD = totalGasBurnedUSD === 'NaN' ? 0 : totalGasBurnedUSD;
    let toggleButtons = [
        { state: toggleLiveUpdatesState, toggleFunction: toggleLiveUpdates, title: 'Updates' },
        { state: toggleLiveNotifyUpdatesState, toggleFunction: toggleLiveNotifyUpdates, title: 'Notify Updates' },
        { state: toggleLiveDashboardUpdatesState, toggleFunction: toggleLiveDashboardUpdates, title: 'Dash Updates' }
    ]
    return (
        <DivContainer containerClass={{ class: 'infocontain' }}>
            <DivContainer containerClass={{ class: 'minititlecontain' }}>
                <TitleHeading props={{ headerSize: 6, title: 'Latest 10 Blocks' }} titleClass={{ class: 'minititleheading' }} />
            </DivContainer>
            <DivContainer containerClass={{ class: 'infoblockscontain' }}>
                <DivContainer containerClass={{ class: 'leftcontain' }}>
                    <DivContainer containerClass={{ class: 'topcontain' }}>
                        <DivContainer containerClass={{ class: 'titlecontain' }}>
                            <TitleHeading props={{ headerSize: 4, title: 'ETH Price (USD)' }} titleClass={{ class: 'titleheading' }} />
                        </DivContainer>
                        <TitleHeading props={{ headerSize: 6, title: `${priceString}` }} titleClass={{ class: 'miniinfotitleheading' }} />
                    </DivContainer>
                    <DivContainer containerClass={{ class: 'bottomcontain' }}>
                        <DivContainer containerClass={{ class: 'titlecontain' }}>
                            <TitleHeading props={{ headerSize: 4, title: 'Total ETH Sent' }} titleClass={{ class: 'titleheading' }} />
                        </DivContainer>
                        <TitleHeading props={{ headerSize: 6, title: `${totalValueOfTxSendingEth} (~$${totalValueOfTxSendingEthUSD})` }} titleClass={{ class: 'miniinfotitleheading' }} />
                    </DivContainer>
                </DivContainer>
                <DivContainer containerClass={{ class: 'rightcontain' }}>
                    <DivContainer containerClass={{ class: 'topcontain' }}>
                        <DivContainer containerClass={{ class: 'titlecontain' }}>
                            <TitleHeading props={{ headerSize: 4, title: 'Total Transactions' }} titleClass={{ class: 'titleheading' }} />
                        </DivContainer>
                        <TitleHeading props={{ headerSize: 6, title: `${totalTx}` }} titleClass={{ class: 'miniinfotitleheading' }} />
                    </DivContainer>
                    <DivContainer containerClass={{ class: 'bottomcontain' }}>
                        <DivContainer containerClass={{ class: 'titlecontain' }}>
                            <TitleHeading props={{ headerSize: 4, title: 'Total Gas Burned' }} titleClass={{ class: 'titleheading' }} />
                        </DivContainer>
                        <TitleHeading props={{ headerSize: 6, title: `${totalGasBurned} (~$${totalGasBurnedUSD})` }} titleClass={{ class: 'miniinfotitleheading' }} />
                    </DivContainer>
                </DivContainer>
            </DivContainer>
            <DivContainer containerClass={{ class: 'togglebuttoncontain' }}>
                {toggleButtons.map((data) => <ToggleButton key={data.title} props={{ data }} />)}
            </DivContainer>
        </DivContainer >
    );
};

export default InfoBox;