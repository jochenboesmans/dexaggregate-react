/**
 * Connection to Infura node.
 * Will be used, among others, to fetch token supplies from Ethereum blockchain.
 */

const Web3lib = require('web3');
const {infura} = require("../config/");

const web3 = new Web3lib(new Web3lib.providers.WebsocketProvider(`wss://${infura.endpoint}${infura.projectID}`));


