//SocketIO chat object and logic.
var Object_SocketIO_Client = io.connect();




Object_SocketIO_Client.on("ntg_event_offline_admin", function(_Object_DataReceived){
    $("#" + _Object_DataReceived)
        .addClass("ntg-debug-color-red")
        .removeClass("ntg-debug-color-green");
    //For some reason I cannot use JQuery here.
    if(
        document.getElementById(_Object_DataReceived).innerHTML !== null ||
        document.getElementById(_Object_DataReceived).innerHTML !== undefined
    ){
        document.getElementById(_Object_DataReceived).innerHTML = "false.";
    }
});




Object_SocketIO_Client.on("ntg_event_online_admin", function(_Object_DataReceived){
    $("#" + _Object_DataReceived)
        .addClass("ntg-debug-color-green")
        .removeClass("ntg-debug-color-red");
    //For some reason I cannot use JQuery here.
    if(
        document.getElementById(_Object_DataReceived).innerHTML !== null ||
        document.getElementById(_Object_DataReceived).innerHTML !== undefined
    ){
        document.getElementById(_Object_DataReceived).innerHTML = "true.";
    }
});