var express = require('express');
var router = express.Router();
const connectDB = require('../config/database.js');
const fs = require('fs');
const fileUpload = require('express-fileupload');

// database
connectDB();
const Screenshots = require('../models/screenshots');
const Comments = require('../models/comments');
const Users = require('../models/users');

const screenshots_data = JSON.parse(fs.readFileSync("../files/screenshots.json", 'utf8'));
const comments_data = JSON.parse(fs.readFileSync("../files/comments.json", 'utf8')); 
 
// uploads path
const uploadPath = 'upload/'
const path = require('path');
router.use(express.static(path.resolve('./public')));

try {
  Screenshots.deleteMany({}).then(()=>{
    Screenshots.insertMany(screenshots_data['screenshots']);
	console.log("Successfully added Screenshots.");
  });
  Comments.deleteMany({}).then(()=>{
    Comments.insertMany(comments_data['comments']);
		console.log("Successfully added comments.");
  });
    Users.deleteMany({}).then(()=>{
 
		console.log("Successfully deleted Users.");
  });
  
} catch (error) {
  console.log(error);
}


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send("KILL ME NOW! ");
});


// Express route to fetch all screenshot images
router.get('/fetchAllScreenshots', async (req, res) => {
  try {
    const documents = await Screenshots.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching images.' });
  }
});

// Express route to fetch a screenshot given its id
router.get('/fetchScreenshot/:id', async (req, res) => {
    try {
        const documents = await Screenshots.find({id: req.params.id});
        res.json(documents);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching images.' });
      }
});
// Express route to fetch all screenshots of a film
router.get('/fetchScreenshots/film/:film', async (req, res) => {
    try {
        const documents = await Screenshots.find({film: req.params.film});
        res.json(documents);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching images.' });
      }
});
// Express route to fetch all Screenshots given a search term
router.get('/fetchScreenshots/:search', async (req, res) => {
	
    const search_term = req.params.search;
 
	try {
 
    const documents = await Screenshots.find({
		$or: [
			{ title: { $regex: search_term, $options: 'i' } },
			{ film: { $regex: search_term, $options: 'i' } }
		]
	});
		res.json(documents);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching images.' });
    }
});
// Express route to fetch all screenshots with a particular tag
router.get('/fetchScreenshots/tag/:tag', async (req, res) => {
    try {
        const documents = await Screenshots.find({tags: req.params.tag});
        res.json(documents);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching images.' });
      }
});
router.get('/fetchAllTags', async (req, res) => {
    try {
        const documents = await Screenshots.find();
		
		console.log(documents);
		let temp = [];
		const tags = documents.forEach( (screen) => { 
			console.log(screen['tags']);
			console.log("------");
			temp.push.apply(temp, screen['tags']);
		});
		console.log(tags);
		console.log("------");
 		console.log(temp);
		console.log("------");
		uniq_tags = [... new Set(temp)];
		
		let index = uniq_tags.indexOf("");
		if (index !== -1) {
				uniq_tags.splice(index, 1);
		}
		
		console.log(uniq_tags);
        res.json(uniq_tags);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching images.' });
      }
});

// Express route to fetch all comments given a screenshotid 
router.get('/fetchAllComments/screenshot/:id', async (req, res) => {
  try {
    const documents = await Comments.find({screenshotid: req.params.id});
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comments.' });
  }
});

router.post('/upload', async (req, res) => {
	console.log(req.files);
    // Get the file that was set to our field named "image"
    const img = await req.files.image;
    if (!img) { 
		return res.sendStatus(400); 
	}
    img.mv("public/" + uploadPath + img.name);
	const pathtest =  "public/" + uploadPath + img.name;
	console.log(pathtest);
	data = req.body;
	const newid = await Screenshots.countDocuments() + 1;
	console.log("newid: " + newid);
	const flag = 0;
	const fullfilename = uploadPath + img.name;
	let tags = [];
	try {
		const tags_string = data['tags']; 	console.log("tags_string: " + tags_string);
		const tags_upper = tags_string.replace(/\b\w/g, c => c.toUpperCase());console.log("tags_upper: " + tags_upper);
		const tags_array = tags_upper.split(',');console.log("tags_array: " + tags_array);
		if (tags_array.length > 0) {
			tags = Array.from(tags_array);
		} 
	} catch (error) {
		res.status(500).json({error: 'Error creating tags.'});
	}
	const Screenshot = new Screenshots ({
		"id": newid,
		"title": data['title'],
		"film": data['film'],
		"imgsrc": fullfilename,
		"flag": flag,
		"tags": tags,
	});
	console.log(Screenshot.title);
	console.log(Screenshot.film);
	console.log(Screenshot.imgsrc);
		console.log(Screenshot.tags);
    // res.sendStatus(200);
	
	try {
      const savedScreenshot = await Screenshot.save();
      res.json(savedScreenshot);
    } catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error adding image.' });
   }
	
});

//Express route to add comment
router.post('/add_comment',  async (req, res) => {
  data = req.body;
  const documents = await Comments.find().sort( { id: -1 } );
  let new_id = documents[0]['id']+1;

  const comment = new Comments({
		"id": new_id,
		"name": data['name'],
		"screenshotid": data['screenshotid'],
		"comment": data['comment'],
		"comment_date": data['comment_date']
	});

  try {
    const savedComment = await comment.save();
    res.json(savedComment);
  } catch (error) {
		console.log(error);
    res.status(500).json({ error: 'Error adding comment.' });
  }
});

module.exports = router;
