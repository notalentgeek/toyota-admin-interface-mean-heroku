//|||||||||||||||||||||||||VARIABLES|||||||||||||||||||||||||
//|||||||||||||||||||||||||VARIABLES|||||||||||||||||||||||||
//|||||||||||||||||||||||||VARIABLES|||||||||||||||||||||||||
//|||||||||||||||||||||||||VARIABLES|||||||||||||||||||||||||
//|||||||||||||||||||||||||VARIABLES|||||||||||||||||||||||||
var Number_Port = 3000;
var Number_UpdateSpeedInMilliSecond = 500;
var Boolean_TriggerVoidSetup = true; //A variable so that the setup function only triggered once.





//Import variables.
var Object_Async = require("async");
var Object_BodyParser = require("body-parser");
//Initialize configuration JavaScript file.
//This is mostly for MongoDB connection.
var Object_Config_MongoDB = require("./server/configs/Config_MongoDB_Remote.js");
var Object_CookieParser = require("cookie-parser");
var Object_Express = require("express");
var Object_ExpressSession = require("express-session");
var Object_Mongoose = require("mongoose");
var Object_MongoStore = require("connect-mongo")(Object_ExpressSession);
var Object_Morgan = require("morgan");
var Object_Passport = require("passport");
var Object_Path = require("path");
var Object_ServeFavicon = require("serve-favicon");
var Object_SocketIO = require("socket.io");





//Models
var Model_Admin_ = require("./server/models/Model_Admin");
var Model_Car_ = require("./server/models/Model_Car");
var Model_Chat_ =  require("./server/models/Model_Chat");
var Model_User_ = require("./server/models/Model_User");
var Model_Workshop_ = require("./server/models/Model_Workshop");
var Array_Model_ = [
    Model_Admin_,
    Model_Car_,
    Model_Chat_,
    Model_User_,
    Model_Workshop_
];




//These variables below is mostly for API routings.
var Route_General = require("./server/routes/Route_General");
var Route_Admin_ = require("./server/routes/api/Route_Admin");
var Route_Car_ = require("./server/routes/api/Route_Car");
var Route_User_ = require("./server/routes/api/Route_User");
var Route_Workshop_ = require("./server/routes/api/Route_Workshop");





//Kick start ExpressJS application.
var Object_App = Object_Express();




var Object_Database = undefined;
var Object_Server = undefined;
var Object_SocketIO_Server = undefined;
//|||||||||||||||||||||||||VARIABLES END|||||||||||||||||||||||||
//|||||||||||||||||||||||||VARIABLES END|||||||||||||||||||||||||
//|||||||||||||||||||||||||VARIABLES END|||||||||||||||||||||||||
//|||||||||||||||||||||||||VARIABLES END|||||||||||||||||||||||||
//|||||||||||||||||||||||||VARIABLES END|||||||||||||||||||||||||





//|||||||||||||||||||||||||SETTING VIEW ENGINE|||||||||||||||||||||||||
//|||||||||||||||||||||||||SETTING VIEW ENGINE|||||||||||||||||||||||||
//|||||||||||||||||||||||||SETTING VIEW ENGINE|||||||||||||||||||||||||
//|||||||||||||||||||||||||SETTING VIEW ENGINE|||||||||||||||||||||||||
//|||||||||||||||||||||||||SETTING VIEW ENGINE|||||||||||||||||||||||||
//View engine setup.
Object_App.set("views", Object_Path.join(__dirname, "server/views"));
//PENDING: I want to change the view engine to something
//    better like Jade or Handlebars.
Object_App.set("view engine", "ejs");
//|||||||||||||||||||||||||SETTING VIEW ENGINE END|||||||||||||||||||||||||
//|||||||||||||||||||||||||SETTING VIEW ENGINE END|||||||||||||||||||||||||
//|||||||||||||||||||||||||SETTING VIEW ENGINE END|||||||||||||||||||||||||
//|||||||||||||||||||||||||SETTING VIEW ENGINE END|||||||||||||||||||||||||
//|||||||||||||||||||||||||SETTING VIEW ENGINE END|||||||||||||||||||||||||





