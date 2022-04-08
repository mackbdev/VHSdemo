const { getVanity, fixedNoRound2, countdown, getLiveDexPrice, getLatestBlock, getTxFee, initBlocks } = require('./coreFunctions');
const { addresses, providers, staticData, evmChains, _infuraID, etherscanLinks } = require('./staticVariables');

test('Takes in a string and returns the number of characters chosen from the front & back with 3 dots for ex. (Happy,2,2) returns Ha...py', () => {
    expect(getVanity('Happy', 2, 2)).toBe('Ha...py')
})

test('Excpect number input to be returned with 2 decimal places and not rounded.', () => {
    expect(fixedNoRound2(8547.5366)).toBe(8547.53)
})

test('Expect an array that contains start number input & counting down from input by count', () => {
    expect(countdown(10, 9)).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
})

test('Expect object with price of ETH, should be number greater than 4 digits minimum 3000', async () => { 
    let priceData = await getLiveDexPrice(providers.ethWSS, addresses.uniRouter, [addresses.usdc, addresses.weth], { tokenName: 'eth', tokenDecimals: 18 }, { tokenName:
         'usdc', tokenDecimals: 6 });
    let price = priceData.price;
    expect(price).toBeGreaterThanOrEqual(3000)
})
test('Expect the latest block received to be 8 or larger, current block at the time of writing this is 14546512', async () => { 
    let latestBlock = await getLatestBlock(providers.ethWSS);
    expect(latestBlock).toBeGreaterThanOrEqual(8)
})
test('Expect TX fee of a TX hash to be less than 0.2 ETH', async () => { 
    let txFee = await getTxFee(providers.ethWSS,'0xdc594478592175afce7156fd53512739a0dc0e77f8f79f1a3df865d3166b2ca7');
    expect(txFee).toBeLessThanOrEqual(0.5)
})
test('Expect array of blocks length equal to count + 1, counting down from the start input', async () => { 
    let count = 3;
    let latestBlock = await getLatestBlock(providers.ethWSS);
    let data = await initBlocks(providers.ethWSS,latestBlock,count);
    let arrayOfBlocks = data.latestBlocksInfo
    let lengthOfBlocksArray = arrayOfBlocks.length;
    let firstBlockOfArray = arrayOfBlocks[0].number;
    expect(firstBlockOfArray).toEqual(latestBlock)
    expect(lengthOfBlocksArray).toEqual(count+1)
})
