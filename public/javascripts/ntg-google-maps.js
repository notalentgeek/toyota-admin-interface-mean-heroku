//|||||||||||||||||||||||||GOOGLE MAPS MAIN PAGE|||||||||||||||||||||||||
//|||||||||||||||||||||||||GOOGLE MAPS MAIN PAGE|||||||||||||||||||||||||
//|||||||||||||||||||||||||GOOGLE MAPS MAIN PAGE|||||||||||||||||||||||||
//|||||||||||||||||||||||||GOOGLE MAPS MAIN PAGE|||||||||||||||||||||||||
//|||||||||||||||||||||||||GOOGLE MAPS MAIN PAGE|||||||||||||||||||||||||
//Google Maps object initialization for the main page.
var Object_Map_Main;
function Void_InitGoogleMaps_Main(){





    Object_Map = new google.maps.Map(document.getElementById("ntg_div_google_maps_main"), {
        center: { lat: -6.21462, lng: 106.84513 },
        zoom: 15
    });





}
//|||||||||||||||||||||||||GOOGLE MAPS MAIN PAGE END|||||||||||||||||||||||||
//|||||||||||||||||||||||||GOOGLE MAPS MAIN PAGE END|||||||||||||||||||||||||
//|||||||||||||||||||||||||GOOGLE MAPS MAIN PAGE END|||||||||||||||||||||||||
//|||||||||||||||||||||||||GOOGLE MAPS MAIN PAGE END|||||||||||||||||||||||||
//|||||||||||||||||||||||||GOOGLE MAPS MAIN PAGE END|||||||||||||||||||||||||





//|||||||||||||||||||||||||GOOGLE MAPS EDIT AND REGISTER WORKSHOP PAGE|||||||||||||||||||||||||
//|||||||||||||||||||||||||GOOGLE MAPS EDIT AND REGISTER WORKSHOP PAGE|||||||||||||||||||||||||
//|||||||||||||||||||||||||GOOGLE MAPS EDIT AND REGISTER WORKSHOP PAGE|||||||||||||||||||||||||
//|||||||||||||||||||||||||GOOGLE MAPS EDIT AND REGISTER WORKSHOP PAGE|||||||||||||||||||||||||
//|||||||||||||||||||||||||GOOGLE MAPS EDIT AND REGISTER WORKSHOP PAGE|||||||||||||||||||||||||
//Google Maps objects initialization for the workshop registration page. 
var Object_Map_EditRegisterWorkshop_1;
var Object_Map_EditRegisterWorkshop_2;
var Object_Marker_EditRegisterWorkshop_1;
var Object_Marker_EditRegisterWorkshop_2;





//Make sure to only use one marker and no more.
function Void_PlaceMarker_EditRegisterWorkshop_1(_Object_Location){
    if(Object_Marker_EditRegisterWorkshop_1){ //Check if the only marker object is a valid object.
        Object_Marker_EditRegisterWorkshop_1.setPosition(_Object_Location);
    }
    else if(!Object_Marker_EditRegisterWorkshop_1){
        Object_Marker_EditRegisterWorkshop_1 = new google.maps.Marker({
            map: Object_Map_EditRegisterWorkshop_1,
            position: _Object_Location
        });
    }

    var Number_OfficeSelectedLatitude = _Object_Location.lat();
    var Number_OfficeSelectedlongitude = _Object_Location.lng();
    console.log("Map 1 Latitude: " + Number_OfficeSelectedLatitude + " Map 1 Longitude: " + Number_OfficeSelectedlongitude);
    var Object_TextInputLatitude = document.getElementById("workshop_number_latitude_edit");
    var Object_TextInputLongitude = document.getElementById("workshop_number_longitude_edit");
    Object_TextInputLatitude.value = Number_OfficeSelectedLatitude;
    Object_TextInputLongitude.value = Number_OfficeSelectedlongitude;
}





