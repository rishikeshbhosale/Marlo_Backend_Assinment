import mongoose, { Schema,model} from "mongoose";

const UserSchema = new Schema({
    fname : {type:String, required : true},
    lname: {type:String, required : true},
    mname:{type:String, required:false},
    email : {type: String , required:true, unique: true},
    occ:{type: String , required:true},
    password :{type :String, required:true},
    company :{type :String, required:false},
    phone :{ type : Number,required:true,unique: true}
})

const User =model("user",UserSchema)

export default User





// Names (First name, Last Name, Middle name (optional)), mandatory
// DOB, optional,
// Email, mandatory and UNIQUE
// Phone, mandatory and UNIQUE
// Occupation, optional
// Company, optional
// Password