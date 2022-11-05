const mongoose = require ('mongoose');
const dotenv   = require('dotenv')
let db         = mongoose.connection;

dotenv.config({path:'./config.env'})

const DBConnection  = process.env.DATABASE;

function init () {
	return new Promise ((resolve, reject) => {
		// mongoose.set('debug', true); // enable to show the mongo queries fired
		mongoose.connect (DBConnection,
			{
				autoIndex: true,
				useNewUrlParser: true,
				useUnifiedTopology: true
			});

		db.on ('error', (err) => {
			console.log('Connection with mongodb failed', { err });
			return reject (err);
		});

		db.once ('open', () => {
			console.log('Connection with mongodb successfully established.');
			return resolve ();
		});

		db.on ('disconnected', function () {
			console.log('Disconnected from mongodb.');
		});

		db.on ('connected', function () {
			console.log('Connect to mongodb ok');
		});
	});
}

module.exports = {
	init : init,
	// db   : db
};