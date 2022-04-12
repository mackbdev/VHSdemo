const express = require("express");
const mainController = require("../controller/main-controller");

const router = express.Router();

router.post('/getBlocksInfo', mainController.getBlocksInfo);
router.post('/getBlockReward', mainController.getBlockReward);
router.get('/initBlocks/:latestCount', mainController.initBlocks);
router.get('/getTxFee/:txHash', mainController.getTxFee);
router.get('/getVanity/:input', mainController.getVanity);
router.get('/getLiveDexPrice/:routerContract/:tokenInAddress/:tokenInName/:tokenInDecimals/:tokenOutAddress/:tokenOutName/:tokenOutDecimals', mainController.getLiveDexPrice);
router.get('/getLatestBlock', mainController.getLatestBlock);
router.get('/hello', mainController.hello);

module.exports = router;