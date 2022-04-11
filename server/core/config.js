'use strict';
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
	PORT,
	PROVIDERWSS
} = process.env;

assert(PORT, 'Port is required!');
assert(PROVIDERWSS, 'Websocket provider is required!');

module.exports = {
	port: PORT,
	providerWSS: PROVIDERWSS
}