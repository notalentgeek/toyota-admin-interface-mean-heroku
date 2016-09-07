var Object_Mongoose = require("mongoose");
var Object_Schema = Object_Mongoose.Schema;
var Object_Schema_Car = new Object_Schema({
    Car_String_Name: { default: "", type: String },
});





//Create the model and then expose it to our application.
module.exports = Object_Mongoose.model("Car", Object_Schema_Car);