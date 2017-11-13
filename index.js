var express = require('express');
var assert = require('assert');
var crypto = require('crypto');
var jwt = require("jsonwebtoken");
var bodyParser = require('body-parser');

var secret = "aditicubecloudInstaBooksAzureApp";

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

app.use(express.static(__dirname + '/code'));

app.set('superSecret',secret);
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

// test function to add user
// var addUser = function(db, callback) {
// 	db.collection('users').insertOne({
// 		"id" : "user0",
// 		"name" : "Aditi",
// 		"passwd_enc" : "bleh",
// 		"followers" : [],
// 		"following" : [],
// 		"posts" : []
// 	}, function(err, result) {
// 		assert.equal(err, null);
// 		console.log('Added user');
// 		console.log(result);
// 		callback();
// 	})
// };


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
		// console.log(req);
		var userName = req.body.username;
		var passwd = crypto.createHash('sha1').update(req.body.password).digest('hex');

		allUsers.find({"user_name" : userName, "password" : passwd}).toArray(function (err, result) {
			if (err)
				res.send({"success" : false, "message" : "Incorrect Request"});
			else if (result.length == 0)
				res.send({"success" : false, "message" : "Incorrect Credentials"});
			else
			{
				// token needed for session maintainance
				var token = jwt.sign(result[0], app.get('superSecret'), {
				});
				res.send({
					"success" : true,
					"token" : token,
					"user_name" : result[0].user_name,
					"profile" : result[0].profile,
					"followers" : result[0].followers,
					"following" : result[0].following,
					"posts" : result[0].posts
				});
			}
		})
	});


	// API for creating new user (get just for now)
	apiRoutes.post('/register', function(req, res) {
		var newUser = {
			"profile" : {
				"dob" : req.body.dob,
				"gender" : req.body.gender,
				"name" : req.body.name,
				"pic_link" : req.body.pic_link
			},
			"user_name" : req.body.user_name,
			"password" : crypto.createHash('sha1').update(req.body.password).digest('hex'),
			"following" : [],
			"followers" : [],
			"posts" : []
		}
		// checking if the user name already exists.
		allUsers.find({"user_name" : req.body.user_name}).toArray(function (err, result) {
			if (err)
				res.send({"success" : false, "message" : "Error processing Request"})
			else if (result.length > 0)
				res.send({"success" : false, "message" : "Email Id already exists"})
			else
			{
				// token needed for session maintainance
				allUsers.insertOne(newUser, function(err, result) {
					if (err)
						res.send({"success" : false, "message" : "Error adding user"})
					else
					{
						var response = {"success" : true, "message" : result}
						var token = jwt.sign(response, app.get('superSecret'), {
						});
						console.log(result);
						response["token"] = token;
						res.send(response);
					}
				})
			}
		})
	});


	// All further APIs need to send a token with them.
	apiRoutes.use(function(req, res, next) {
		// check header or url parameters or post parameters for token
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		// decode token
		if (token)
		{
			// verifies secret and checks exp
			jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
				if (err)
					return res.json({ success: false, message: 'Failed to authenticate token.' });    
				else
				{
					// if everything is good, save to request for use in other routes
					req.decoded = decoded;    
					next();
				}
			});
		}
		else
		{
			// if there is no token, return an error
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		}
	});


	// API for getting a particular user's info.
	apiRoutes.get('/get_user_info', function(req, res) {
		allUsers.find({"user_name" : req.body.user_name}).toArray(function (err, result) {
			if (err)
				res.send({"success" : false, "message" : "Error processing Request"})
			else if (result.length == 0)
				res.send({"success" : false, "message" : "User not found"})
			else
			{
				res.send({"success" : true, 
					"user_name" : result[0].user_name,
					"profile" : result[0].profile,
					"followers" : result[0].followers,
					"following" : result[0].following,
					"posts" : result[0].posts				
				})
			}
		})
	})

	// // API for adding a post
	// apiRoutes.get('/add_post', function(req, res) {
	// 	var new_posts_list = [req.body.new_post].concat(req.body.old_posts)
	// 	allUsers.updateOne(
	// 		{"user_name" : req.body.user_name},
	// 		{
	// 			$set: {"posts" : new_posts_list },
	// 		},
	// 		function (err, result) {
	// 			if (err)
	// 				res.send({"success" : false, "message" : "Error processing Request"})
	// 			else
	// 				res.send({"success" : true, "message" : result, "posts" : new_posts_list})
	// 		}
	// 	)
	// })

	// // API for getting list of all users whom a user is not following
	// apiRoutes.get('/get_user_list', function(req, res) {
		// allUsers.find().toArray()
	// })

	app.use('/api', apiRoutes);

});