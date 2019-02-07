const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');
var csv = require("csvtojson");
var db = require('./database/db');
var path = require('path');

// Function to upload the file // This function only handles single file. 
module.exports = function upload(req, res) {
  var form = new IncomingForm();
  let readStream;
  form.on('file', async (field, file) => {    
    // Read File Stream
    var extension = path.extname(file.name);
    if(extension.indexOf('csv') == -1){
      return res.status(400).json({"message": "Upload accepts csv only"});
    }
    readStream = fs.createReadStream(file.path);  
    // Convert File Stream to JSON objects and isert into database.   
    csvDataInsert(readStream).then(whatComesNext => {      
      res.status(200).json(whatComesNext);
    });
  
  });

  //This method can be used only if we have file to upload, but we have to process the file as well. 
  // form.on('end', () => {        
  
  // });
  
  form.parse(req);
};

// Async function because it reports back the file upload process imediatly after upload.
// Better is that user should get the result if file finishes processesing mode as well. 
async function csvDataInsert(readStream) {
  // Returning promise since csv function is not async.   
  return new Promise ((resolve, reject) => {
    csv()
    .fromStream(readStream).subscribe(async function(jsonObj) {      
      //BETTER FUNCTION BELOW. 
      
      ///Adding to the database
      // var id, name, age, address, team = undefined;    
      // var current = 0;      
      // for (var prop in jsonObj) {        
      //     current++;
      //     if (jsonObj.hasOwnProperty(prop)) {
      //         switch (prop) {
      //             case 'id':
      //             id = jsonObj[prop]
      //             break;
      //             case 'name':
      //             name = jsonObj[prop];
      //             break;
      //             case 'age':
      //             age = jsonObj[prop];
      //             break;
      //             case 'address':
      //             address = jsonObj[prop];
      //             break;
      //             case 'team':
      //             team = jsonObj[prop];
      //             break;                
      //         }
      //         if(id != undefined && name !=undefined && age !=undefined && address !=undefined && team!=undefined)
      //         {
      //             let testData = new TestData({        
      //                 id      : id,
      //                 name    : name,
      //                 age     : age,
      //                 address : address, 
      //                 team    : team        
      //             });
      //             id, name, age, address, team = undefined;
      //             testData.save(function (err) {
      //                 if (err) {
      //                     return next(err);
      //                 }
      //                 console.log('Test Data added succesfully');
      //             });
      //         }            
      //     }
      // }  
      
    }).then(results => {      
      db.collection('test_datas').insertMany(results).then(c=> {        
        resolve(true);
      })      
      
    })

  });  
}