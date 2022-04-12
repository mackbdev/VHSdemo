# Latest 10 Blocks VHS Demo - Optimized + API

`The branch is the reactRouter branch merged with the expressAPI branch. The API will be consumed using Axios.`

## How To

- After ` npm i ` enter command ` npm run startAll `, the server and frontEnd will start concurrently.

- Server defaults to port 5000, a .env file is needed to provide the websocket provider.
    * Free websocket can be used from the staticVariables.js file in the main branch
    * Available .env variables below

```

SERVERPORT=
PROVIDERWSS=

```

## Endpoints

- GET
    * http://localhost:5000/api/getBlockReward 
    * http://localhost:5000/api/getTxFee/:txHash
    * http://localhost:5000/api/initBlocks/:latestCount
    * http://localhost:5000/api/getLiveDexPrice/:routerContractAddress/:tokenInAddress/:tokenInName/:tokenInDecimals/:tokenOutAddress/:tokenOutName/:tokenOutDecimals

- POST
    * http://localhost:5000/api/getBlocksInfo
    ```
    {
        "arrayOfBlocks": [12458,155452,148521]
    }   
    ```

    * http://localhost:5000/api/getBlockReward
    ```
    {
        "staticBlockReward": 2,
        "blockData": {`a single block of filtered data from initBlocks endpoint`}
    }
    ```

## Tests

- ` npm test ` for React app
- ` npm run serverTest ` for server core functions