const TxsPill = ({ props }) => {
    const { parentProps, data } = { ...props };
    const { txHash, from, to, confirmations, txValue } = { ...data };
    const {getVanity, etherscanLinks} = {...parentProps}
    return (
            
            <div className="pillcontain">
                <div className="blockleftcontain">
                <a href={`${etherscanLinks.tx}/${txHash}`} style={{all:'unset', width: '100%'}}>
                    <h4 className="txtitleheading-copy">{getVanity(txHash,4,4)}</h4>
                    </a>
                </div>
                <div className="blockrightcontain">
                    <a href={`${etherscanLinks.address}/${from}`} style={{all:'unset', width: '100%'}}>
                    <h6 className="miniblocktitleheading">From: {getVanity(from,4,4)}</h6>
                    </a>
                    <a href={`${etherscanLinks.address}/${to}`} style={{all:'unset', width: '100%'}}>
                    <h6 className="miniblocktitleheading">To: {getVanity(to,4,4)}</h6>
                    </a>
                    <a href={`${etherscanLinks.tx}/${txHash}`} style={{all:'unset', width: '100%'}}>
                    <h6 className="miniblocktitleheading">Confirmations: {confirmations}</h6>
                    </a>
                    <a href={`${etherscanLinks.tx}/${txHash}`} style={{all:'unset', width: '100%'}}>
                    <h6 className="miniblocktitleheading">Total ETH: {txValue}</h6>
                    </a>
                </div>
            </div>
           
    );
};

export default TxsPill;