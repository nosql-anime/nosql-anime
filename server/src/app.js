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

  let MyError = function(message) {
	this.message = message || 'Default Message';
  };
  MyError.prototype = Object.create(Error.prototype);
  MyError.prototype.constructor = MyError;
  
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
							throw new MyError();
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
					let privateKEY  = fs.readFileSync('./src/key.pem', 'utf-8');
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
		let titleSort = req.query.titleSort;
		let scoreSort = req.query.scoreSort;
		let pageNumber = req.query.p;
		let pageSize = req.query.s;
		let queryObject = {};
		let limit = 0;
		let skip = 0;
		let sortObject = {name: 1};

		try {
			if(q){
				queryObject.name = {'$regex': q, '$options': 'i'};
			}

			if(pageNumber && pageSize){
				limit = parseInt(pageSize);
				skip = parseInt(pageSize) * parseInt(pageNumber);
			}

			if(titleSort === 'asc'){
				sortObject.name = 1;
			} else if (titleSort === 'desc') {
				sortObject.name = -1;
			}

			if (scoreSort === 'desc'){
				sortObject.score = -1;
			}

			let animes = await animeCollection.find(queryObject).limit(limit).skip(skip).sort(sortObject).toArray();

			res.status(200).send({animeCount: animes.length, animes});
		} catch (error) {
			console.log(error)
			res.status(500).send({description: 'An unexpected error occured.', error});
		};
});

