import DivContainer from '../../Containers/DivContainer'
import TitleHeading from '../TitleHeading'

const TxsPill = ({ props }) => {

    const { parentProps, data } = { ...props };
    const { txHash, from, to, confirmations, txValue } = { ...data };
    const { getVanity, etherscanLinks } = { ...parentProps }

    return (

        <DivContainer containerClass={{ class: 'pillcontain' }}>
            <DivContainer containerClass={{ class: 'blockleftcontain' }}>
                <a href={`${etherscanLinks.tx}/${txHash}`} style={{ all: 'unset', width: '100%' }}>
                    <TitleHeading props={{ headerSize: 4, title: `${getVanity(txHash, 4, 4)}` }} titleClass={{ class: 'pilltitleheading' }} />
                </a>
            </DivContainer>
            <DivContainer containerClass={{ class: 'blockrightcontain' }}>
                <a href={`${etherscanLinks.address}/${from}`} style={{ all: 'unset', width: '100%' }}>
                    <TitleHeading props={{ headerSize: 6, title: `From: ${getVanity(from, 4, 4)}` }} titleClass={{ class: 'miniblocktitleheading' }} />
                </a>
                <a href={`${etherscanLinks.address}/${to}`} style={{ all: 'unset', width: '100%' }}>
                    <TitleHeading props={{ headerSize: 6, title: `To: ${getVanity(to, 4, 4)}` }} titleClass={{ class: 'miniblocktitleheading' }} />

                </a>
                <a href={`${etherscanLinks.tx}/${txHash}`} style={{ all: 'unset', width: '100%' }}>
                    <TitleHeading props={{ headerSize: 6, title: `Confirmations: ${confirmations}` }} titleClass={{ class: 'miniblocktitleheading' }} />
                </a>
                <a href={`${etherscanLinks.tx}/${txHash}`} style={{ all: 'unset', width: '100%' }}>
                    <TitleHeading props={{ headerSize: 6, title: `Total ETH: ${txValue}` }} titleClass={{ class: 'miniblocktitleheading' }} />
                </a>
            </DivContainer>
        </DivContainer>

    );
};

export default TxsPill;