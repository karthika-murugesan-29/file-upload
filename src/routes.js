
const express = require('express');
const upload = require('./middleware/upload');
const controller = require('./csv-upload.js');
var router = express.Router();
/** End point for server status */
router.get('/serverstatus',(req,res) => {
    res.status(200).send('API is up');
 })

/** End point - File Upload */
router.post('/fileupload', upload.single("file"),controller.upload)

module.exports = router;