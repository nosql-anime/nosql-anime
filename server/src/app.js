const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const fs   = require('fs');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const userDB = 'anime';
const client = new MongoClient(url, {useNewUrlParser: true});


app.get('/', (req, res) => {	
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
			const db = client.db(userDB);

			let userCollection = db.collection('users');
	
			let isNameTaken = null;
			let isMailTaken = null;

			try {
				isNameTaken = (await userCollection.find({'username': username}).toArray()).length === 0;
				isMailTaken = (await userCollection.find({'email': email}).toArray()).length === 0;
			} catch (error) {	
				res.status(500).send({description: 'An unexpected error occured.', error});
			};
				if(isNameTaken && isMailTaken){
					// registerable
					try {
						bcrypt.hash(password, saltRounds, async function(err, hash) {
							let response = await userCollection.insertOne({username, 'password': hash, email});
							if(response.insertedCount === 1){
								res.status(201).send('Registration succesful.');
							} else {
								throw new Error();
							}
						});
					} catch (error) {
						res.status(500).send({description: 'An unexpected error occured.', error});
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

var jwt = require('jsonwebtoken');



app.post('/login', (req, res) => {
	let username = req.query.username;
	let password = req.query.password;

	if(typeof username === 'string' && typeof password === 'string'){
		
		client.connect(async function(err, client) {
			console.log("Connected correctly to server");
			const db = client.db(userDB);

			let userCollection = db.collection('users');

			let hashByUsername = null;

			try {
				let user = (await userCollection.find({'username': username}).toArray())[0];
				if(user !== undefined)
					hashByUsername = user.password;
			} catch (error) {
				res.status(500).send({description: 'An unexpected error occured.', error});
			};

			if(hashByUsername === null){
				res.status(400).send('No such username was found.');
				return;
			} else {
				try {
					let isValid = await bcrypt.compare(password, hashByUsername);
					if(isValid){
						let payload = { username };
						let privateKEY  = fs.readFileSync('./src/key');
						let publicKEY  = fs.readFileSync('./src/key.pub');
						let signOptions = {
							expiresIn: '24h',
							algorithm:  'RS256'
						};
	
						let token = jwt.sign(payload, privateKEY, signOptions);

						res.status(200).send({expires: (new Date()).getTime() + 1000*60*60*24,'access-token': token});
					} else {
						res.status(401).send('Unauthorized.')
					}
				} catch (error) {
					console.error(error)
					res.status(500).send({description: 'Some shit was fkd up fam.', error: error});
				}

			}

		});

	}

});

app.get('/anime/getall', (req, res) => {
	//JSON.stringify

	client.connect(async function(err, client) {
		console.log("Connected correctly to server");
		const db = client.db(userDB);
		let animeCollection = db.collection('animes');

		try {
			let animes = await animeCollection.find().toArray();
			res.status(200).send(animes);
		} catch (error) {
			console.log(error)
			res.status(500).send({description: 'An unexpected error occured.', error});
		};

	});
});

app.get('/anime/getanimebyid', (req, res) => {

});

app.listen(process.env.PORT || 8081);