const mongoose = require('mongoose');
let dev_db_url = 'mongodb://localhost:27017'; /// localhost // mongo
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
module.exports = db;