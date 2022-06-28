const internModel = require("../models/internModel")
const collegeModel = require('../models/collegeModel')
const emailValid=require("email-validator")





let createIntern = async function(req,res){
      data=req.body
      let {name,email,mobile,isDeleted,collegeId}=data
      
      
            if (!Object.keys(data).length)
                  return res.status(400).send({ status: false, message: "pls enter the data in body" })

            var regEx = /^[a-zA-Z]+$/;
            

      if (!name) return res.status(400).send({ status: false, message: "Missing Name" })
      if (!email) return res.status(400).send({ status: false, message: "Missing email" })
      if (!mobile) return res.status(400).send({ status: false, message: "Missing mobile" })
      if (!collegeId) return res.status(400).send({ status: false, message: "Missing collegeId" })

      if (!regEx.test(name)) {
            return res.status(400).send({ status: false, message: "name is invalid" });
      }
      if(!emailValid.validate(email)) { return res.status(400).send({ status: false, message: "email id is invalid" })};

      let internData = await internModel.create(data)
      return res.status(201).send({ status: true, data: internData });


     
}














  module.exports.createIntern = createIntern;