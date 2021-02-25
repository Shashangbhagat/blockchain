const SHA256 = require('crypto-js/sha256')

class CryptoBlock{
  constructor({index, timestamp, data, precedingHash = ''}) {
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.precedingHash = precedingHash;
		this.nonce = 0
		this.proofOfWork(4);
	}

	calculateHash = () => {
		return SHA256(this.index + this.precedingHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
	}

	proofOfWork(difficulty) {
    while (
      !this.hash || this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

module.exports = CryptoBlock;