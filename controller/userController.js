const userModel = require('../models/userAuth');
const { createTokens, verifyTokens } = require('../scripts/jwt');
const user = {};

user.userLogin = async function (req, res) {
	try {
		let data = req.body;
		let response = await userModel.login(data);
		// log
		console.log('user login :\n',response)
		if (response.check) {
			const accessTokens = createTokens(response.userData);
			// log
			console.log('User token created:\n',accessTokens)
			return res.status(201).send({ reply: "success", userData: accessTokens })
		}
		else {
			return res.status(401).send({ reply: 'success' })
		}
	} catch (error) {
		console.log('[Controller Error]\n', error)
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

user.authorise = async function (req, res) {
	const decodedToken = verifyTokens(req.body.token)
	try {
		let dbResponse = await userModel.getUser(decodedToken.email)
		if(dbResponse){
			return res.status(201).send({reply:'success',userData:dbResponse})
		}
	}
	catch (error) {
		console.log("\n\nError at user controller:[auth]\n", error.message);
		return res.status(400).send({reply:error});
	}
}

module.exports = user;