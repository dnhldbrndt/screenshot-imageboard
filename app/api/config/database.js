const mongoose = require('mongoose');
const mongoURI = "mongodb://mongo_db:27017/";


const connectDB = async () => {  
	try {
		await mongoose.connect(mongoURI).then(() => {
		  console.log("Successfully connected.");
		}).catch((e) => {
		  console.log("Not connected.");
		}); 
		
	} catch (error) { 
		console.log(error);
	}	
}; 

module.exports = connectDB;