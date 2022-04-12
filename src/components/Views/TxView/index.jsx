import { AnimatePresence, motion } from 'framer-motion'
import DivContainer from '../../Containers/DivContainer'
import LoadingBar from '../../Misc/LoadingBar'
import TitleHeading from '../../Misc/TitleHeading'
import TxsPill from '../../Misc/TxsPill'
import GoBackButton from '../../Buttons/GoBackButton'

const TxView = ({ props, animations }) => {

    const { loadingTxViewData, txViewBlockSelectedData, loadBlockRewardData } = { ...props };

    let blockSelected = txViewBlockSelectedData.block;
    let blockSelectedAllTxLength = txViewBlockSelectedData.blockTxsLength;
    let blockSelectedTxSendingEth = txViewBlockSelectedData.blockTxSendingEth;
    let blockSelectedTxSendingEthLength = txViewBlockSelectedData.blockTxSendingEthLength;

    return (

        <DivContainer containerClass={{ class: 'txlistcontain' }} >
            <DivContainer containerClass={{ class: 'blocktxcontain' }}>
                {/* saftey check for display */}
                <DivContainer containerClass={{ class: 'blocktitlescontain' }}>
                    <TitleHeading props={{ headerSize: 3, title: `Block #${blockSelected} (${blockSelectedAllTxLength} Transactions)` }} titleClass={{ class: 'blocktitleheading' }} />
                    <TitleHeading onClick={() => loadBlockRewardData(txViewBlockSelectedData)} props={{ headerSize: 4, title: `Click Here to See Block Reward (Uncle not Included)` }} titleClass={{ class: 'blockrewardtitleheading' }} />
                    {blockSelectedTxSendingEthLength > 0 &&
                        <TitleHeading props={{ headerSize: 3, title: `Showing Transactions Only Sending ETH (${blockSelectedTxSendingEthLength} Transactions)` }} titleClass={{ class: 'blocktitleheading' }} />
                    }
                </DivContainer>
                {blockSelectedTxSendingEthLength <= 0 ?
                    <LoadingBar props={{ msg: 'This Block Has No TXs....Check Another!', showLoader: false }} /> :
                    loadingTxViewData ? <LoadingBar props={{ msg: 'Loading Tx Data....', showLoader: true }} /> :
                        <DivContainer containerClass={{ class: 'listcontain' }}>
                            {blockSelectedTxSendingEth.map((data) => {
                                let childProps = { parentProps: props, data };
                                return <TxsPill key={data.txHash} props={childProps} animations={animations} />
                            })
                            }
                        </DivContainer>
                }
                <GoBackButton />
            </DivContainer>
        </DivContainer>

    );
};

export default TxView;