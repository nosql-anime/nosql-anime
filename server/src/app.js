const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const DB = require('./db');
const db = new DB();


const app = express();
app.use(bodyParser.json());
app.use(cors());

const fs   = require('fs');
const startUp = async function() {
	await db.init();

	app.get('/', (req, res) => {	
		res.status(200).send('OK');
  });
  
  const bcrypt = require('bcrypt');
  const saltRounds = 10;
  
  app.post('/registration', async (req, res) => {
	  let username = req.body.username;
	  let email = req.body.email;
	  let password = req.body.password;
  
	  if(typeof username === 'string' && typeof email === 'string' && typeof password === 'string'){
  
			let userCollection = db.userCollection();

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
						let response = await userCollection.insertOne({username, 'password': hash, email, 'animelist': []});
						if(response.insertedCount === 1){
							res.status(201).send('Registration successful.');
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
	  } else {
		  res.status(400).send('Unsuccesful registration: Either user name, e-mail or password not provided.');
	}
  });
  
  var jwt = require('jsonwebtoken');
  
  app.post('/login', async (req, res) => {
	  let username = req.body.username;
	  let password = req.body.password;
  

	  if(typeof username === 'string' && typeof password === 'string'){

		let userCollection = db.userCollection();
		let hashByUsername = null;

		try {
			let users = (await userCollection.find({'username': username}).toArray());
			if(users.length === 1)
				hashByUsername = users[0].password;
		} catch (error) {
			res.status(500).send({description: 'An unexpected error occured.', error});
		};

		if(hashByUsername === null){
			res.status(400).send('No such username was found.');
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


	  }
  
  });
  
  app.get('/animes', async (req, res) => {
		let animeCollection = db.animeCollection();
		let q = req.query.q;

		try {
			let animes;
			if(q) {
				animes = await animeCollection.find({name: {'$regex': q, '$options': 'i'}}).toArray();
			} else {
				animes = await animeCollection.find().toArray();
			}
			res.status(200).send(animes);
		} catch (error) {
			console.log(error)
			res.status(500).send({description: 'An unexpected error occured.', error});
		};
});
  
  app.get('/animes/:id', async (req, res) => {
		let id = req.params.id;

		let animeCollection = db.animeCollection();

		try {
			let anime = await animeCollection.find({'_id': db.toObjectID(id)}).toArray();
			if(anime.length === 1){
				res.status(200).send(anime[0]);
			} else {
				throw new Error('No anime with provided id.');
			}
		} catch (error) {
			console.log(error)
			res.status(500).send({description: 'An unexpected error occured.', error});
		};
	});

	app.post('/animes/', async (req, res) => {
		let name = req.body.name;
		let score = req.body.score;

		let animeCollection = db.animeCollection();

		try {
			if(name && score){
				let response = await animeCollection.insertOne({name, score});
				if(response.insertedCount === 1){
					res.status(201).send('Resource created successfully.');
				} else {
					throw new Error('Insertion failed.');
				}
			} else {
				throw new Error('Insertion failed.');			
			}
		} catch (error) {
			console.log(error)
			res.status(500).send({description: 'An unexpected error occured.', error});
		};
	});

	app.delete('/animes/:id', async (req, res) => {
		let id = req.params.id;

		let animeCollection = db.animeCollection();
		try {
				let response = await animeCollection.deleteOne({'_id': db.toObjectID(id)});
				if(response.deletedCount === 1){
					res.status(200).send('Resource deleted successfully.');
				} else {
					throw new Error('No anime with provided id.');
				}
		} catch (error) {
			res.status(500).send({description: 'An unexpected error occured.', error});
		};
	});

	app.post('/users/anime', async (req, res) => {
		let username = req.body.username;
		let aid = req.body.aid;
		let name = req.body.name;
		let score = req.body.score;
		let episode = req.body.episode;
		let completed = req.body.completed;
		let animeObject = {aid, name, score, episode, completed};

		let userCollection = db.userCollection();

		try {
			let user = await userCollection.findOne({username});
			
			//check if anime already is in user's list
			if(user.animelist.find((anime) => anime.aid === aid)){
				let indexOfAnime = user.animelist.findIndex((anime) => anime.aid === aid);
				user.animelist[indexOfAnime] = animeObject;
				let response = await userCollection.updateOne({username}, {'$set': {'animelist': user.animelist}});
				if(response.modifiedCount === 1){
					res.status(200).send('Resource updated successfully.');
				} else {
					throw new Error('Update failed.');
				}
			} else {
				let response = await userCollection.updateOne({username}, {'$push': {'animelist': animeObject}});
				if(response.modifiedCount === 1){
					res.status(200).send('Resource updated successfully.');
				} else {
					throw new Error('Update failed.');
				}
			}
		} catch (error) {
			console.log(error)
			res.status(500).send({description: 'An unexpected error occured.', error});
		};
	});


	app.get('/users/anime/', async (req, res) => {
		let username = req.query.username;
		let completed = req.query.completed;
		let userCollection = db.userCollection();

		if(completed === 'true'){
			try {
				let userList = await userCollection.find({username}).toArray();
				if(userList.length !== 0){
					let completedAnimelist = [];
					let user = userList[0];
					user.animelist.forEach((anime) => {
						if(anime.completed === true){
							completedAnimelist.push(anime);
						}
					});
					res.status(200).send(completedAnimelist);
				} else {
					throw new Error('No user with provided username.');
				}
			} catch (error) {
				console.log(error);
				res.status(500).send({description: 'An unexpected error occured.', error});
			}
		} else if(completed === 'false') {
			try {
				let userList = await userCollection.find({username}).toArray();
				if(userList.length !== 0){
					let user = userList[0];
					let completedAnimelist = [];
					user.animelist.forEach((anime) => {
						if(anime.completed === false)
							completedAnimelist.push(anime);
					});
					res.status(200).send(completedAnimelist);
				}
			} catch (error) {
				console.log(error);
				res.status(500).send({description: 'An unexpected error occured.', error});
			}
		} else {
			try {
				let userList = await userCollection.find({username}).toArray();
				if(userList.length !== 0){
					res.status(200).send(userList[0].animelist);
				}
			} catch (error) {
				console.log(error);
				res.status(500).send({description: 'An unexpected error occured.', error});
			}
		}
	});

	app.listen(process.env.PORT || 8081);
}

startUp();

process.on('exit', () => {
	db.close();
});