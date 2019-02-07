const express = require('express');
const router = express.Router();
const test_controller = require('./database/controllers/testController');

const upload = require('./upload');

router.post('/import', upload);
router.post('/search', test_controller.search);

// These routes were created while testing, and can extend into something if needed. 
router.post('/create', test_controller.test_create);
router.get('/all', test_controller.get_all);
router.delete('/delete-all', test_controller.delete_all);


module.exports = router;