function Void_PlaceMarker_EditRegisterWorkshop_2(_Object_Location){
    if(Object_Marker_EditRegisterWorkshop_2){ //Check if the only marker object is a valid object.
        Object_Marker_EditRegisterWorkshop_2.setPosition(_Object_Location);
    }
    else if(!Object_Marker_EditRegisterWorkshop_2){
        Object_Marker_EditRegisterWorkshop_2 = new google.maps.Marker({
            map: Object_Map_EditRegisterWorkshop_2,
            position: _Object_Location
        });
    }

    var Number_OfficeSelectedLatitude = _Object_Location.lat();
    var Number_OfficeSelectedlongitude = _Object_Location.lng();
    console.log("Map 2 Latitude: " + Number_OfficeSelectedLatitude + " Map 2 Longitude: " + Number_OfficeSelectedlongitude);
    var Object_TextInputLatitude = document.getElementById("workshop_number_latitude_register");
    var Object_TextInputLongitude = document.getElementById("workshop_number_longitude_register");
    Object_TextInputLatitude.value = Number_OfficeSelectedLatitude;
    Object_TextInputLongitude.value = Number_OfficeSelectedlongitude;
}





function Void_InitGoogleMaps_EditRegisterWorkshop(){





    //Deal with the edit workshop Google Maps.
    Object_Map_EditRegisterWorkshop_1 = new google.maps.Map(document.getElementById("ntg_div_google_maps_edit_register_workshop_1"), {
        center: { lat: -6.21462, lng: 106.84513 },
        zoom: 15
    });
    google.maps.event.addListener(Object_Map_EditRegisterWorkshop_1, "click", function(_Object_Event){
        Void_PlaceMarker_EditRegisterWorkshop_1(_Object_Event.latLng);
    });





    //So here is the thing with Google Maps API for JavaScript.
    //I need to unhide the registration form first.
    //After the Google Maps for the registration form is loaded
    //    then I will hide back the registration form.
    //These specific codes below is to unhide the registration form.
    //I did this so all .ejs files for each forms stay in the
    //    same structures.
    $(document).ready(function(){
        $("#form_right").removeClass("ntg-debug-display-none");
        $(".ntg-debug-div-content-setting-1").addClass("ntg-debug-overflow-y-hidden");
    });





    //Deal with the register workshop Google Maps.
    Object_Map_EditRegisterWorkshop_2 = new google.maps.Map(document.getElementById("ntg_div_google_maps_edit_register_workshop_2"), {
        center: { lat: -6.21462, lng: 106.84513 },
        zoom: 15
    });
    google.maps.event.addListener(Object_Map_EditRegisterWorkshop_2, "click", function(_Object_Event){
        Void_PlaceMarker_EditRegisterWorkshop_2(_Object_Event.latLng);
    });
    //I need to load the Google Maps first then hide it when the map is finished loading.
    //Otherwise the map will not load at all due to display: none;.
    google.maps.event.addListenerOnce(Object_Map_EditRegisterWorkshop_2, "idle", function(){
        $("#form_right").hide();
        $("#ntg_div_dim_screen").hide();
        $(".ntg-debug-overflow-y-hidden").removeClass("ntg-debug-overflow-y-hidden");
    });





}
//|||||||||||||||||||||||||GOOGLE MAPS EDIT AND REGISTER WORKSHOP PAGE END|||||||||||||||||||||||||
//|||||||||||||||||||||||||GOOGLE MAPS EDIT AND REGISTER WORKSHOP PAGE END|||||||||||||||||||||||||
//|||||||||||||||||||||||||GOOGLE MAPS EDIT AND REGISTER WORKSHOP PAGE END|||||||||||||||||||||||||
//|||||||||||||||||||||||||GOOGLE MAPS EDIT AND REGISTER WORKSHOP PAGE END|||||||||||||||||||||||||
//|||||||||||||||||||||||||GOOGLE MAPS EDIT AND REGISTER WORKSHOP PAGE END|||||||||||||||||||||||||