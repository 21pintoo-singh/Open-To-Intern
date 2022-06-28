const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const validator = require('validator')

const internSchema = new mongoose.Schema({
 
    name:{
        type:String,
        required:true,
        trim:true
        
    },
    
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },
    
    mobile:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    
    collegeId:{
        type:ObjectId,
        required:true,
        ref: 'colleges'
    },
    
    isDeleted:{
        type:Boolean,
        default:false
    }
},{ timestamps: true} )

module.exports = mongoose.model("interns", internSchema)