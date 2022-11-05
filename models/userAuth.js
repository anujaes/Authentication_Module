const userSchema	= require('../schema/userSchema');
const bcrypt		= require('bcryptjs');

const mongo = {};
mongo.userLogin = async function(data){
	try{
		const { email, password } = data;
		const response = await userSchema.findOne({ email: email });
		if (response) {
			const doc = await bcrypt.compare(password, response.password);
			return doc;
		}else{
			return response;
		}
	}
	catch(error){
		console.error("Models error:\n",error);
	}
}

mongo.create = async function(data){
		const document = {}
		document.firstName	= data.fname;
		document.lastName 	= data.lname;
		document.email 		= data.email;
		document.password 	= data.password;

		// registering new user data
		const userDoc = userSchema(document);
		const doc = await userDoc.save();
		return doc;
}

module.exports = mongo;
