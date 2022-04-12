const coreFunctions = require("../core/coreFunctions");
const HttpError = require("../models/http-error");
const config = require('../core/config');
const providerWSS = config.providerWSS;
const db = {};

const hello = async (req, res, next) => {
	res.set('Cache-Control', 'public, max-age=300, s-maxage=60');
	res.json({ message: 'Hello there!' });
}

const redeem = async (req, res, next) => {
	try {
		let userID = Number(req.params.userID);
		let wallet = req.params.wallet;
		if (wallet.toString().length < 42) throw "Invalid wallet!"
		if (userID.toString().length < 6 || typeof userID != 'number') throw "Invalid user!"
		const docRefStats = db.collection('users').doc(`${userID}`);
		let dataStats = await docRefStats.get();
		let data = dataStats.data();
		try {
			userID = data.userID;
			//console.log({userID})
			if (userID == undefined) { throw 'undefined user' };
			let resRedeemList = db.collection('redeem').doc(`${userID}`);
			//let resRedeemListRef = await resRedeemList.get();
			//if(isWalletSet == true){throw 'wallet'};
			let sitRewards = data.sitRewards;
			let redeemData = { userID, sitRewards, walletSet: true, wallet };
			await resRedeemList.set(redeemData)
			res.json({ status: true, message: 'Wallet set!', redeemData });
		} catch (err) {
			console.log(err)
			res.json({ status: false, message: err.msg, userID });
			//res.json({message: 'Wallet set!',userID});
		}

	} catch (err) {
		const error = new HttpError(
			err,
			500
		);
		return next(error);
	}
}

const getVanity = async (req, res, next) => {
	try {
		let input = req.params.input;
		input = JSON.parse(input)
		stringInput = input[0]
		firstCount = Number(input[1])
		lastCount = Number(input[2])
		let result = coreFunctions.getVanity(stringInput, firstCount, lastCount)
		//let result = 'test'
		res.set('Cache-Control', 'public, max-age=60, s-maxage=60');
		res.json({ message: 'Got vanity!', result });
	} catch (err) {
		const error = new HttpError(
			err,
			500
		);
		return next(error);
	}
}

const getTxFee = async (req, res, next) => {
	try {
		let txHash = req.params.txHash;
		let result = await coreFunctions.getTxFee(providerWSS, txHash);
		res.set('Cache-Control', 'public, max-age=60, s-maxage=60');
		res.json({ message: 'Got TX Fee!', result });
	} catch (err) {
		const error = new HttpError(
			err,
			500
		);
		return next(error);
	}
}

const getLatestBlock = async (req, res, next) => {
	try {
		let result = await coreFunctions.getLatestBlock(providerWSS);
		res.set('Cache-Control', 'public, max-age=60, s-maxage=60');
		res.json({ message: 'Got latest block!', result });
	} catch (err) {
		const error = new HttpError(
			err,
			500
		);
		return next(error);
	}
}

const getLiveDexPrice = async (req, res, next) => {
	try {
		let routerContract = req.params.routerContract;
		let tokenInAddress = req.params.tokenInAddress;
		let tokenInName = req.params.tokenInName;
		let tokenInDecimals = Number(req.params.tokenInDecimals);
		let tokenOutAddress = req.params.tokenOutAddress;
		let tokenOutName = req.params.tokenOutName;
		let tokenOutDecimals = Number(req.params.tokenOutDecimals);
		let result = await coreFunctions.getLiveDexPrice(providerWSS, routerContract, [tokenOutAddress, tokenInAddress], { tokenName: tokenInName, tokenDecimals: tokenInDecimals }, { tokenName: tokenOutName, tokenDecimals: tokenOutDecimals })
		res.set('Cache-Control', 'public, max-age=60, s-maxage=60');
		res.json({ message: 'Got Dex Price!', result });
	} catch (err) {
		const error = new HttpError(
			err,
			500
		);
		return next(error);
	}
}

const initBlocks = async (req, res, next) => {
	try {
		let latestCount = Number(req.params.latestCount);
		let result = await coreFunctions.initBlocks(providerWSS, latestCount);
		res.set('Cache-Control', 'public, max-age=60, s-maxage=60');
		res.json({ message: 'Got initial blocks!', result });
	} catch (err) {
		const error = new HttpError(
			err,
			500
		);
		return next(error);
	}
}

const getBlocksInfo = async (req, res, next) => {
	try {
		let arrayOfBlocks = req.body.arrayOfBlocks;
		let result = await coreFunctions.getBlocksInfo(providerWSS, arrayOfBlocks);
		//let result = 'test'
		res.set('Cache-Control', 'public, max-age=60, s-maxage=60');
		res.json({ message: 'Got blocks info!', result });
	} catch (err) {
		const error = new HttpError(
			err,
			500
		);
		return next(error);
	}
}

const getBlockReward = async (req, res, next) => {
	try {
		let staticBlockReward = req.body.staticBlockReward;
		let blockData = req.body.blockData;
		let blockDataLength = blockData.blockTxsLength;
		if(blockDataLength > 100) throw 'Try a block with less than 100 TXs'
		let result = await coreFunctions.getBlockReward(providerWSS, blockData, staticBlockReward);
		//let result = 'test'
		res.set('Cache-Control', 'public, max-age=60, s-maxage=60');
		res.json({ message: 'Got block reward!', result });
	} catch (err) {
		const error = new HttpError(
			err,
			500
		);
		return next(error);
	}
}

exports.hello = hello;
exports.redeem = redeem;
exports.getTxFee = getTxFee;
exports.getVanity = getVanity;
exports.initBlocks = initBlocks;
exports.getBlocksInfo = getBlocksInfo;
exports.getLatestBlock = getLatestBlock;
exports.getBlockReward = getBlockReward;
exports.getLiveDexPrice = getLiveDexPrice;