const blockchainRoutes = require('../routes/blockchain')

exports.declare = (app) => {
	app.post('/add-transaction', blockchainRoutes.addNewTransaction) 
}