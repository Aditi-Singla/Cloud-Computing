var express = require('express');
var assert = require('assert');
var crypto = require('crypto');
var jwt = require("jsonwebtoken");

var app = express();

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/code'));

// app.get('/',function(req,res){

//     console.log('hello from server');

//      res.render('./code/index.html');

// });

app.listen(port);

console.log('Server Listening at port '+port);

var mongoClient = require("mongodb").MongoClient;
var objectId = require('mongodb').ObjectID;
var dbUrl = "mongodb://instabooks:jdICID8JtrKnBexeewppyvsCS7OdvMOY7hFbp68j3zRn0Bo6U6cgtksBjR3II5GjEz4cGlqo0KtjbGKlIIrM6w==@instabooks.documents.azure.com:10255/?ssl=true";

var apiRoutes = express.Router();

// API to add user (register)
var addUser = function(db, callback) {
	db.collection('users').insertOne({
		"id" : "user0",
		"name" : "Aditi",
		"passwd_enc" : "bleh",
		"followers" : [],
		"following" : [],
		"posts" : []
	}, function(err, result) {
		assert.equal(err, null);
		console.log('Added user');
		console.log(result);
		callback();
	})
};

// API to login
var authUser = function(db, callback) {
	db.collection('users').find()
};

mongoClient.connect(dbUrl, function(err, db) {
	assert.equal(null, err);
	console.log('assert successful');

	// Collections in DB :
	var allUsers = db.collection('users');

	// APIs :
	app.get('/', function(req, res) {
		res.render('./code/index.html');
	});

	apiRoutes.get('/', function(req, res) {
		res.send({ message: 'Welcome to InstaBooks!' });
	});

	// API for authenticating a user
	apiRoutes.post('/login_user', function(req, res) {
		var userName = req.body.user_name;
		var passwd = crypto.createHash('sha1').update(req.body.password).digest('hex');

		allUsers.find({"user_name" : userName, "password" : passwd}).toArray(function (err, result) {
			if (err)
				res.send({"success" : false, "message" : "Incorrect Request"});
			else if (result.length == 0)
				res.send({"success" : false, "message" : "Incorrect Credentials"});
			else
			{
				var token = jwt.sign(result[0], app.get('superSecret'), {
          			// expiresIn: 86400 // expires in 24 hours
				});

				res.send({
					"success" : true,
					"token" : token,
					"user_name" : result[0].user_name,
					"followers" : result[0].followers,
					"following" : result[0].following,
				})
			}
		})
	})

	// API for creating new user (get just for now)
	apiRoutes.get('/register', function(req, res) {
		var newUser = {
			"user_name" : req.query.user_name,
			"password" : crypto.createHash('sha1').update(req.query.password).digest('hex'),
			"following" : [],
			"followers" : [],
			"posts" : []
		}
		allUsers.insertOne(newUser, function(err, result) {
			assert.equal(err, null);
			console.log(result);
		})

		res.send({"x" : "blah" , "y" : "abc"})
	})



	// addUser(db, function() {
	// 	db.close();
	// 	console.log('DB Closed now!');
	// });
});