//|||||||||||||||||||||||||SETTING OTHER THINGS|||||||||||||||||||||||||
//|||||||||||||||||||||||||SETTING OTHER THINGS|||||||||||||||||||||||||
//|||||||||||||||||||||||||SETTING OTHER THINGS|||||||||||||||||||||||||
//|||||||||||||||||||||||||SETTING OTHER THINGS|||||||||||||||||||||||||
//|||||||||||||||||||||||||SETTING OTHER THINGS|||||||||||||||||||||||||
//Setting up modules that have been imported.
//Uncomment after placing your favicon in /public.
//Object_App.use(favicon(Object_Path.join(__dirname, "public", "favicon.ico")));
Object_App.use(Object_BodyParser.json());
Object_App.use(Object_BodyParser.urlencoded({ extended: false }));
Object_App.use(Object_CookieParser());
Object_App.use(Object_Express.static(Object_Path.join(__dirname, "public")));
Object_App.use(Object_Morgan("dev"));
//|||||||||||||||||||||||||SETTING OTHER THINGS END|||||||||||||||||||||||||
//|||||||||||||||||||||||||SETTING OTHER THINGS END|||||||||||||||||||||||||
//|||||||||||||||||||||||||SETTING OTHER THINGS END|||||||||||||||||||||||||
//|||||||||||||||||||||||||SETTING OTHER THINGS END|||||||||||||||||||||||||
//|||||||||||||||||||||||||SETTING OTHER THINGS END|||||||||||||||||||||||||






//|||||||||||||||||||||||||DATABASE CONNECTION|||||||||||||||||||||||||
//|||||||||||||||||||||||||DATABASE CONNECTION|||||||||||||||||||||||||
//|||||||||||||||||||||||||DATABASE CONNECTION|||||||||||||||||||||||||
//|||||||||||||||||||||||||DATABASE CONNECTION|||||||||||||||||||||||||
//|||||||||||||||||||||||||DATABASE CONNECTION|||||||||||||||||||||||||
//Connect to database.
Object_Database = Object_Mongoose.connect(Object_Config_MongoDB.url, function(_Object_Error){
    //If the database connection failed.
    //I think this will be the same with
    //    Object_Mongoose.connection.on("error", function(){});
    if(_Object_Error){
        console.log("MongoDB connection cannot be established.");
        console.log("Please check the configuration for MongoDB.");
        throw _Object_Error;
    }

    //For debugging I want so that when the web application starts it drops the
    //    database and then re - create new.
    //console.log("For development purposes I delete database everytime it runs new.");
    //Object_Mongoose.connection.db.dropDatabase();

    //If connection is successfull then check to see if
    //    there is an element in database.
    Void_CheckCollectionEmpty(Array_Model_, 0);

});
//|||||||||||||||||||||||||DATABASE CONNECTION END|||||||||||||||||||||||||
//|||||||||||||||||||||||||DATABASE CONNECTION END|||||||||||||||||||||||||
//|||||||||||||||||||||||||DATABASE CONNECTION END|||||||||||||||||||||||||
//|||||||||||||||||||||||||DATABASE CONNECTION END|||||||||||||||||||||||||
//|||||||||||||||||||||||||DATABASE CONNECTION END|||||||||||||||||||||||||





