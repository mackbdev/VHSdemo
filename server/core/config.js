'use strict';
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
	SERVERPORT,
	PROVIDERWSS
} = process.env;

// removed assertion so port can set to default
//assert(PORT, 'Port is required!');
assert(PROVIDERWSS, 'Websocket provider is required!');

module.exports = {
	port: SERVERPORT,
	providerWSS: PROVIDERWSS
}