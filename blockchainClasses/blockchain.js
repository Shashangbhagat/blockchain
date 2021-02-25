const CryptoBlock = require('./cryptoBlock');

class Blockchain {
  constructor() {
		this.blockchain = [this.startGenesisBlock()];
	}

	startGenesisBlock() {
		new CryptoBlock({index: 0, timestamp: new Date(), data: 'Initial Block', precedingHash: '0'});
	}
	getLatestBlock() {
		this.blockchain[this.blockchain.length-1];
	}

	addNewBlock (newBlock) {
		newBlock.precedingHash = this.getLatestBlock().hash;
		const newCryptoBlock = new CryptoBlock({...newBlock})
		this.blockchain.push(newCryptoBlock);
	}

	checkChainValidity() {
		for (let i = 1; i < this.blockchain.length; i++) {
			const currentBlock = this.blockchain[i];
			const precedingBlock = this.blockchain[i-1];
			if (currentBlock.hash === !currentBlock.calculateHash()) return false;
			if (currentBlock.precedingHash !== precedingBlock.hash) return false;
			return  true;
		}
	}
}

module.exports = Blockchain;