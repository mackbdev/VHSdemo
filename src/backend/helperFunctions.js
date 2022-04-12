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


