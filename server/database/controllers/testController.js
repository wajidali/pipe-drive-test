const TestData = require('../models/testModel');

exports.search = async function (req, res) {
    var id = req.body.query;        
    TestData.find({"id": id}, function (err, testData) {        
        if(err)
        return res.status(500).send(err);
        else 
        return res.status(200).json(testData); 
    })
    
}


// Test method to create single testData
exports.test_create = function (req, res) {
    let testData = new TestData({        
            id        : req.body.id,
            name     : req.body.name,
            age     : req.body.age,
            address : req.body.address, 
            team    : req.body.team        
    });

    testData.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Test Data added succesfully')
    })
};

// Test method to get all testData
exports.get_all = function (req, res) {  

    TestData.find({}, function (err, testData) {
        if(err)
        return res.status(500).send(err);
        else 
        return res.status(200).json(testData); 
    })
    
};

// Test method to delete all testData
exports.delete_all = function (req, res) {  

    TestData.remove({}, function (err, testData) {
        console.log(err, testData);
        if(err)
        return res.status(500).send(err);
        else 
        return res.status(200).json(testData); 
    });
    
};