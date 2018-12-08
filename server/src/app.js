const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const assert = require('assert');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'anime';
const client = new MongoClient(url, {useNewUrlParser: true});



app.get('/', (req, res) => {

/* 	client.connect(async function(err, client) {
		console.log("Connected correctly to server");
		const db = client.db(dbName);
	
		let userCollection = db.collection('users');

		try {
			let users = await userCollection.find().limit(1).toArray();
			client.close();
			res.send('sinep\n' + users[0]._id);
		} catch (error) {	
			client.close();
			res.send('sinep');
		};
	
	  }); */

	  res.status(200).send('OK');

});

const bcrypt = require('bcrypt');
const saltRounds = 10;

app.post('/registration', (req, res) => {
	let username = req.query.username;
	let email = req.query.email;
	let password = req.query.password;

	if(typeof username === 'string' && typeof email === 'string' && typeof password === 'string'){

		client.connect(async function(err, client) {
			console.log("Connected correctly to server");
			const db = client.db(dbName);

			let userCollection = db.collection('users');
	
			let isNameTaken = null;
			let isMailTaken = null;

			try {
				isNameTaken = (await userCollection.find({'username': username}).toArray()).length === 0;
				isMailTaken = (await userCollection.find({'email': email}).toArray()).length === 0;
			} catch (error) {	
				res.status(500).send({description: 'An unexpected error occured.', error: error});
			};
				if(isNameTaken && isMailTaken){
					// registerable
					try {
						bcrypt.hash(password, saltRounds, async function(err, hash) {
							let response = await userCollection.insertOne({'username': username, 'password': hash, 'email': email});
							if(response.insertedCount === 1){
								res.status(200).send('Registration succesful.');
							} else {
								throw new Error();
							}
						});
					} catch (error) {
						res.status(500).send({description: 'An unexpected error occured.', error: error});
					}

				} else if(!isNameTaken || !isMailTaken){
					// name/mail already registered
					res.status(409).send({description: 'User name or email already exists.',
											nameExists: isNameTaken,
											mailExists: isMailTaken
										});
				}
		  });
	} else {
		res.status(400).send('Unsuccesful registration: Either user name, e-mail or password not provided.');
  }
});

app.post('/login', (req, res) => {
	
});

app.get('/anime/getall', (req, res) => {

});

app.get('/anime/getanimebyid', (req, res) => {

});

app.listen(process.env.PORT || 8081);