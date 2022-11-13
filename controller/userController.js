const userModel 		= require('../models/userAuth');
// const { createTokens } 	= require('../scripts/JWT');
const user = {};

user.userLogin = async function (req, res) {
	try {
		let data = req.body;
		let response = await userModel.login(data);
		if (response.check) {
			// const accessTokens = createTokens(response.userData); //TODO
			return res.status(201).send({ reply: "success",userData:response.userData })
		}
		else {
			return res.status(401).send({ reply: 'success' })
		}
	} catch (error) {
		console.log('[Controller Error]\n',error)
		return res.status(500).send({ reply: error });
	}
}

user.createUser = async function (req, res) {
	let data = req.body;
	try {
		let dbResponse = await userModel.create(data);

		if (dbResponse)
			return res.status(201).send({ reply: 'success' });

	}
	catch (error) {
		console.log("\n\nError: at user controller\n", error.message);
		let code = error.code === 11000 ? 409 : 500;
		return res.status(code).send(error);
	}
}

module.exports = user;