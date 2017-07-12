const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
//const config = require('../config/database');

const User = require('../models/user');

/*


router.post('/register', (req, res, next) => {
  let newUser = new User({
	username: req.body.username,
	password: req.body.password
  });

  console.log("entering user register route in Node with user :" + newUser);

  User.getUserByUsername(newUser.username, (err, user) => {
    console.log("returned from database request to check username duplication");
	if(err) throw err;
    if(user) {
		return res.json({success: false, msg: 'Username already registered'});
	}

	User.addUser(newUser, (err, user) => {
      if(err) {
        res.json({success: false, msg: 'Failed to register user'});
      } else {
	    res.json({success: true, msg: 'User registered'});
		console.log("success...new user added.");
	  }
	});
  });
});

router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log("authenticating login in Node for:" + username);

  User.getUserByUsername(username, (err, user) => {
    console.log("returned from database request to look up user by name for login");
	if(err) throw err;
	if(!user) {
  	  return res.json({success: false, msg: 'User not found'});
	}
		
	User.comparePassword(password, user.password, (err, isMatch) => { 

	  console.log("returning from password check...set up session token");
			
	  if (err) throw err;
			
	  if(isMatch) {
	    console.log('Entering isMatch');
		const token = jwt.sign(user, config.secret, {
		  expiresIn: 604800 //1 week
		});

		res.json({
		  success: true,
		  token: 'JWT ' + token,
		  user: {
		    id: user._id,
			username: user.username,
		  }
		});

		console.log("returning to front end");

	  } else {
  	    return res.json({success: false, msg: 'Wrong password'});
	  }
    });
  });
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  console.log("returning profile to client");
  res.json({user: req.user});
});

module.exports = router;

*/