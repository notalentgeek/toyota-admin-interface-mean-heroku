var Object_Express  = require("express");
var Object_Router   = Object_Express.Router();
//Import the Workshop model schema. 
var Model_Workshop_    = require("../../models/Model_Workshop");
//These below are the routers. 
Object_Router.delete("/:model_workshop_id", 
    function(_Object_Request, _Object_Respond){
    Model_Workshop_.remove({
        _id: _Object_Request.params.model_workshop_id 
    }, 
    function(_Object_Error, _Model_Workshop){
        if(_Object_Error){
            _Object_Respond.send(_Object_Error);
 
            //Confirmation log sent to server's terminal. 
            _Object_Respond.json 
                ({message: "A workshop was just successfully deleted." });
        }
    });
});
Object_Router.get("/", function(_Object_Request, _Object_Respond){
    Model_Workshop_.find(function(_Object_Error, _Model_Workshop){
        if(_Object_Error){
            _Object_Respond.send(_Object_Error);
        } 
        _Object_Respond.json(_Model_Workshop);
    });
});
Object_Router.get("/:model_workshop_id", 
    function(_Object_Request, _Object_Respond){
        Model_Workshop_.findById(_Object_Request.params.model_workshop_id, 
        function(_Object_Error, _Model_Workshop){
            if(_Object_Error){
                _Object_Respond.send(_Object_Error);
            } 
            _Object_Respond.json(_Model_Workshop);
        });
    }
);
//Update a workshop.
Object_Router.put("/:model_workshop_id", function(_Object_Request, _Object_Respond){
    Model_Workshop_.findById(_Object_Request.params.model_workshop_id,
        function(_Object_Error, _Model_Workshop){
        if(_Object_Error){
            _Object_Respond.send(_Object_Error);
        }





        //Inputting the model.
        _Model_Workshop.Workshop_Array_String_SlotFriday    = _Object_Request.body.workshop_array_string_slot_friday;
        _Model_Workshop.Workshop_Array_String_SlotMonday    = _Object_Request.body.workshop_array_string_slot_monday;
        _Model_Workshop.Workshop_Array_String_SlotSaturday  = _Object_Request.body.workshop_array_string_slot_saturday;
        _Model_Workshop.Workshop_Array_String_SlotSunday    = _Object_Request.body.workshop_array_string_slot_sunday;
        _Model_Workshop.Workshop_Array_String_SlotThursday  = _Object_Request.body.workshop_array_string_slot_thursday;
        _Model_Workshop.Workshop_Array_String_SlotTuesday   = _Object_Request.body.workshop_array_string_slot_tuesday;
        _Model_Workshop.Workshop_Array_String_SlotWednesday = _Object_Request.body.workshop_array_string_slot_wednesday;
        _Model_Workshop.Workshop_Number_Latitude            = _Object_Request.body.workshop_number_latitude_edit;
        _Model_Workshop.Workshop_Number_Longitude           = _Object_Request.body.workshop_number_longitude_edit;
        _Model_Workshop.Workshop_String_Name                = _Object_Request.body.workshop_string_name_edit;



        _Model_Workshop.save(function(_Object_Error){
            if(_Object_Error){
                _Object_Respond.send(_Object_Error);
            } 
 
            _Object_Respond.json({message: "Workshop successfully updated!" });
        });
    });
});





//Exports all the routes to Object_Router variable. 
module.exports = Object_Router;