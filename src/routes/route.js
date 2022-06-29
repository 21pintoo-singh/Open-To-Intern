const express = require('express');
const router = express.Router();

const collegeController = require("../controllers/collegeController")
const internController = require("../controllers/internController")

//create new colleges data--APIs
router.post('/functionup/colleges',collegeController.createCollage)

router.post('/functionup/interns',internController.createIntern)
router.get('/functionup/collegeDetails',collegeController.getcollegeDetails)


module.exports = router;