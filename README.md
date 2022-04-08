# Latest 10 Blocks VHS Demo

This project was created with [Create React App](https://github.com/facebook/create-react-app).

This project loads & displays the 10 most recent blocks\
from the ethereum chain and displays curated data.

## Key Features

- Fully decentralized using any ethereum rpc websocket, the goal was to use no 3rd party APIs.

- Displays live price of eth using the usdc pair on uniswap.

- From the 10 most recent blocks there is a total of all the transactions present and their value in addition the total gas burned for the 10 blocks. The displayed amount is multiplied against the price of eth pulled for an estimated USD value.

- Blocks are displayed with: 
    * Block Number
    * Timestamp
    * Total transactions
    * Total transactions sending only ETH
    * Total amount of ETH sent & total gas burned

- Clicking on a block displays the transactions present in that block with details such as:
    * Transaction hash
    * Sender & Receiver
    * Confirmations, 
    * Total ETH sent
    * Clicking various details will route to more information on Etherscan

## Bonus Features

- Live updates of the blocks in real time accompanied by a toast notifications

- The mining rewards for a given block can be seen by clicking on the interactive located above transaction view of a given block.
    * There is a good chance of rate limiting due to the live updates and calculations of block rewards if attempted to view.
    * This is unique because all the transactions of a block have to be queried for their transaction receipt in order to get the amount of gas paid by all transactions.
    * The formula for reward of a given block is the current static miner payout of 2 ETH + Gasfees paid - Gasfees burned + a portion of the uncle block if any are present. 
    * Due to the fact uncle blocks cannot be queried in real time the number displayed excludes the uncle block values.

- A toggle was added to either disable notifications that allows current blocks displayed to remain for browsing.
    * Individual toggles for notifications and dashboard updates were added to customize realtime delivery.

- Connecting/Logging in will store all blocks viewed by that user. A view was created to see the blocks you have visited/inspected (Click on My Blocks in the nav once logged in).

- Metamask was implemented with user experiences like persistent login amongst page reloads & tracking account change.
    * WalletConnect intergrated for users who do not have Metamask.

## Folders
```
/jtest
/src
/public
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test in the /jtest folder`

Launches a jest test for the core functions used to gather data in the React app.
Must run npm i to install the jest package in this directory.
I do not have much experience testing React Apps, I left a basic App.test.js file in the /src folder test.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

Your app is ready to be deployed!

## Issues/Fixes Needed

- Latest version of create-react-app and web3 caused some time costly issues during development. I was able to find an open issue on GitHub in regards to this. The solution involves reconfiguring webpack using react-app-rewired as seen on the know issues located on this page [ChainSafe Github](https://github.com/ChainSafe/web3.js)\
(./config-overrides.js contains the configs for react-app-rewired & ./src/polyfill.js was added for Buffer)

- Listening to blocks updates in dev mode can cause rate limiting due to the fact that every hot reload spins up a new websocket connection, must manually close.

- Connection to websocket can fail due to rate limiting , ideally it would be best to have multiple websocket sources for load balancing or a paid provider :)

- Issue calculating total eth sent of latest 10 block in USD, didn't notice it as much, happens when the total eth sent for the past 10 blocks is more than 1000 eth. Need to spend more time troubleshooting.

- Transactions in the blocks are stored locally so the information like confirmations is not accurate/realtime during display.

- When a block reward is queried (bonus feature) all live updates are temporarily disabled.\
limited to querying one block reward at a time and the block chosen has been restricted to 100tx minimum.
    * Really slow, takes about (1 sec * number of TXs in block)
    * The rate limit kicks in if there are around 250+ txs in a block (free websocket endpoint type problems)

## Advanced Configuration

- Free ethereum websocket endpoint provided, but you can have a better experience with a paid endpoint.
    * Configurations to endpoint can be made in ./src/backend/staticVariables.js

## Deployment
- Optionally this application can be served locally by installing the Serve package globally and running\
`serve ./build`