var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const saltRounds = 10;
const connectDB = require('../config/database.js');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const session = require('express-session')

// database
connectDB();
const Screenshots = require('../models/screenshots');
const Comments = require('../models/comments');
const Users = require('../models/users');
const Blacklist = require('../models/blacklist');


async function register(user, password) {
	console.log("password: " + password);
    const hash = await bcrypt.hash(password, saltRounds);
	console.log("hash: " + hash);
    const User = new Users({
		"name": user,
		"password": hash
	});
    
    // save user
    await User.save();
	
	return User;
}

async function authenticate(user, password ) {
    // get account from database
    const User = await Users.findOne({ name: user });

    // check account found and verify password
    if (!User || !bcrypt.compareSync(password, User.password)) {
        // authentication failed
        return false;
    } else {
        // authentication successful
        return true;
    }
} 


// 
router.get('/', function(req, res, next) {
    res.send("No one here but us trees.");
});

// Logout
router.get ('/logout', function(req,res,next) {
	const accessToken = req.session.authorization['accessToken'];
	const newBlackList = Blacklist ( {token: accessToken} );
	newBlackList.save();
 
	delete req.session.authorization.accessToken;
	return res.status(205).json({message: "Logged out." });
});

// Login 
router.post('/login', async (req, res) => { 

  const username = req.body.username;
  console.log("USER: " + username);
  const password = req.body.password;
  console.log("PASS: " + password);
  const authen = await authenticate(username, password);
 
  if (!authen) {
    return res.status(401).json({message: "Error logging in."});
  } else {
    let accessToken = jwt.sign({ username }, 'access', { expiresIn: '1h' });

    req.session.authorization = {
        accessToken,
        username
    };
	return res.status(200).json({message: "Authenticated.", token: accessToken, username: username});
  }
});

// Register
router.post('/user/create', async (req, res) => {
	const user = req.body.usernamesignup;
	console.log("USER: " + user);
	const password = req.body.passwordsignup;
	console.log("PASS: " + password);
	const User = await register(user, password);
	if (!User) {
		res.status(500).json({ error: 'Error adding user.' });
		
	} else {
		res.json(User);
	}
});

// Test mod
router.get('/auth/test',  async (req, res) => {
	res.send("You're in.");
});
// Fetch users
router.get('/auth/fetchUsers',  async (req, res) => {
  try {
    const documents = await Users.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users.' });
  }
});
// Delete screenshot post
router.delete('/auth/:id',  async (req, res) => {
	const screenshotid = await req.params.id;
	console.log(screenshotid);
	try {
		await Screenshots.find({id: screenshotid}).deleteOne({id: screenshotid}).exec();
		console.log ("Succesfully deleted.");
		res.status(200).json({ message: 'Successfully deleted.' });
	} catch (error) { 
		console.log (error);
		res.status(500).json({ error: 'Error deleting screenshot.' });
	}
});
// Delete user 
router.delete('/auth/user/:id',  async (req, res) => {
	const userid = await req.params.id;
	console.log(userid);
	try {
		await Users.find({id: userid}).deleteOne({id: userid}).exec();
		console.log ("Succesfully deleted.");
		res.status(200).json({ message: 'Successfully deleted.' });
	} catch (error) { 
		console.log (error);
		res.status(500).json({ error: 'Error deleting user.' });
	}
});
// Edit screenshot post
router.put('/auth/:id',  async (req, res) => {
	const screenshotid = await req.params.id;
	console.log(screenshotid);
	const data = req.body;
 
	try {
		await Screenshots.findOneAndUpdate(
			{ id: screenshotid },
			{ $set: { tags: data.tags, title: data.title, film: data.film } },
			{ new: true }
		);
		console.log ("Succesfully updated.");
		res.status(200).json({ message: 'Successfully updated.' });
	} catch (error) {
		console.log (error);
		res.status(500).json({ error: 'Error updating screenshot.' });
	}
});
// Fetch all screenshot posts that have been flagged
router.get('/auth/fetchAllFlagged', async (req, res) => {
  try {
    const documents = await Screenshots.find({flag: true});
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching images.' });
  }
});
// Remove flag 
router.put('/auth/flag/:id',  async (req, res) => {
	const screenshotid = await req.params.id;
	console.log(screenshotid);
 
	try {
		await Screenshots.findOneAndUpdate(
			{ id: screenshotid },
			{ $set: { flag: false } }
		);
		console.log ("Succesfully updated.");
		res.status(200).json({ message: 'Successfully updated.' });
	} catch (error) {
		console.log (error);
		res.status(500).json({ error: 'Error updating flag.' });
	}
});
// Delete comment 
router.delete('/auth/comment/:id',  async (req, res) => {
	const commentid = await req.params.id;
	console.log(commentid);
	try {
		await Comments.find({id: commentid}).deleteOne({id: commentid}).exec();
		console.log ("Succesfully deleted.");
		res.status(200).json({ message: 'Successfully deleted.' });
	} catch (error) { 
		console.log (error);
		res.status(500).json({ error: 'Error deleting comment.' });
	}
});

module.exports = router;