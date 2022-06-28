const collageModel = require("../models/collegeModel")
const internModel=require('../models/internModel')


let createCollage = async function (req, res) {
      try {
            const data = req.body;
            let { name, fullName, logoLink,isDeleted } = data
            console.log(typeof isDeleted);
            if (!Object.keys(data).length)
                  return res.status(400).send({ status: false, message: "pls enter the data in body" })

            var regEx = /^[a-zA-Z]+$/;
            


            if (!name) return res.status(400).send({ status: false, message: "Missing Name" })
            if (!fullName) return res.status(400).send({ status: false, message: "Missing fullname" })
            if (!logoLink) return res.status(400).send({ status: false, message: "Missing LogoLink" })

            if (!regEx.test(name)) {
                  return res.status(400).send({ status: false, message: "name is invalid" });
            }

            // if (!regEx.test(fullName)) {
            //       return res.status(400).send({ status: false, message: "fullName is invalid" });
            // }

            //check if isDeleted is TRUE/FALSE ?

            if (isDeleted && (!(typeof isDeleted=== "boolean"))) 
            {
                  return res.status(400).send({ status: false, message: "isDeleted Must be TRUE OR FALSE" });
            }
            let collageData = await collageModel.create(data)
            return res.status(201).send({ status: true, data: collageData });

      }
      catch (err) {
            // console.log("Erorr is from Create Blogs:", err.message)
            return res.status(500).send({
                  status: false,
                  meage: "Error", error: err.message
            })
      }
}


      let getcollegeDetails= async function (req, res){
            data=req.query
            let {collegeName}=data
            if(!collegeName)
            return res.status(400).send({ status: false, message: "Missing college name" });
            let collageData = await collageModel.find({name:collegeName})
            return res.status(200).send({ status: true, data: collageData });

      }



module.exports.getcollegeDetails=getcollegeDetails;
module.exports.createCollage = createCollage;