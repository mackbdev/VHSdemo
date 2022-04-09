import { AnimatePresence, motion } from 'framer-motion'
import DivContainer from '../../Containers/DivContainer'

const BlockPill = ({ props, animations }) => {
    const { parentProps, data } = { ...props };
    const { block, blockTime, gasBurned, blockTotalEthSent, blockTxSendingEthLength, blockTxsLength } = { ...data };
    const { txViewSelect, priceData, fixedNoRound2 } = { ...parentProps };

    let price = priceData.price;
    let blockTotalEthSentUSD = fixedNoRound2(Number(blockTotalEthSent) * price).toLocaleString("en-US");

    return (
        <AnimatePresence>
            <motion.div {...animations} onClick={() => txViewSelect(block)} className="pillcontain">
                <DivContainer containerClass={{ class: 'blockleftcontain' }}>
                    <h4 className="txtitleheading-copy">Block #{block}</h4>
                </DivContainer>
                <DivContainer containerClass={{ class: 'blockrightcontain' }}>
                    <h6 className="miniblocktitleheading">Time: {blockTime}</h6>
                    <h6 className="miniblocktitleheading">Total TX: {blockTxsLength}</h6>
                    <h6 className="miniblocktitleheading">Total TX (Only ETH): {blockTxSendingEthLength}</h6>
                    <h6 className="miniblocktitleheading">Total ETH Sent: {blockTotalEthSent} (~${blockTotalEthSentUSD})</h6>
                    <h6 className="miniblocktitleheading">Total Gas Burned: {gasBurned}</h6>
                </DivContainer>
            </motion.div>
        </AnimatePresence>

    );
};

export default BlockPill;