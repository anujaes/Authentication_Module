const userModel = require('../models/userAuth');

const user = {};

user.userLogin = async function (req, res) {
	try {
		let data = req.body;
		let loginResponse = await userModel.userLogin(data);
		if (loginResponse) {
			if (loginResponse.message === 'password-success')
				return res.status(201).json({ message: "success" })
			if (loginResponse.message === 'password-failure')
				return (res.json({ error: "Invalid Credentials" }));
		}
		else {
			console.log("Error Occured");
		}
	} catch (error) {
		console.log(error)
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