app.get('/animes/results', async (req, res) => {
	let animeCollection = db.animeCollection();
	let q = req.query.q;
	let queryObject = {};

	try {
		if(q){
			queryObject.name = {'$regex': q, '$options': 'i'};
		}
		let animeCount = await animeCollection.find(queryObject).count();
		res.status(200).send({animeCount});
	} catch (error) {
		console.log(error)
		res.status(500).send({description: 'An unexpected error occured.', error});
	}
});
  
  app.get('/animes/:id', async (req, res) => {
		let id = req.params.id;

		let animeCollection = db.animeCollection();

		try {
			let anime = await animeCollection.find({'_id': db.toObjectID(id)}).toArray();
			if(anime.length === 1){
				res.status(200).send(anime[0]);
			} else {
				throw new MyError('No anime with provided id.');
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
					throw new MyError('Insertion failed.');
				}
			} else {
				throw new MyError('Insertion failed.');			
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
					throw new MyError('No anime with provided id.');
				}
		} catch (error) {
			res.status(500).send({description: 'An unexpected error occured.', error});
		};
	});

	app.post('/users/animes', async (req, res) => {
		let token = req.headers.authorization;
		let publicKEY  = fs.readFileSync('./src/server.crt', 'utf-8').toString();
		let aid = req.body.aid;
		let name = req.body.name;
		let score = req.body.score;
		let currentEpisode = req.body.currentEpisode;
		let episodes = req.body.episodes;
		let completed = req.body.completed;
		let animeObject = {aid, name, score, currentEpisode, episodes, completed};
		
		let userCollection = db.userCollection();
		let animeCollection = db.animeCollection();
		
		try {
			let username = (jwt.verify(token, publicKEY, {algorithms: ['RS256']})).username;
			let user = await userCollection.findOne({username});

			console.log(user)
			
			//check if anime already is in user's list
			if(user.animelist.find((anime) => anime.aid === aid)){
				let indexOfAnime = user.animelist.findIndex((anime) => anime.aid === aid);
				// get anime from list
				let previousScore = user.animelist[indexOfAnime].score;
				
				user.animelist[indexOfAnime] = animeObject;

				let response = await userCollection.updateOne({username}, {'$set': {'animelist': user.animelist}});
				if(response.modifiedCount === 1){
					let foundAnimeList = await animeCollection.find({_id: db.toObjectID(aid)}).toArray();
					
					if(foundAnimeList.length === 1){
						let animeToUpdate = foundAnimeList[0];
						// calculate new score for anime
						animeToUpdate.sum -= previousScore;
						animeToUpdate.sum += animeObject.score;
						animeToUpdate.score = animeToUpdate.sum / animeToUpdate.votes;

						let replacement = await animeCollection.replaceOne({_id: animeToUpdate._id}, animeToUpdate);
						if(replacement.modifiedCount === 1){
							res.status(200).send('Resource updated successfully.');
						} else {
							throw new MyError('Update of anime database failed.')
						}
					} else {
						throw new MyError('Query failed.');						
					}
				} else {
					throw new MyError('Update of user\'s list failed.');
				}
			} else {
				let updateResponse = await userCollection.updateOne({username}, {'$push': {'animelist': animeObject}});
				if(updateResponse.modifiedCount === 1){
					let foundAnimeList = await animeCollection.find({_id: db.toObjectID(aid)}).toArray();
					
					if(foundAnimeList.length === 1){
						let animeToUpdate = foundAnimeList[0];
						// calculate new score for anime
						animeToUpdate.sum += animeObject.score;
						animeToUpdate.votes++;
						animeToUpdate.score = animeToUpdate.sum / animeToUpdate.votes;

						let replacement = await animeCollection.replaceOne({_id: animeToUpdate._id}, animeToUpdate);
						if(replacement.modifiedCount === 1){
							res.status(200).send('Resource created successfully.');
						} else {
							throw new MyError('Update of anime database failed.')
						}

					} else {
						throw new MyError('Query failed.');						
					}
				} else {
					throw new MyError('Update of user\'s list failed.');
				}
			}
		} catch (error) {
			console.log(error)
			res.status(500).send({description: 'An unexpected error occured.', error});
		};
	});


	app.get('/users/animes/', async (req, res) => {
		let completed = req.query.completed;
		let userCollection = db.userCollection();
		let token = req.headers.authorization;
		let publicKEY  = fs.readFileSync('./src/server.crt', 'utf-8').toString();
		
		
		if(completed === 'true'){
			try {
				let username = (jwt.verify(token, publicKEY, {algorithms: ['RS256']})).username;
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
					throw new MyError('No user with provided username.');
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

	app.delete('/users/animes/', async (req, res) => {
		let aid = req.body.aid;
		let token = req.headers.authorization;
		let publicKEY  = fs.readFileSync('./src/server.crt', 'utf-8').toString();
		let userCollection = db.userCollection();
		let animeCollection = db.animeCollection();
		
		try {
			let username = (jwt.verify(token, publicKEY, {algorithms: ['RS256']})).username;
			let user = await userCollection.findOne({username});
			
			if(user.animelist.length !== 0){
				let indexToRemove = user.animelist.findIndex((anime) => {
					return anime.aid === aid;
				});
				let previousScore = user.animelist[indexToRemove].score;

				user.animelist.splice(indexToRemove, 1);

				let deletion = await userCollection.updateOne({username}, {'$set': {animelist: user.animelist}});

				if(deletion.modifiedCount === 1){
					let animeToUpdate = await animeCollection.findOne({_id: db.toObjectID(aid)});
					if(animeToUpdate){
						animeToUpdate.votes--;
						animeToUpdate.sum -= previousScore;
						animeToUpdate.score = animeToUpdate.sum / animeToUpdate.votes;

						// fix division by 0
						if(isNaN(animeToUpdate.score))
							animeToUpdate.score = 0;

						let replacement = await animeCollection.replaceOne({_id: animeToUpdate._id}, animeToUpdate);

						if(replacement.modifiedCount === 1){
							res.status(200).send('Resource updated successfully.');
						} else {
							throw new MyError('Update of anime database failed.');
						}

					} else {
						throw new MyError('Query unsuccessful.');
					}

				} else {
					throw new MyError('Deletion unsuccessful.');
				}
		}

		} catch (error) {
			console.log(error);
			res.status(500).send({description: 'An unexpected error occured.', error})
		}


	});

	app.listen(process.env.PORT || 8081);
}

startUp();

process.on('exit', () => {
	db.close();
});