//|||||||||||||||||||||||||PASSPORT|||||||||||||||||||||||||
//|||||||||||||||||||||||||PASSPORT|||||||||||||||||||||||||
//|||||||||||||||||||||||||PASSPORT|||||||||||||||||||||||||
//|||||||||||||||||||||||||PASSPORT|||||||||||||||||||||||||
//|||||||||||||||||||||||||PASSPORT|||||||||||||||||||||||||
//Setting up passport.
require("./server/configs/Config_Passport")(Object_Passport);
//Generating secret for session.
Object_App.use(
    Object_ExpressSession(
        {
            resave: true,
            saveUninitialized: true,
            //This is the secret password generator key.
            //Don not you dare to change this code.
            //Or all password would not be working.
            secret: "123lolxd123",
            store: new Object_MongoStore({
                url: Object_Config_MongoDB.url,
                collection: "sessions"
            })
        }
    )
);
//Init passport authentication.
Object_App.use(Object_Passport.initialize());
//Persistent login session.
Object_App.use(Object_Passport.session());
//|||||||||||||||||||||||||PASSPORT END|||||||||||||||||||||||||
//|||||||||||||||||||||||||PASSPORT END|||||||||||||||||||||||||
//|||||||||||||||||||||||||PASSPORT END|||||||||||||||||||||||||
//|||||||||||||||||||||||||PASSPORT END|||||||||||||||||||||||||
//|||||||||||||||||||||||||PASSPORT END|||||||||||||||||||||||||





//|||||||||||||||||||||||||API ROUTINGS|||||||||||||||||||||||||
//|||||||||||||||||||||||||API ROUTINGS|||||||||||||||||||||||||
//|||||||||||||||||||||||||API ROUTINGS|||||||||||||||||||||||||
//|||||||||||||||||||||||||API ROUTINGS|||||||||||||||||||||||||
//|||||||||||||||||||||||||API ROUTINGS|||||||||||||||||||||||||
//Set up API routings.
Object_App.use("/", Route_General);
Object_App.use("/api/admins", Route_Admin_);
Object_App.use("/api/cars", Route_Car_);
Object_App.use("/api/users", Route_User_);
Object_App.use("/api/workshops", Route_Workshop_);
//|||||||||||||||||||||||||API ROUTINGS END|||||||||||||||||||||||||
//|||||||||||||||||||||||||API ROUTINGS END|||||||||||||||||||||||||
//|||||||||||||||||||||||||API ROUTINGS END|||||||||||||||||||||||||
//|||||||||||||||||||||||||API ROUTINGS END|||||||||||||||||||||||||
//|||||||||||||||||||||||||API ROUTINGS END|||||||||||||||||||||||||





//|||||||||||||||||||||||||API ROUTINGS ERROR END|||||||||||||||||||||||||
//|||||||||||||||||||||||||API ROUTINGS ERROR END|||||||||||||||||||||||||
//|||||||||||||||||||||||||API ROUTINGS ERROR END|||||||||||||||||||||||||
//|||||||||||||||||||||||||API ROUTINGS ERROR END|||||||||||||||||||||||||
//|||||||||||||||||||||||||API ROUTINGS ERROR END|||||||||||||||||||||||||
//Catch missing/unknown routing to 404 error handler.
Object_App.use(
    function(
        _Object_Request,
        _Object_Respond,
        _Object_Next
    ){
      var Error_ = new Error("Not found.");
      Error_.status = 404;
      _Object_Next(Error_);
    }
);
//Simple error handlers.
//Development error handler.
if(Object_App.get("env") === "development"){
    Object_App.use(
        function(
            _Object_Error,
            _Object_Request,
            _Object_Respond,
            _Object_Next
        ){
            _Object_Respond.render("page_error", {
                error: _Object_Error,
                message: _Object_Error.message
            });
            _Object_Respond.status(_Object_Error.status || 500);
        }
    );
}
//Production error.
Object_App.use(
    function(
        _Object_Error,
        _Object_Request,
        _Object_Respond,
        _Object_Next
    ){
        _Object_Respond.render("page_error", {
            error: _Object_Error,
            message: {}
        });
        _Object_Respond.status(_Object_Error.status || 500);
    }
);
//|||||||||||||||||||||||||API ROUTINGS ERROR END|||||||||||||||||||||||||
//|||||||||||||||||||||||||API ROUTINGS ERROR END|||||||||||||||||||||||||
//|||||||||||||||||||||||||API ROUTINGS ERROR END|||||||||||||||||||||||||
//|||||||||||||||||||||||||API ROUTINGS ERROR END|||||||||||||||||||||||||
//|||||||||||||||||||||||||API ROUTINGS ERROR END|||||||||||||||||||||||||





