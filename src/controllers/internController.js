const internModel = require("../models/internModel")
const collegeModel = require('../models/collegeModel')
const emailValid = require("email-validator")

// -----------------------------------------createIntern Data------------------------------------
let createIntern = async function (req, res) {
      try {
            data = req.body

            // Destructure The Object In body
            let { name, email, mobile, isDeleted, collegeName } = data

            // check required property is present or Not ?
            if (!Object.keys(data).length)
                  return res.status(400).send({ status: false, message: "pls enter the data in body" })

            //validate the intern name
            if (!name) return res.status(400).send({ status: false, message: " Name Missing" })

            // check the intern name Valid or Not ?
            var regEx = /^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$/
            if (!regEx.test(name)) {
                  return res.status(400).send({ status: false, message: "name is invalid" });
            }

            //validate the intern email
            if (!email) return res.status(400).send({ status: false, message: "Missing email" })

            // check email is valid or not?
            if (!emailValid.validate(email)) { return res.status(400).send({ status: false, message: "email id is invalid" }) };

            //validate the intern mobile
            if (!mobile) return res.status(400).send({ status: false, message: "Missing mobile" })

            // check mobile Number Is Valid?
            var regexMobile = /^[0]?[6789]\d{9}$/
            if (!regexMobile.test(mobile)) {
                  return res.status(400).send({ status: false, message: "Mobile Number is invalid" });
            }

            //check if isDeleted is TRUE/FALSE ?
            if (isDeleted && (isDeleted === "" || (!(typeof isDeleted == "boolean")))) {
                  return res.status(400).send({ status: false, message: "isDeleted Must be TRUE OR FALSE" });
            }
            if (isDeleted)
            return res.status(400).send({ status: false, message: "you can not set isdeleted True" });

            //check id email is already in db or not ?
            findEmail = await internModel.findOne({ email: email })
            if (findEmail) return res.status(400).send({ status: false, message: "Emails is already used...." })

            //check if mobile no is already in db or not ?
            findMobile = await internModel.findOne({ mobile: mobile })
            if (findMobile) return res.status(400).send({ status: false, message: '  Mobile No is already used....' })

            //check if college name is present in Db or not ?
            findCollege = await collegeModel.findOne({ name: collegeName, isDeleted: false })
            if (!findCollege) return res.status(404).send({ status: false, message: "Entered college is Not present in DB" })
            data.collegeId = (findCollege._id).toString()

            // create the intern data in DB
            let internData = await internModel.create(data)
            return res.status(201).send({ status: true, data: internData });

      }
      catch (err) {
            // if found any error then show that
            return res.status(500).send({ status: false, message: "Error", error: err.message })
      }
}

module.exports.createIntern = createIntern;