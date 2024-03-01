require('dotenv').config();
const { PRIVATE_KEY } = process.env;
const { Web3 } = require('web3');
// const { signTransaction } = require('web3-eth');
const api_key = process.env['API_KEY'];
const network = 'matic';

const node = `https://go.getblock.io/${api_key}/`;
console.log(node);
const web3 = new Web3(node);

// console.log(web3);

const accountto = web3.eth.accounts.create();

// console.log('The new account info is ==> ', accountto);
// console.log('The new account address is ==> ', accountto.address);

const privateKey = [`0x${PRIVATE_KEY}`];
console.log(privateKey);
const accountform = web3.eth.accounts.privateKeyToAccount(
  'add you private key'
);
// console.log('Account form ==> ', accountform);
const createSignedTx = async (rawTx) => {
  //   rawTx.gas = await web3.eth.estimateGas(rawTx);
  //   return await accountform.signTransaction(rawTx);
  rawTx.gas = await web3.eth.estimateGas(rawTx);
  rawTx.from = accountform.address; // Add the 'from' address to the raw transaction
  rawTx.gasPrice = await web3.eth.getGasPrice();
  return await accountform.signTransaction(rawTx);
};
const sendSignedTx = async (signedTx) => {
  web3.eth.sendSignedTransaction(signedTx.rawTransaction).then(console.log);
};
const amountto = '0.01';
const rawtx = {
  to: accountto.address,
  value: web3.utils.toWei(amountto, 'ether'),
};
createSignedTx(rawtx).then(sendSignedTx);
