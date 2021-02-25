const CryptoBlock = require('./cryptoBlock');

class Blockchain {
  constructor() {
		this.blockchain = [this.startGenesisBlock()];
	}

	startGenesisBlock = () => new CryptoBlock({index: 0, timestamp: new Date(), data: 'Initial Block', precedingHash: '0'});

	getLatestBlock = () => this.blockchain[this.blockchain.length-1];

	addNewBlock = (newBlock) => {
		newBlock.precedingHash = this.getLatestBlock().hash;
		const newCryptoBlock = new CryptoBlock({...newBlock})
		this.blockchain.push(newCryptoBlock);
	} 
}

module.exports = Blockchain;