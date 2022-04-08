import TxsPill from '../Misc/TxsPill'
import GoBackButton from '../Buttons/GoBackButton'
import LoadingBar from '../Misc/LoadingBar'
import { AnimatePresence, motion } from 'framer-motion'
const TxView = ({ props, animations }) => {
    const { loadingTxViewData, txViewBlockSelectedData, loadBlockRewardData, etherscanLinks } = { ...props };

    let blockSelected = txViewBlockSelectedData.block;
    let blockSelectedAllTxLength = txViewBlockSelectedData.blockTxsLength;
    let blockSelectedTxSendingEth = txViewBlockSelectedData.blockTxSendingEth;
    let blockSelectedTxSendingEthLength = txViewBlockSelectedData.blockTxSendingEthLength;

    return (

        <AnimatePresence>
            <motion.div {...animations} className="txlistcontain">
                <div className="blocktxcontain">
                    <div className="blocktitlescontain">
                        <a href={`${etherscanLinks.block}/${blockSelected}`} style={{ all: 'unset', width: '100%' }}>
                            <h4 className="blocktitleheading">Block #{blockSelected} ({blockSelectedAllTxLength} Transactions)</h4>
                        </a>
                        <h4 onClick={() => loadBlockRewardData(txViewBlockSelectedData)} className="blockrewardtitleheading">Click Here to See Block Reward (Uncle not Included)</h4>
                        <h4 className="blocktitleheading">Showing Transactions Only Sending ETH ({blockSelectedTxSendingEthLength} Transactions)</h4>
                    </div>
                    <div className="listcontain">
                        {blockSelectedTxSendingEthLength < 0 ? <LoadingBar props={{ msg: 'This Block Has No TXs....Check Another!', showLoader: true }} /> :
                            loadingTxViewData ? <LoadingBar props={{ msg: 'Loading Tx Data....', showLoader: true }} /> : blockSelectedTxSendingEth.map((data) => {
                                let childProps = { parentProps: props, data };
                                return <TxsPill key={data.txHash} props={childProps} />
                            })}
                    </div>
                    <GoBackButton props={props} />
                </div>
            </motion.div>
        </AnimatePresence>

    );
};

export default TxView;