import { ethers } from 'ethers';

// helper functions
export const getVanity = (input, firstCount, lastCount) => {
    // shorten evm address or other data for display
    if (input === null || input === undefined) { return '....' }
    return `${input.substring(0, firstCount)}...${input.slice(-lastCount)}`;
}
// fixes number to 2nd decimal place without rounding
export const fixedNoRound2 = (num) => {
    return Number(num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0])
}
// returns an array of numbers counting down from start minus count
export const countdown = (start, count) => {
    let result = [];
    for (let i = start; i >= start - count; i--) {
        result.push(i);
    }
    return result;
}
// core functions used to pull data needed
export const getLiveDexPrice = async (providerWSS, routerContract, pathArray, tokenIn, tokenOut) => {
    let tempProvider = new ethers.providers.WebSocketProvider(providerWSS);
    let router;
    try {
        router = new ethers.Contract(
            routerContract, [`function getAmountsIn(uint amountOut, address[] memory path) public view returns (uint[] memory amounts)`],
            tempProvider
        );
    } catch (err) {
        err = { status: false, message: 'Could not connect to socket!', err }
        return 0
    }
    try {
        const inputAmount = ethers.utils.parseUnits('1', tokenIn.tokenDecimals);
        let res = await router.getAmountsIn(inputAmount, pathArray);
        let price = Number(ethers.utils.formatUnits(res[0], tokenOut.tokenDecimals))
        price = fixedNoRound2(price);
        let priceString = price.toLocaleString("en-US");
        return { tokenName: tokenIn.tokenName, price, priceString, units: tokenOut.tokenName };
    } catch (err) {
        console.log('Could not fetch price!', err);
        return 0
    }
}
// get latest block from chain
export const getLatestBlock = async (providerWSS) => {
    try {
        let tempProvider = new ethers.providers.WebSocketProvider(providerWSS);
        let latestBlock = await tempProvider.getBlock('latest');
        return latestBlock.number
    } catch (err) {
        throw console.log({msg:'getLatestBlockError',err})
    }
}
// get TX fee of a given TX hash
export const getTxFee = async (providerWSS, txHash) => {
    try {
        let tempProvider = new ethers.providers.WebSocketProvider(providerWSS);
        let txReceipt = await tempProvider.getTransactionReceipt(txHash);
        let isNull = false;
        txReceipt === null ? isNull = true : isNull = false
        let txGasUsed = isNull ? 0 : txReceipt.gasUsed
        let txGasPrice = isNull ? 0 : txReceipt.effectiveGasPrice
        let txFee = Number(ethers.utils.formatUnits(txGasPrice.mul(txGasUsed), 'ether'));
        return txFee
    } catch (err) {
        console.log({msg:'getTxFeeError',err})
        return 0
    }
}
// loop through all TXs from input of a filtered block generated by initBlocks() to get total gas paid by each TX
export const getBlockReward = async (providerWSS, blockData, staticBlockReward) => {
    try {
        let counter = 0
        let blockGasPaid = 0;
        let blockTxs = blockData.blockTxs;
        let blockGasBurned = blockData.gasBurned;
        let blockTxsLength = blockData.blockTxsLength;
        for await (let tx of blockTxs) {
            let txFee = await getTxFee(providerWSS, tx.hash);
            blockGasPaid += txFee;
            counter++
            console.log({ msg: 'Loading block reward...', progress: `${counter}/${blockTxsLength}`, txFee })
        }
        let blockRewardData = fixedNoRound2(staticBlockReward + blockGasPaid - blockGasBurned);
        return blockRewardData
    } catch (err) {
        console.log({msg:'getBlockRewardError',err})
        return 0
    }
}
// get information on an array of blocks provided
export const getBlocksInfo = async (providerWSS, arrayOfBlocks) => {
    let allBlocksInfo = [];
    try {
        let tempProvider = new ethers.providers.WebSocketProvider(providerWSS);
        for await (const block of arrayOfBlocks) {
            let blockInfo = await tempProvider.getBlockWithTransactions(block);
            allBlocksInfo.push(blockInfo);
        }
        return allBlocksInfo
    } catch (err) {
        
        throw console.log({msg:'getBlocksInfoError',err})
    }
}
// load the data needed for app
export const initBlocks = async (providerWSS, latestCount) => {
    try {
        //pointer
        let latestBlock = await getLatestBlock(providerWSS);
        let latestArray = countdown(latestBlock, latestCount);
        let latestBlocksInfo = await getBlocksInfo(providerWSS, latestArray);
        let totalGasBurned = 0;
        let totalTx = 0;
        let totalTxSendingEth = 0;
        let totalValueOfTxSendingEth = 0;
        let latestBlocksFiltered = [];
        for await (const block of latestBlocksInfo) {
            if (block === null) continue;
            let gasUsed = block.gasUsed == null ? 0 : block.gasUsed;
            let gasBurned = Number(ethers.utils.formatUnits(block.baseFeePerGas.mul(gasUsed), 'ether'));
            let blockTime = block.timestamp;
            blockTime = new Date(blockTime * 1000);
            blockTime = blockTime.toLocaleString();
            let blockTxs = block.transactions;
            let blockTxsLength = blockTxs.length;
            let blockTxSendingEth = []
            let blockTotalEthSent = 0
            totalGasBurned += gasBurned;
            totalTx += blockTxsLength;
            for await (const tx of blockTxs) {
                if (tx.value.gt(0)) {
                    let txValue = fixedNoRound2(Number(ethers.utils.formatUnits(tx.value, 'ether')));
                    blockTxSendingEth.push({ txHash: tx.hash, from: tx.from, to: tx.to, confirmations: tx.confirmations, txValue, block: block.number })
                    totalTxSendingEth++;
                    blockTotalEthSent += txValue;
                }
            }
            let blockTxSendingEthLength = blockTxSendingEth.length;
            totalValueOfTxSendingEth += blockTotalEthSent;
            blockTotalEthSent = fixedNoRound2(blockTotalEthSent);
            gasBurned = fixedNoRound2(gasBurned);
            latestBlocksFiltered.push({ block: block.number, blockTime, gasBurned, blockTxs, blockTxsLength, blockTxSendingEth, blockTxSendingEthLength, blockTotalEthSent })
        }
        // format results - add commas and fixed decimal space no rounding
        totalTx = totalTx.toLocaleString("en-US");
        totalTxSendingEth = totalTxSendingEth.toLocaleString("en-US");
        totalValueOfTxSendingEth = fixedNoRound2(totalValueOfTxSendingEth);
        totalGasBurned = fixedNoRound2(totalGasBurned).toLocaleString("en-US");;
        let data = { totalGasBurned, totalTx, totalTxSendingEth, totalValueOfTxSendingEth, latestBlocksInfo, latestBlocksFiltered, latestBlock }
        return data
    } catch (err) {
        console.log({ err })
        throw err
    }
}

