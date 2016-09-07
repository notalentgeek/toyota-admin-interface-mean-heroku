var Object_BCrypt = require("bcrypt-nodejs");
var Object_Mongoose = require("mongoose");
var Object_Schema = Object_Mongoose.Schema;
var Object_Schema_User = new Object_Schema({
    User_Boolean_AI: { default: false, type: Boolean },
    User_String_CarID: { default: "", type: String },
    User_String_CarName: { default: "", type: String },
    User_String_Email: { default: "", type: String },
    User_String_Name: { default: "", type: String },
    User_String_Password: { default: "", type: String }
});





Object_Schema_User.methods.Void_GenerateHash = function(_String_Password){
    //Make sure the password is a valid String.
    if(_String_Password){
        return Object_BCrypt.hashSync(
            _String_Password,
            Object_BCrypt.genSaltSync(8),
            null
        );
    }
    return null;
};





Object_Schema_User.methods.Void_ReHashPassword = function(_String_Password){
    return Object_BCrypt.compareSync(
        _String_Password,
        this.User_String_Password
    );
};





//Create the model and then expose it to our application.
module.exports = Object_Mongoose.model("User", Object_Schema_User);