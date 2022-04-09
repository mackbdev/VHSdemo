import { AnimatePresence, motion } from 'framer-motion'
import DivContainer from '../../Containers/DivContainer'
import TitleHeading from '../TitleHeading'

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
                    <TitleHeading props={{ headerSize: 4, title: `Block #${block}` }} titleClass={{ class: 'pilltitleheading' }} />
                </DivContainer>
                <DivContainer containerClass={{ class: 'blockrightcontain' }}>
                    <TitleHeading props={{ headerSize: 6, title: `Time: ${blockTime}` }} titleClass={{ class: 'miniblocktitleheading' }} />
                    <TitleHeading props={{ headerSize: 6, title: `Total TX: ${blockTxsLength}` }} titleClass={{ class: 'miniblocktitleheading' }} />
                    <TitleHeading props={{ headerSize: 6, title: `Total TX (Only ETH): ${blockTxSendingEthLength}` }} titleClass={{ class: 'miniblocktitleheading' }} />
                    <TitleHeading props={{ headerSize: 6, title: `Total ETH Sent: ${blockTotalEthSent} (~$${blockTotalEthSentUSD})` }} titleClass={{ class: 'miniblocktitleheading' }} />
                    <TitleHeading props={{ headerSize: 6, title: `Total Gas Burned: ${gasBurned}` }} titleClass={{ class: 'miniblocktitleheading' }} />
                </DivContainer>
            </motion.div>
        </AnimatePresence>

    );
};

export default BlockPill;