//Load up the admin model.
var Model_Admin_ = require("../../server/models/Model_Admin");
var Model_Workshop_ = require("../../server/models/Model_Workshop");
//Load Passport Local Strategy.
var Object_Passport_LocalStrategy = require("passport-local").Strategy;
//Take a reference of ObjectID from MongoDB module.
//I need this to return an ObjectID from String
var ObjectId_ = require('mongodb').ObjectID;





function String_LogError(_String_MethodPlusVerbIng){
    var String_ = "Error happened when " + _String_MethodPlusVerbIng + ".";
    console.log(String_);
    return String_;
}
function String_LogErrorAnAdminLoggedIn(){
    var String_ = "Another admin is logged in. Please sign out and try to register again."
    console.log(String_);
    return String_
}
function String_LogErrorCannotFound(){
    var String_ = "Cannot find admin with email specified.";
    console.log(String_);
    return String_;
}
function String_LogErrorEmailExist(){
    var String_ = "Email specified is already exist in database. Either choose to forgot password or pick different email.";
    console.log(String_);
    return String_;
}
function String_LogErrorWrongPassword(){
    var String_ = "Password and admin email do not match.";
    console.log(String_);
    return String_;
}
function String_LogSuccess(_String_Entry, _String_MethodPlusVerbTwo){
    var String_ = _String_Entry + " is successfully " + _String_MethodPlusVerbTwo + ".";
    console.log(String_);
    return String_;
}





//Export function.
module.exports = function(_Object_Passport){





    //Serialize admin for this session.
    _Object_Passport.serializeUser(function(_Model_Admin, _Function_Done){
        _Function_Done(null, _Model_Admin.id);
    });





    //Deserialize the admin for this session.
    _Object_Passport.deserializeUser(function(_Object_ID, _Function_Done){
        Model_Admin_.findById(_Object_ID, function(_Object_Error, _Model_Admin){
            _Function_Done(_Object_Error, _Model_Admin);
        });
    });





    //Local strategy.
    _Object_Passport.use("local-login", new Object_Passport_LocalStrategy(
        {
            passReqToCallback: true,
            passwordField: "admin_string_password_login",
            usernameField: "admin_string_email_login"
        },
        function(
            _Object_Request,
            _String_Email,
            _String_Password,
            _Function_Done
        ){
            if(_String_Email){
                _String_Email = _String_Email.toLowerCase();
            }
            //Async.
            process.nextTick(function(){





                Model_Admin_.findOne({ "Admin_String_Email": _String_Email },
                    function(_Object_Error, _Model_Admin){





                        if(_Object_Error){
                            String_LogError("logging in");
                            return _Function_Done(_Object_Error);
                        }





                        //Check if _Model_Admin the client requested is exist.
                        if(!_Model_Admin){
                            String_LogErrorCannotFound()
                            return _Function_Done(
                                null,
                                false
                            );
                        }





                        //If the admin is exist but the password is wrong.
                        if(!_Model_Admin.Void_ReHashPassword(_String_Password)){
                            String_LogErrorWrongPassword()
                            return _Function_Done(
                                null,
                                false
                            );
                        }
                        else{
                            /*
                            console.log("Successfully logging in.");
                            console.log("=====TESTING LOGGED ADMIN=====");
                            console.log(_Model_Admin); //_Model_Admin is apparently a table variable.
                            console.log(_Model_Admin.Admin_String_Email);
                            console.log("=====TESTING LOGGED ADMIN=====");*/




                            String_LogSuccess(_Model_Admin.Admin_String_Email, "logged in");
                            return _Function_Done(null, _Model_Admin);





                        }
                    }
                );





            });
        }
    ));





    //Local Register strategy.
    _Object_Passport.use("local-signup", new Object_Passport_LocalStrategy(
        {
            passReqToCallback: true,
            passwordField: "admin_string_password_register",
            usernameField: "admin_string_email_register"
        },
        function(
            _Object_Request,
            _String_Email,
            _String_Password,
            _Function_Done
        ){
            if(_String_Email){
                _String_Email = _String_Email.toLowerCase();
            }
            process.nextTick(function(){





                //If there is no admin logged in.
                if (!_Object_Request.user){
                    Model_Admin_.findOne({ "Admin_String_Email": _String_Email }, function(_Object_Error, _Model_Admin) {
                        //If error.
                        if(_Object_Error){
                            String_LogError("registering");
                            return _Function_Done(_Object_Error);
                        }
                        //Check email.
                        if(_Model_Admin){
                            String_LogErrorEmailExist()
                            return _Function_Done(null, false);
                        }
                        else{
                            //Create a new admin.
                            var Model_Admin_Temporary = new Model_Admin_();
                            Model_Admin_Temporary.Admin_String_Email = _String_Email;
                            Model_Admin_Temporary.Admin_String_Name = _Object_Request.body.admin_string_name_register;
                            Model_Admin_Temporary.Admin_String_Password = Model_Admin_Temporary.Void_GenerateHash(_String_Password);
                            Model_Admin_Temporary.Admin_String_WorkshopID = _Object_Request.body.admin_string_workshopid_register;



                            //Here is where things get messy.
                            //Here I want to take the workshop name from the workshop id.
                            //Why workshop id andnot directly take the workshop name?
                            //Because the _Object_Request.body.admin_string_workshopid_register return a String.
                            //And the value taken from the <select></select> returns a String of _id.
                            //That is why I reverse back to find the workshop name value within the database.
                            //Below I take the String ID.
                            var String_WorkshopID = _Object_Request.body.admin_string_workshopid_register;
                            var String_WorkshopName = undefined;


                            //I am going to make the ID String back to ObjectID
                            var ObjectId__Temporary = ObjectId_(String_WorkshopID);


                            //Accessing database is asynchronous method, then we need to wait it before we add.
                            //    the new user into MongoDB database.
                            //Find the workshop object in the database based on ObjectId__Temporary.
                            Model_Workshop_.findOne({ _id: ObjectId__Temporary }, function(_Object_Error, _Model_Workshop_){

                                //If the workshop mentioned is not available in the database throw an error.
                                //However, this is not supposed to not happen at all.
                                if(_Object_Error){
                                    throw _Object_Error;
                                }
                                //If the workshop object is found in the database then proceed to add the new
                                //    admin into the database.
                                else{
                                    String_WorkshopName = _Model_Workshop_.Workshop_String_Name;  
                                    Model_Admin_Temporary.Admin_String_WorkshopName = String_WorkshopName;



                                    String_LogSuccess(_String_Email, "registered");



                                    Model_Admin_Temporary.save(function(_Object_Error){
                                        if(_Object_Error){
                                            throw _Object_Error;
                                        }

                                        return _Function_Done(null, Model_Admin_Temporary);
                                    });
                                }
                            });
                        }
                    });
                }
                else{
                    //An admin is still logged in.
                    String_LogErrorAnAdminLoggedIn();
                    return _Function_Done(null, _Object_Request.user);
                }





            });
        }
    ));





};