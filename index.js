const Blockchain = require('./BlockchainClasses/blockchain')

const blockchain = new Blockchain()

blockchain.addNewBlock({index: 1, timestamp: new Date(), data: {sender: 'Shashang', receipent: 'Someone', amount: '100'}})
blockchain.addNewBlock({index: 2, timestamp: new Date(), data: {sender: 'Shashang', receipent: 'Someone', amount: '200'}})
blockchain.addNewBlock({index: 3, timestamp: new Date(), data: {sender: 'Shashang', receipent: 'Someone', amount: '300'}})

console.log(JSON.stringify(blockchain, null, 4));