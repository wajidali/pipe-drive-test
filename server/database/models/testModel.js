// Model

// load the things we need
const mongoose = require('mongoose');

// define the schema for our user model
var testDataSchema = mongoose.Schema({    
        id        : String,
        name     : String,
        age     : String,
        address : String, 
        team    : String    
});

// create the model for users and expose it to our app
module.exports = mongoose.model('test_data', testDataSchema);
