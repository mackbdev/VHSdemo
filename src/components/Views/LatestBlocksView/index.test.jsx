import { queryAllByRole, queryByRole, render, screen } from '@testing-library/react';
import LatestBlocksView from './index';
let loadingDashboardData = false;
let blocksData = {
    latestBlocksFiltered: [
        {
            "block": 14562859,
            "blockTime": "4/11/2022, 2:45:44 AM",
            "gasBurned": 0,
            "blockTxs": [],
            "blockTxsLength": 0,
            "blockTxSendingEth": [],
            "blockTxSendingEthLength": 0,
            "blockTotalEthSent": 0
        }, 
        {
            "block": 14562859,
            "blockTime": "4/11/2022, 2:45:44 AM",
            "gasBurned": 0,
            "blockTxs": [],
            "blockTxsLength": 0,
            "blockTxSendingEth": [],
            "blockTxSendingEthLength": 0,
            "blockTotalEthSent": 0
        }
    ]
}
let priceData = { priceString: '100', price: 100 };
let txViewSelect = jest.fn();
let fixedNoRound2 = String;
let props = { loadingDashboardData, blocksData, priceData, txViewSelect, fixedNoRound2 };

describe('Latest Blocks View component', () => {

    it('Checks if block heading is visibile', async () => {
        const { queryAllByRole } = render(<LatestBlocksView props={props} />)
        const allHeadingElements = queryAllByRole('heading');
        let singleBlockHeading = allHeadingElements.find(heading => heading.innerHTML.includes('Block #'))
       expect(singleBlockHeading).toBeVisible()
    })

    it('Counts that the block headings rendered match the length of input data', async () => {
        const { queryAllByRole } = render(<LatestBlocksView props={props} />)
        const allHeadingElements = queryAllByRole('heading');
        let blocksHeading = allHeadingElements.filter(heading => heading.innerHTML.includes('Block #'))
        let blocksHeadingLength = blocksHeading.length;
        let blocksDataLength = blocksData.latestBlocksFiltered.length;
        expect(blocksHeadingLength).toEqual(blocksDataLength)
    })

})
