const mongoose = require ( "mongoose" );
const Schema = mongoose.Schema;
const OjbectId = mongoose.Types.ObjectId;

const admin = new Schema (
    {
        firstName : {
            require:true,
            type:String
        },
        lastName : {
            require : true, 
            type : String 
        },
        email : {
            require : true,
            type : String ,
            unique : true
        },
        password : { 
            require : true , 
            type : String , 
            length : 8 
        },
        coureId : OjbectId        
    }
)

const adminModel = mongoose.model( "admin" , admin);
module.exports  = { 
    adminModel
}