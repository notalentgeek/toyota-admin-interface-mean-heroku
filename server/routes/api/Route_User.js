var Object_Express  = require("express");
var Object_Router   = Object_Express.Router();
//Import the User model schema. 
var Model_User_    = require("../../models/Model_User");
//These below are the routers. 
Object_Router.delete("/:model_user_id", 
    function(_Object_Request, _Object_Respond){
    Model_User_.remove({
        _id: _Object_Request.params.model_user_id 
    }, 
    function(_Object_Error, _Model_User){
        if(_Object_Error){
            _Object_Respond.send(_Object_Error);
 
            //Confirmation log sent to server's terminal. 
            _Object_Respond.json 
                ({message: "A user was just successfully deleted." });
        } 
    });
});
Object_Router.get("/", function(_Object_Request, _Object_Respond){
    Model_User_.find(function(_Object_Error, _Model_User){
        if(_Object_Error){
            _Object_Respond.send(_Object_Error);
        } 
        _Object_Respond.json(_Model_User);
    });
});
Object_Router.get("/:model_user_id", 
    function(_Object_Request, _Object_Respond){
        Model_User_.findById(_Object_Request.params.model_user_id, 
        function(_Object_Error, _Model_User){
            if(_Object_Error){
                _Object_Respond.send(_Object_Error);
            } 
            _Object_Respond.json(_Model_User);
        });
    }
);
//Update an user. 
Object_Router.put("/:model_user_id", function(_Object_Request, _Object_Respond){
    Model_User_.findById(_Object_Request.params.model_user_id,
        function(_Object_Error, _Model_User){
        if(_Object_Error){
            _Object_Respond.send(_Object_Error);
        } 

        _Model_User.User_String_CarID = _Object_Request.body.user_string_carid_edit;
        _Model_User.User_String_CarName = _Object_Request.body.user_string_carname_edit;
        _Model_User.User_String_Email = _Object_Request.body.user_string_email_edit;
        _Model_User.User_String_Name = _Object_Request.body.user_string_name_edit;
        _Model_User.User_String_Password = _Model_User.Void_GenerateHash(_Object_Request.body.user_string_password_edit);
 
        _Model_User.save(function(_Object_Error){
            if(_Object_Error){
                _Object_Respond.send(_Object_Error);
            } 
 
            _Object_Respond.json({message: "User successfully updated!" });
        });
    });
});
//Exports all the routes to Object_Router variable. 
module.exports = Object_Router;