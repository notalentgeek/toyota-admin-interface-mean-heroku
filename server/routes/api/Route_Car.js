var Object_Express  = require("express");
var Object_Router   = Object_Express.Router();
//Import the Car model schema. 
var Model_Car_    = require("../../models/Model_Car");
//These below are the routers. 
Object_Router.delete("/:model_car_id", 
    function(_Object_Request, _Object_Respond){
    Model_Car_.remove({
        _id: _Object_Request.params.model_car_id 
    }, 
    function(_Object_Error, _Model_Car){
        if(_Object_Error){
            _Object_Respond.send(_Object_Error);
 
            //Confirmation log sent to server's terminal. 
            _Object_Respond.json 
                ({message: "A car was just successfully deleted." });
        }
    });
});
Object_Router.get("/", function(_Object_Request, _Object_Respond){
    Model_Car_.find(function(_Object_Error, _Model_Car){
        if(_Object_Error){
            _Object_Respond.send(_Object_Error);
        } 
        _Object_Respond.json(_Model_Car);
    });
});
Object_Router.get("/:model_car_id", 
    function(_Object_Request, _Object_Respond){
        Model_Car_.findById(_Object_Request.params.model_car_id, 
        function(_Object_Error, _Model_Car){
            if(_Object_Error){
                _Object_Respond.send(_Object_Error);
            } 
            _Object_Respond.json(_Model_Car);
        });
    }
);
//Update a car. 
Object_Router.put("/:model_car_id", function(_Object_Request, _Object_Respond){
    Model_Car_.findById(_Object_Request.params.model_car_id,
        function(_Object_Error, _Model_Car){
        if(_Object_Error){
            _Object_Respond.send(_Object_Error);
        } 

        _Model_Car.Car_String_Name = _Object_Request.body.car_string_name_edit;
 
        _Model_Car.save(function(_Object_Error){
            if(_Object_Error){
                _Object_Respond.send(_Object_Error);
            } 
 
            _Object_Respond.json({message: "Car successfully updated!" });
        });
    });
});
//Exports all the routes to Object_Router variable. 
module.exports = Object_Router;