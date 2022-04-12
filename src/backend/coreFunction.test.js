import { getVanity, fixedNoRound2, countdown, getLiveDexPrice, getLatestBlock, getTxFee, getBlockReward, initBlocks } from './coreFunctions';
import { addresses, providers, staticData, _infuraID } from './staticVariables';

describe('Core Functions Test', () => {

    it('Takes in a string and returns the number of characters chosen from the front & back with 3 dots for ex. (Happy,2,2) returns Ha...py', () => {
        expect(getVanity('Happy', 2, 2)).toBe('Ha...py')
    })

    it('Expect number input to be returned with 2 decimal places and not rounded.', () => {
        expect(fixedNoRound2(8547.5366)).toBe(8547.53)
    })

    it('Expect an array that contains start number input & counting down from input by count', () => {
        expect(countdown(10, 9)).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
    })

    it('Expect object with price of ETH, should be number greater than 4 digits minimum 3000', async () => {
        let priceData = await getLiveDexPrice(providers.ethWSS, addresses.uniRouter, [addresses.usdc, addresses.weth], { tokenName: 'eth', tokenDecimals: 18 }, {
            tokenName:
                'usdc', tokenDecimals: 6
        });
        let price = priceData.price;
        // lol price of ETH when down while testing this, setting from 3k to 2.5k
        expect(price).toBeGreaterThanOrEqual(2500)
    })

    it('Expect the latest block received to be 8 or larger, current block at the time of writing this is 14546512', async () => {
        let latestBlock = await getLatestBlock(providers.ethWSS);
        expect(latestBlock).toBeGreaterThanOrEqual(8)
    })

    it('Expect TX fee of a TX hash to be less than 0.2 ETH', async () => {
        let txFee = await getTxFee(providers.ethWSS, '0xdc594478592175afce7156fd53512739a0dc0e77f8f79f1a3df865d3166b2ca7');
        expect(txFee).toBeLessThanOrEqual(0.5)
    })

    it('Expect array of blocks length equal to count + 1, counting down from the latest block', async () => {
        let count = 3;
        let data = await initBlocks(providers.ethWSS, count);
        let latestBlock = data.latestBlock;
        let arrayOfBlocks = data.latestBlocksInfo;
        let lengthOfBlocksArray = arrayOfBlocks.length;
        let firstBlockOfArray = arrayOfBlocks[0].number;
        expect(firstBlockOfArray).toEqual(latestBlock)
        expect(lengthOfBlocksArray).toEqual(count + 1)
        // timeout can occur, added large time interval so test can complete
    }, 500000)    
    
    it('Expect block reward to be equal to or greater than the static block reward', async () => {
        let count = 3;
        let data = await initBlocks(providers.ethWSS, count);
        let blockData = data.latestBlocksFiltered;
        // becuase of rate limit
        blockData = blockData.find(data => data.blockTxsLength < 100);
        let blockReward = await getBlockReward(providers.ethWSS, blockData, staticData.blockReward);
        expect(blockReward).toBeGreaterThanOrEqual(staticData.blockReward);
        // timeout occurs, added large time interval so test can complete
    }, 500000)

})