//|||||||||||||||||||||||||PORT SETTING FOR NODEJS|||||||||||||||||||||||||
//|||||||||||||||||||||||||PORT SETTING FOR NODEJS|||||||||||||||||||||||||
//|||||||||||||||||||||||||PORT SETTING FOR NODEJS|||||||||||||||||||||||||
//|||||||||||||||||||||||||PORT SETTING FOR NODEJS|||||||||||||||||||||||||
//|||||||||||||||||||||||||PORT SETTING FOR NODEJS|||||||||||||||||||||||||
//Setting up port connection to NodeJS server.
Object_App.set("port", process.env.PORT || Number_Port);
Object_Server = Object_App.listen(Object_App.get("port"), function(){




    console.log(
        "Express server listening on port " +
        Object_Server.address().port
    );





});
//|||||||||||||||||||||||||PORT SETTING FOR NODEJS END|||||||||||||||||||||||||
//|||||||||||||||||||||||||PORT SETTING FOR NODEJS END|||||||||||||||||||||||||
//|||||||||||||||||||||||||PORT SETTING FOR NODEJS END|||||||||||||||||||||||||
//|||||||||||||||||||||||||PORT SETTING FOR NODEJS END|||||||||||||||||||||||||
//|||||||||||||||||||||||||PORT SETTING FOR NODEJS END|||||||||||||||||||||||||





//|||||||||||||||||||||||||SOCKETIO|||||||||||||||||||||||||
//|||||||||||||||||||||||||SOCKETIO|||||||||||||||||||||||||
//|||||||||||||||||||||||||SOCKETIO|||||||||||||||||||||||||
//|||||||||||||||||||||||||SOCKETIO|||||||||||||||||||||||||
//|||||||||||||||||||||||||SOCKETIO|||||||||||||||||||||||||
//SocketIO connection management.
//The default event name for if there is a connection
//    established is "connection".
Object_SocketIO_Server = Object_SocketIO(Object_Server);
Object_SocketIO_Server.on("connection", function(_Object_Socket){





    //Listen on "disconnect" event.
    //This codes below will only be executed if there is a
    //    user leave the web application (or he/she just
    //    refresh the web page).
    _Object_Socket.on("disconnect", function(){
        console.log(_Object_Socket.id + " is disconnected.");
    });





    //Custom event when there is a message sent into
    //    the server.
    _Object_Socket.on("ntg_event_message_sent_to_server",
        function(_Object_DataReceived){
            var String_ChatMessage = _Object_DataReceived;
            //var String_ChatMessage = _Object_Socket.id + ": " + _Object_DataReceived;
            //Display a feedback into the server's console.
            console.log(String_ChatMessage);
            //Then we broadcasted the message to all client.
            //This is only for development purposes.
            Object_SocketIO_Server.emit(
                "ntg_event_message_sent_to_server",
                String_ChatMessage
            );
        }
    );





    //This console message below will be executed if there
    //    is a user enters/starts our web application
    //    (refreshing the web pages count).
    console.log(_Object_Socket.id + " is connected.");





});
//|||||||||||||||||||||||||SOCKETIO END|||||||||||||||||||||||||
//|||||||||||||||||||||||||SOCKETIO END|||||||||||||||||||||||||
//|||||||||||||||||||||||||SOCKETIO END|||||||||||||||||||||||||
//|||||||||||||||||||||||||SOCKETIO END|||||||||||||||||||||||||
//|||||||||||||||||||||||||SOCKETIO END|||||||||||||||||||||||||





