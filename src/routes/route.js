const express = require('express');
const router = express.Router();

const collegeController = require("../controllers/collegeController")
const internController = require("../controllers/internController")

//create new colleges Path--APIs
router.post('/functionup/colleges', collegeController.createCollage)
router.post('/functionup/interns', internController.createIntern)
router.get('/functionup/collegeDetails', collegeController.getcollegeDetails)

// validation of url
router.all('/:y/', (req, res)=>res.status(400).send({status:false,message:"invaild request"}));
router.all('/:y/:x', (req, res)=>res.status(400).send({status:false,message:"invaild request"}));
  

module.exports = router;