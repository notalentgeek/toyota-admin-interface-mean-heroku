//This is a collections of all chat that are in this web application.
//In this web application chat can only be happen within user and admin.
var Object_Mongoose = require("mongoose");
var Object_Schema = Object_Mongoose.Schema;
var Object_Schema_Chat = new Object_Schema({
    //This the main chat variables.
    //If there is a new chat just push it to this array.
    //The format is these.
    //    String_Time
    //    String_SenderID
    //    String_SenderName
    //    String_Message
    Chat_Array_String_: { default: [], type: Array },
    Chat_String_AdminName: { default: "", type: String },
    Chat_String_UserName: { default: "", type: String },
    Chat_String_AdminID: { default: "", type: String },
    Chat_String_UserID: { default: "", type: String }
});





//Create the model and then expose it to our application.
module.exports = Object_Mongoose.model("Chat", Object_Schema_Chat);