//|||||||||||||||||||||||||SETUP AND LOOP SYNC FUNCTIONS|||||||||||||||||||||||||
//|||||||||||||||||||||||||SETUP AND LOOP SYNC FUNCTIONS|||||||||||||||||||||||||
//|||||||||||||||||||||||||SETUP AND LOOP SYNC FUNCTIONS|||||||||||||||||||||||||
//|||||||||||||||||||||||||SETUP AND LOOP SYNC FUNCTIONS|||||||||||||||||||||||||
//|||||||||||||||||||||||||SETUP AND LOOP SYNC FUNCTIONS|||||||||||||||||||||||||
//Looped function per 0.5 second.
//I will just use the Arduino C convention here :)).
function Void_Setup(){
}
function Void_Loop(){
}
setInterval(
    Void_Loop,
    Number_UpdateSpeedInMilliSecond
);
//|||||||||||||||||||||||||SETUP AND LOOP SYNC FUNCTIONS|||||||||||||||||||||||||
//|||||||||||||||||||||||||SETUP AND LOOP SYNC FUNCTIONS|||||||||||||||||||||||||
//|||||||||||||||||||||||||SETUP AND LOOP SYNC FUNCTIONS|||||||||||||||||||||||||
//|||||||||||||||||||||||||SETUP AND LOOP SYNC FUNCTIONS|||||||||||||||||||||||||
//|||||||||||||||||||||||||SETUP AND LOOP SYNC FUNCTIONS|||||||||||||||||||||||||





//|||||||||||||||||||||||||FUNCTIONS TO INITIATES DUMMY DATABASE DATA|||||||||||||||||||||||||
//|||||||||||||||||||||||||FUNCTIONS TO INITIATES DUMMY DATABASE DATA|||||||||||||||||||||||||
//|||||||||||||||||||||||||FUNCTIONS TO INITIATES DUMMY DATABASE DATA|||||||||||||||||||||||||
//|||||||||||||||||||||||||FUNCTIONS TO INITIATES DUMMY DATABASE DATA|||||||||||||||||||||||||
//|||||||||||||||||||||||||FUNCTIONS TO INITIATES DUMMY DATABASE DATA|||||||||||||||||||||||||
//Function to check if all collection is empty.
//The first parameter is an array that if filled with all
//    posssible collections.
function Void_CheckCollectionEmpty(_Array_Model_, _Number_Count){



    _Array_Model_[_Number_Count].count({}, function(_Object_Error, _Object_Result){



        if(_Object_Error){

            console.log(_Object_Error);
            throw _Object_Error;

        }
        if(_Object_Result > 0){

            console.log("Model collection with index " + _Number_Count + " has " + _Object_Result + " document/s.");
            console.log("Stopped to to fill dummy data.");
            return;

        }
        else if(_Object_Result == 0){
            


            _Number_Count ++;
            //If all collection is empty that put dummies in
            //    the database.
            if(_Number_Count > _Array_Model_.length - 1){
                console.log("All collection is empty");
                console.log("Continue to fill dummy data.");

                //Setting up callback for initiating database.
                Void_CreateDummy();

                return;
            }
            else if(_Number_Count <= _Array_Model_.length - 1){
                Void_CheckCollectionEmpty(_Array_Model_, _Number_Count);
            }



        }



    });


}




