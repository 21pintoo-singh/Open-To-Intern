const internModel = require("../models/internModel")
const collegeModel = require('../models/collegeModel')
const emailValid = require("email-validator")
const ObjectId = require('mongoose').Types.ObjectId;





let createIntern = async function (req, res) {
      try {
            data = req.body
            let { name, email, mobile, isDeleted, collegeId } = data

            // check required property is present or Not ?
            if (!Object.keys(data).length)
                  return res.status(400).send({ status: false, message: "pls enter the data in body" })
            if (!name) return res.status(400).send({ status: false, message: "Missing Name" })
            if (!email) return res.status(400).send({ status: false, message: "Missing email" })
            if (!mobile) return res.status(400).send({ status: false, message: "Missing mobile" })
            if (!collegeId) return res.status(400).send({ status: false, message: "Missing collegeId" })

            // check if input is Valid or Not ?
            var regEx = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/
            if (!regEx.test(name)) {
                  return res.status(400).send({ status: false, message: "name is invalid" });
            }
            if (!emailValid.validate(email)) { return res.status(400).send({ status: false, message: "email id is invalid" }) };

            //check the college Id is Valid or Not ?
            if (!ObjectId.isValid(collegeId)) {
                  return res.status(400).send({ status: false, message: " collegeId is Invalid" });
            }

            //check id email is already in db or not ?
            findEmail = await internModel.findOne({ email: email })
            if (findEmail) return res.status(400).send({ status: false, message: "Emails is already used...." })

            //check if mobile no is already in db or not ?
            findMobile = await internModel.findOne({ mobile: mobile })
            if (findMobile) return res.status(400).send({ status: false, message:'  Mobile No is already used....' })

            //check if college id is present in Db or not ?
            findCollegeID = await collegeModel.findById(collegeId)
            if (!findCollegeID) return res.status(400).send({ status: false, message: "Entered College Id is Not Present in DB" })

            let internData = await internModel.create(data)
            return res.status(201).send({ status: true, data: internData });

      }
      catch (err) {
            
            return res.status(500).send({ status: false, message: "Error", error: err.message })
      }

}














module.exports.createIntern = createIntern;