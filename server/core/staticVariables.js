const addresses = {
    uniRouter: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    weth: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    usdc: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
}

// free endpoints provided by moralis.io
const providers = {
    eth: 'https://speedy-nodes-nyc.moralis.io/4a0aa4e4766ee64fa983d310/eth/mainnet',
    ethWSS: 'wss://speedy-nodes-nyc.moralis.io/4a0aa4e4766ee64fa983d310/eth/mainnet/ws'
}

// only eth chain used in this project
const evmChains = {
    eth: '1',
    bsc: '56',
    bsct: '97',
    poly: '137'
}

// miner block reward contains a static number that goes down over time, currently 2 ETH 
// this number must be manually updated overtime unless 3rd part api is used
// latestCount notes how many of the latest blocks will show
const staticData = {
    blockReward: 2,
    latestCount: 9
}

const etherscanLinks = {
    address: 'https://etherscan.io/address',
    tx: 'https://etherscan.io/tx',
    block: 'https://etherscan.io/block'
}

// free infuraID from metamask
const _infuraID = '9aa3d95b3bc440fa88ea12eaa4456161';

module.exports = {
    addresses: addresses,
	providers: providers,
    evmChains: evmChains,
    staticData: staticData,
    etherscanLinks: etherscanLinks
}