import { AnimatePresence, motion } from 'framer-motion'
import DivContainer from '../../Containers/DivContainer'
import LoadingBar from '../../Misc/LoadingBar'
import TitleHeading from '../../Misc/TitleHeading'
import TxsPill from '../../Misc/TxsPill'
import GoBackButton from '../../Buttons/GoBackButton'

const TxView = ({ props, animations }) => {

    const { loadingTxViewData, txViewBlockSelectedData, loadBlockRewardData, etherscanLinks } = { ...props };

    let blockSelected = txViewBlockSelectedData.block;
    let blockSelectedAllTxLength = txViewBlockSelectedData.blockTxsLength;
    let blockSelectedTxSendingEth = txViewBlockSelectedData.blockTxSendingEth;
    let blockSelectedTxSendingEthLength = txViewBlockSelectedData.blockTxSendingEthLength;

    return (

        <AnimatePresence>
            <motion.div {...animations} className="txlistcontain">
                <DivContainer containerClass={{ class: 'blocktxcontain' }}>
                    <DivContainer containerClass={{ class: 'blocktitlescontain' }}>
                        <a href={`${etherscanLinks.block}/${blockSelected}`} style={{ all: 'unset', width: '100%', cursor: 'pointer' }}>
                            <TitleHeading props={{ headerSize: 4, title: `Block #${blockSelected} (${blockSelectedAllTxLength} Transactions)` }} titleClass={{ class: 'blocktitleheading' }} />
                        </a>
                        <TitleHeading onClick={() => loadBlockRewardData(txViewBlockSelectedData)} props={{ headerSize: 4, title: `Click Here to See Block Reward (Uncle not Included)` }} titleClass={{ class: 'blockrewardtitleheading' }} />
                        <TitleHeading props={{ headerSize: 4, title: `Showing Transactions Only Sending ETH (${blockSelectedTxSendingEthLength} Transactions)` }} titleClass={{ class: 'blocktitleheading' }} />
                    </DivContainer>
                    <DivContainer containerClass={{ class: 'listcontain' }}>
                        {blockSelectedTxSendingEthLength <= 0 ?
                            <LoadingBar props={{ msg: 'This Block Has No TXs....Check Another!', showLoader: false }} /> :
                            loadingTxViewData ? <LoadingBar props={{ msg: 'Loading Tx Data....', showLoader: true }} /> : blockSelectedTxSendingEth.map((data) => {
                                let childProps = { parentProps: props, data };
                                return <TxsPill key={data.txHash} props={childProps} />
                            })
                        }
                    </DivContainer>
                    <GoBackButton props={props} />
                </DivContainer>
            </motion.div>
        </AnimatePresence>

    );
};

export default TxView;