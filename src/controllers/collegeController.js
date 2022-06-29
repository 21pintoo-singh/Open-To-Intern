const collageModel = require("../models/collegeModel")
const internModel = require('../models/internModel')


let createCollage = async function (req, res) {
      try {
            const data = req.body;
            let { name, fullName, logoLink, isDeleted } = data
            console.log(typeof isDeleted);


            if (!Object.keys(data).length) return res.status(400).send({ status: false, message: "pls enter the data in body" })


            if (!name) return res.status(400).send({ status: false, message: "Name is Missing" })
            if (!fullName) return res.status(400).send({ status: false, message: "Fullname is Missing" })
            if (!logoLink) return res.status(400).send({ status: false, message: "LogoLink is Missing" })

            var regEx = /^[a-zA-Z]+$/;
            if (!regEx.test(name)) {
                  return res.status(400).send({ status: false, message: "Name is invalid" });
            }

            // if (!regEx.test(fullName)) {
            //       return res.status(400).send({ status: false, message: "fullName is invalid" });
            // }

            //check if isDeleted is TRUE/FALSE ?

            if (isDeleted && ((!(typeof isDeleted == "boolean")))) {
                  return res.status(400).send({ status: false, message: "isDeleted Must be TRUE OR FALSE" });
            }
            let collegeData = await collageModel.create(data)
            return res.status(201).send({ status: true, data: collegeData });

      }
      catch (err) {
            // console.log("Erorr is from Create Blogs:", err.message)
            return res.status(500).send({status: false,message: "Error", error: err.message})
      }
}


let getcollegeDetails = async function (req, res) {
      data = req.query
      let { collegeName } = data
      if (!collegeName)
            return res.status(400).send({ status: false, message: "Missing college name in qury param" });
      
      let collegeData = await collageModel.findOne({ name: collegeName })
      if(!collegeData) return res.status(404).send({ status: false, message: "College Not Found" });
      
      collegedId= (collegeData._id).toString()
      console.log(collegedId)

      let internData=await internModel.find({collegeId:collegedId}).select("name email mobile")
      console.log(internData)
      if(internData.length==0) return res.status(404).send({ status: false, message: "No intern Found" });

      return res.status(200).send({ status: true, data: {"name":collegeData.name,"fullName":collegeData.fullName,"logoLink":collegeData.logoLink,"interns":internData}});

}



module.exports.getcollegeDetails = getcollegeDetails;
module.exports.createCollage = createCollage;