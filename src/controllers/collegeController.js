const { rest } = require("lodash");
const { object } = require("webidl-conversions");
const collageModel = require("../models/collegeModel")
const internModel = require('../models/internModel')

// ----------------------------Create New College-----------------------------------------
let createCollage = async function (req, res) {
      try {
            const data = req.body;

            // destructure college data
            let { name, fullName, logoLink, isDeleted, ...rest } = data
            if (!Object.keys(data).length) return res.status(400).send({ status: false, message: "pls enter the data in body" })

            //do not accept undefiend attributes
            if (Object.keys(rest).length > 0)
                  return res.status(400).send({ status: false, message: "pls enter only name, fullname,logoLink" });

            //validate the college name
            if (!name) return res.status(400).send({ status: false, message: "Name is Missing" })

            //Check if Name Is Vilid or Not?
            var regEx = /^[a-zA-Z\-]+$/;
            if (!regEx.test(name)) {
                  return res.status(400).send({ status: false, message: "Name is invalid" });
            }

            //Check if college full name present or not?
            if (!fullName) return res.status(400).send({ status: false, message: "Fullname is Missing" })

            //Check if fullName Is Vilid or Not?
            var regEex = /[a-z]+/;
            if (!regEex.test(fullName)) {
                  return res.status(400).send({ status: false, message: "fullName is invalid" });
            }

            //Check if college logoLink present or not?
            if (!logoLink) return res.status(400).send({ status: false, message: "LogoLink is Missing" })

            // Check the LogoLink Is Valid or Not?
            if (!(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.~#?&//=]*)/.test(data.logoLink))) {
                  return res.status(400).send({ status: false, msg: 'Not a valid logoLink' })
            }

            //check if isDeleted is TRUE/FALSE ?
            if (isDeleted && (isDeleted === "" || (!(typeof isDeleted == "boolean")))) {
                  return res.status(400).send({ status: false, message: "isDeleted Must be TRUE OR FALSE" });
            }
            if (isDeleted)
            return res.status(400).send({ status: false, message: "you can not set isdeleted True" });

            //if college name is already present In DB or Not!
            const findName = await collageModel.findOne({ name: name })
            if (findName) return res.status(400).send({ status: false, message: "Name Is Already Present In DB" });

            //create Data In DB
            let collegeData = await collageModel.create(data)
            return res.status(201).send({ status: true, data: collegeData });
      }
      catch (err) {
            return res.status(500).send({ status: false, message: "Error", error: err.message })
      }
}

// -----------------------------------get Collage Details---------------------
let getcollegeDetails = async function (req, res) {
      try {
            data = req.query

            // Destructure object data
            let { collegeName } = data
            if (!collegeName)
                  return res.status(400).send({ status: false, message: "Missing college name in quary param" });

            // if collegeName Is Present
            let collegeData = await collageModel.findOne({ name: collegeName, isDeleted: false })
            if (!collegeData) return res.status(404).send({ status: false, message: "College Not Found" });

            // is there store college Id
            collegedId = (collegeData._id).toString()

            // get All Intern detail(name,email,mobile)
            let internData = await internModel.find({ collegeId: collegedId, isDeleted: false }).select("name email mobile")
            if (internData.length == 0) return res.status(404).send({ status: false, message: "No intern Found" });

            //  response all collage data
            return res.status(200).send({ status: true, data: { "name": collegeData.name, "fullName": collegeData.fullName, "logoLink": collegeData.logoLink, "interns": internData } });
            
      }
      catch (err) {
            return res.status(500).send({ status: false, message: "Error", error: err.message })
      }
}

module.exports.getcollegeDetails = getcollegeDetails;
module.exports.createCollage = createCollage;