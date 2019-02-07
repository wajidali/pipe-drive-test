const mongoose = require('mongoose');
var dbCon = 'mongo';
if(process.env.DB_HOST){
    dbCon = process.env.DB_HOST;
}
let dev_db_url = 'mongodb://' + dbCon + ':27017'; /// localhost // mongo
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
module.exports = db;