//Function that is used to fill database with dummy data.
function Void_CreateDummy(){
    var Model_Car_Temporary1 = new Model_Car_();
    Model_Car_Temporary1.Car_String_Name = "car1";
    Model_Car_Temporary1.save(function(_Object_Error){
        if(_Object_Error){
            throw _Object_Error;
        }
        else{
            console.log(Model_Car_Temporary1.Car_String_Name + " is created.");

            var Model_User_Temporary1 = new Model_User_();
            Model_User_Temporary1.User_String_CarID = Model_Car_Temporary1._id.toString();
            Model_User_Temporary1.User_String_CarName = Model_Car_Temporary1.Car_String_Name;
            Model_User_Temporary1.User_String_Email = "user1@user1";
            Model_User_Temporary1.User_String_Name = "user1";
            Model_User_Temporary1.User_String_Password = Model_User_Temporary1.Void_GenerateHash("user1");
            Model_User_Temporary1.save(function(_Object_Error){
                if(_Object_Error){
                    throw _Object_Error;
                }
                console.log(Model_User_Temporary1.User_String_Name + " is created.");
            });
        }
    });


    var Model_Car_Temporary2 = new Model_Car_();
    Model_Car_Temporary2.Car_String_Name = "car2";
    Model_Car_Temporary2.save(function(_Object_Error){
        if(_Object_Error){
            throw _Object_Error;
        }
        else{
            console.log(Model_Car_Temporary2.Car_String_Name + " is created.");

            var Model_User_Temporary2 = new Model_User_();
            Model_User_Temporary2.User_String_CarID = Model_Car_Temporary2._id.toString();
            Model_User_Temporary2.User_String_CarName = Model_Car_Temporary2.Car_String_Name;
            Model_User_Temporary2.User_String_Email = "user2@user2";
            Model_User_Temporary2.User_String_Name = "user2";
            Model_User_Temporary2.User_String_Password = Model_User_Temporary2.Void_GenerateHash("user2");
            Model_User_Temporary2.save(function(_Object_Error){
                if(_Object_Error){
                    throw _Object_Error;
                }
                console.log(Model_User_Temporary2.User_String_Name + " is created.");
            });
        }
    });



    //Create a dummy arrrays of time slot.
    var Array_String_TimeSlotTemporary1 = ["0815", "1015", "5"];
    var Array_String_TimeSlotTemporary2 = ["1015", "1215", "5"];
    var Array_String_TimeSlotTemporary3 = ["1315", "1515", "5"];
    var Array_String_WorkshopSlotTemporary = [
        Array_String_TimeSlotTemporary1,
        Array_String_TimeSlotTemporary2,
        Array_String_TimeSlotTemporary3
    ];



    var Model_Workshop_Temporary1 = new Model_Workshop_();
    Model_Workshop_Temporary1.Workshop_Array_String_SlotFriday = Array_String_WorkshopSlotTemporary;
    Model_Workshop_Temporary1.Workshop_Array_String_SlotMonday = Array_String_WorkshopSlotTemporary;
    Model_Workshop_Temporary1.Workshop_Array_String_SlotSaturday = Array_String_WorkshopSlotTemporary;
    Model_Workshop_Temporary1.Workshop_Array_String_SlotSunday = Array_String_WorkshopSlotTemporary;
    Model_Workshop_Temporary1.Workshop_Array_String_SlotThursday = Array_String_WorkshopSlotTemporary;
    Model_Workshop_Temporary1.Workshop_Array_String_SlotTuesday = Array_String_WorkshopSlotTemporary;
    Model_Workshop_Temporary1.Workshop_Array_String_SlotWednesday = Array_String_WorkshopSlotTemporary;
    Model_Workshop_Temporary1.Workshop_Number_Latitude = -6.21462;
    Model_Workshop_Temporary1.Workshop_Number_Longitude = 106.84513;
    Model_Workshop_Temporary1.Workshop_String_Name = "workshop1";
    Model_Workshop_Temporary1.save(function(_Object_Error){
        if(_Object_Error){
            throw _Object_Error;
        }
        else{
            console.log(Model_Workshop_Temporary1.Workshop_String_Name + " is created.");

            var Model_Admin_Temporary1 = new Model_Admin_();
            Model_Admin_Temporary1.Admin_Bool_Available = false;
            Model_Admin_Temporary1.Admin_String_Email = "admin1@admin1";
            Model_Admin_Temporary1.Admin_String_Name = "admin1";
            Model_Admin_Temporary1.Admin_String_Password = Model_Admin_Temporary1.Void_GenerateHash("admin1");
            Model_Admin_Temporary1.Admin_String_WorkshopID = Model_Workshop_Temporary1._id.toString();
            Model_Admin_Temporary1.Admin_String_WorkshopName = Model_Workshop_Temporary1.Workshop_String_Name;
            Model_Admin_Temporary1.save(function(_Object_Error){
                if(_Object_Error){
                    throw _Object_Error;
                }
                console.log(Model_Admin_Temporary1.Admin_String_Name + " is created.");
            });
        }
    });



    var Model_Workshop_Temporary2 = new Model_Workshop_();
    Model_Workshop_Temporary2.Workshop_Array_String_SlotFriday = Array_String_WorkshopSlotTemporary;
    Model_Workshop_Temporary2.Workshop_Array_String_SlotMonday = Array_String_WorkshopSlotTemporary;
    Model_Workshop_Temporary2.Workshop_Array_String_SlotSaturday = Array_String_WorkshopSlotTemporary;
    Model_Workshop_Temporary2.Workshop_Array_String_SlotSunday = Array_String_WorkshopSlotTemporary;
    Model_Workshop_Temporary2.Workshop_Array_String_SlotThursday = Array_String_WorkshopSlotTemporary;
    Model_Workshop_Temporary2.Workshop_Array_String_SlotTuesday = Array_String_WorkshopSlotTemporary;
    Model_Workshop_Temporary2.Workshop_Array_String_SlotWednesday = Array_String_WorkshopSlotTemporary;
    Model_Workshop_Temporary2.Workshop_Number_Latitude = -6.21462;
    Model_Workshop_Temporary2.Workshop_Number_Longitude = 106.84513;
    Model_Workshop_Temporary2.Workshop_String_Name = "workshop2";
    Model_Workshop_Temporary2.save(function(_Object_Error){
        if(_Object_Error){
            throw _Object_Error;
        }
        else{
            console.log(Model_Workshop_Temporary2.Workshop_String_Name + " is created.");

            var Model_Admin_Temporary2 = new Model_Admin_();
            Model_Admin_Temporary2.Admin_Bool_Available = false;
            Model_Admin_Temporary2.Admin_String_Email = "admin2@admin2";
            Model_Admin_Temporary2.Admin_String_Name = "admin2";
            Model_Admin_Temporary2.Admin_String_Password = Model_Admin_Temporary2.Void_GenerateHash("admin2");
            Model_Admin_Temporary2.Admin_String_WorkshopID = Model_Workshop_Temporary2._id.toString();
            Model_Admin_Temporary2.Admin_String_WorkshopName = Model_Workshop_Temporary2.Workshop_String_Name;
            Model_Admin_Temporary2.save(function(_Object_Error){
                if(_Object_Error){
                    throw _Object_Error;
                }
                console.log(Model_Admin_Temporary2.Admin_String_Name + " is created.");
            });
        }
    });
}
//|||||||||||||||||||||||||FUNCTIONS TO INITIATES DUMMY DATABASE DATA END|||||||||||||||||||||||||
//|||||||||||||||||||||||||FUNCTIONS TO INITIATES DUMMY DATABASE DATA END|||||||||||||||||||||||||
//|||||||||||||||||||||||||FUNCTIONS TO INITIATES DUMMY DATABASE DATA END|||||||||||||||||||||||||
//|||||||||||||||||||||||||FUNCTIONS TO INITIATES DUMMY DATABASE DATA END|||||||||||||||||||||||||
//|||||||||||||||||||||||||FUNCTIONS TO INITIATES DUMMY DATABASE DATA END|||||||||||||||||||||||||





//Assign back some object.
//I need to reference my Socket.IO object in the general route.
Route_General.Object_SocketIO_Server = Object_SocketIO_Server;




//Export this ExpressJS main application object as module.
module.exports = Object_App;