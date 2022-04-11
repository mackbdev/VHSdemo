# Latest 10 Blocks VHS Demo - Express API

`Created an api to serve the data from the coreFunctions used in the main branch.`

`Standalone it is *not* connected to the React app.`

## How To

- Server defaults to port 5000, a .env file is needed to provide the websocket provider.
    * In the server run ` npm i ` to install then ` npm start ` to run
    * Free websocket can be used from the staticVariables.js file in the main branch
    * Available .env variables below


```

PORT=
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

    

