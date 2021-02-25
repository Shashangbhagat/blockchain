const PropTypes = require('../utility/prop-types');


exports.addNewTransaction = (req, res) => {
	try {
		const propTypes = {
			sender: PropTypes.string.isRequired,
			receiver: PropTypes.string.isRequired,
			amount: PropTypes.number.isRequired,
		}
		PropTypes.checkPropTypes(propTypes, req.body, 'prop', 'handleAddTransaction');
		res.json(req.body);
	} catch(e) {
		console.log(e.message);
		res.status(500).json({e})
	}
}  