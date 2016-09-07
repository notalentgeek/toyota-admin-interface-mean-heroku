//Workshop in admin registration form.
var Object_ResultWorkshopAdmin = undefined;
angular.module("ng_app_page_login_register_admin", [])
.controller(
    "ng_controller_page_login_register_admin",
    function($scope, $http){
        $scope.ng_model_select_workshop = null;
        $scope.ng_options_select_workshop = [];

        $http(
            {
                data: { applicationId: 3 },
                method: "GET",
                url: "/api/workshops"
            }
        )
        .success(
            function(_Object_Result){
                $scope.ng_options_select_workshop = _Object_Result;
                Object_ResultWorkshopAdmin = _Object_Result;
            }
        );
    }
);
$("#admin_string_workshopname_register").change(function(){
    var Number_Index = $("#admin_string_workshopname_register").prop("selectedIndex");
    $("#admin_string_workshopid_register").val(Object_ResultWorkshopAdmin[Number_Index - 1]._id);
});





//Car.
var Object_ResultCar = undefined;
angular.module("ng_app_page_edit_register_car", [])
.controller(
    "ng_controller_page_edit_register_car",
    function($scope, $http){
        $scope.ng_model_select_car = null;
        $scope.ng_options_select_car = [];

        $http(
            {
                data: { applicationId: 3 },
                method: "GET",
                url: "/api/cars"
            }
        )
        .success(
            function(_Object_Result){
                $scope.ng_options_select_car = _Object_Result;
                Object_ResultCar = _Object_Result;
            }
        );
    }
);
$("#ntg_select_car").change(function(){
    var Number_Index = $("#ntg_select_car").prop("selectedIndex");
    $("#car_string_name_edit").val(Object_ResultCar[Number_Index - 1].Car_String_Name);
});




//User.
var Object_ResultUser = undefined;
var Object_ResultUserEditCar = undefined;
angular.module("ng_app_page_edit_register_user", []).controller(
    "ng_controller_select_user",
    function($scope, $http){
        $scope.ng_model_select_user = null;
        $scope.ng_options_select_user = [];

        $http(
            {
                data: { applicationId: 3 },
                method: "GET",
                url: "/api/users"
            }
        )
        .success(
            function(_Object_Result){
                $scope.ng_options_select_user = _Object_Result;
                Object_ResultUser = _Object_Result;
            }
        );
    }
);
angular.module("ng_app_page_edit_register_user").controller(
    "ng_controller_select_car_edit",
    function($scope, $http){
        $scope.ng_model_select_car_edit = null;
        $scope.ng_options_select_car_edit = [];

        $http(
            {
                data: { applicationId: 3 },
                method: "GET",
                url: "/api/cars"
            }
        )
        .success(
            function(_Object_Result){
                $scope.ng_options_select_car_edit = _Object_Result;
                Object_ResultUserEditCar = _Object_Result;
            }
        );
    }
);
angular.module("ng_app_page_edit_register_user").controller(
    "ng_controller_select_car_edit",
    function($scope, $http){
        $scope.ng_model_select_car_edit = null;
        $scope.ng_options_select_car_edit = [];

        $http(
            {
                data: { applicationId: 3 },
                method: "GET",
                url: "/api/cars"
            }
        )
        .success(
            function(_Object_Result){
                $scope.ng_options_select_car_edit = _Object_Result;
                Object_ResultUserEditCar = _Object_Result;
            }
        );
    }
);
angular.module("ng_app_page_edit_register_user").controller(
    "ng_controller_select_car_register",
    function($scope, $http){
        $scope.ng_model_select_car_register = null;
        $scope.ng_options_select_car_register = [];

        $http(
            {
                data: { applicationId: 3 },
                method: "GET",
                url: "/api/cars"
            }
        )
        .success(
            function(_Object_Result){
                $scope.ng_options_select_car_register = _Object_Result;
                Object_ResultUserEditCar = _Object_Result;
            }
        );
    }
);
$("#ntg_select_user").change(function(){
    var Number_Index = $("#ntg_select_user").prop("selectedIndex");
    $("#user_string_carid_edit").val(Object_ResultUser[Number_Index - 1].User_String_CarID);
    console.log(Object_ResultUser[Number_Index - 1].User_String_CarName);
    console.log(Object_ResultUser[Number_Index - 1].User_String_CarID);
    $("#user_string_carname_edit option").filter(function(){
        return $(this).text() == Object_ResultUser[Number_Index - 1].User_String_CarName; 
    }).prop("selected", true);
    $("#user_string_email_edit").val(Object_ResultUser[Number_Index - 1].User_String_Email);
    $("#user_string_name_edit").val(Object_ResultUser[Number_Index - 1].User_String_Name);
});
$("#user_string_carname_edit").change(function(){
    var Number_Index = $("#user_string_carname_edit").prop("selectedIndex");
    $("#user_string_carid_edit").val(Object_ResultUserEditCar[Number_Index - 1]._id);
});
$("#user_string_carname_register").change(function(){
    var Number_Index = $("#user_string_carname_register").prop("selectedIndex");
    $("#user_string_carid_register").val(Object_ResultUserEditCar[Number_Index - 1]._id);
});




//Workshop.
var Object_ResultWorkshop = undefined;
angular.module("ng_app_page_edit_register_workshop", [])
.controller(
    "ng_controller_page_edit_register_workshop",
    function($scope, $http){
        $scope.ng_model_select_workshop = null;
        $scope.ng_options_select_workshop = [];

        $http(
            {
                data: { applicationId: 3 },
                method: "GET",
                url: "/api/workshops"
            }
        )
        .success(
            function(_Object_Result){
                $scope.ng_options_select_workshop = _Object_Result;
                Object_ResultWorkshop = _Object_Result;
            }
        );
    }
);
//Specifically for workshop when there is change in the selector box
//    also move the marker into the currently seelcted workshop.
$("#ntg_select_workshop").change(function(){
    var Number_Index = $("#ntg_select_workshop").prop("selectedIndex");

    //Array of days sort in alphabetically.
    var Array_String_Day = ["friday", "monday", "saturday", "sunday", "thursday", "tuesday", "wednesday"];
    //Current elements before new value are chosen.
    //Loop until the children length is only 1.
    //Clear and delete everything.
    for(var Number_I = 0; Number_I < Array_String_Day.length; Number_I ++){
        while($("#ntg_div_workshop_slot_" + Array_String_Day[Number_I] + "_edit").children().length > 1){
            $($("#ntg_div_workshop_slot_" + Array_String_Day[Number_I] + "_edit").children()[$("#ntg_div_workshop_slot_" + Array_String_Day[Number_I] + "_edit").children().length - 1]).remove();
        }
    }
    //Here I want to populate how many select out there.
    //First I need to know how many data entry are there per workshop PER DAY.
    //I will use this number to iterate the amount of necessary slot form.
    var Array_Object_SlotFridayEdit = Object_ResultWorkshop[Number_Index - 1].Workshop_Array_String_SlotFriday;
    var Array_Object_SlotMondayEdit = Object_ResultWorkshop[Number_Index - 1].Workshop_Array_String_SlotMonday;
    var Array_Object_SlotSaturdayEdit = Object_ResultWorkshop[Number_Index - 1].Workshop_Array_String_SlotSaturday;
    var Array_Object_SlotSundayEdit = Object_ResultWorkshop[Number_Index - 1].Workshop_Array_String_SlotSunday;
    var Array_Object_SlotThursdayEdit = Object_ResultWorkshop[Number_Index - 1].Workshop_Array_String_SlotThursday;
    var Array_Object_SlotTuesdayEdit = Object_ResultWorkshop[Number_Index - 1].Workshop_Array_String_SlotTuesday;
    var Array_Object_SlotWednesdayEdit = Object_ResultWorkshop[Number_Index - 1].Workshop_Array_String_SlotWednesday;
    //Create array so that it is easy to manage codes.
    //Note that the index must be according to each array.
    //For example "friday" in Array_String_Day is at index 0, hence Number_SlotFridayEditLength
    //    should also at index 0.
    //For practical purpose just sort the day alphabetically.
    var Array_Number_SlotEdit = [
        Array_Object_SlotFridayEdit,
        Array_Object_SlotMondayEdit,
        Array_Object_SlotSaturdayEdit,
        Array_Object_SlotSundayEdit,
        Array_Object_SlotThursdayEdit,
        Array_Object_SlotTuesdayEdit,
        Array_Object_SlotWednesdayEdit
    ];
    var Array_Number_SlotEditLenght = [
        Array_Object_SlotFridayEdit.length,
        Array_Object_SlotMondayEdit.length,
        Array_Object_SlotSaturdayEdit.length,
        Array_Object_SlotSundayEdit.length,
        Array_Object_SlotThursdayEdit.length,
        Array_Object_SlotTuesdayEdit.length,
        Array_Object_SlotWednesdayEdit.length
    ];
    var Array_String_DivSlot = [
        "#ntg_div_workshop_slot_" + Array_String_Day[0] + "_edit",
        "#ntg_div_workshop_slot_" + Array_String_Day[1] + "_edit",
        "#ntg_div_workshop_slot_" + Array_String_Day[2] + "_edit",
        "#ntg_div_workshop_slot_" + Array_String_Day[3] + "_edit",
        "#ntg_div_workshop_slot_" + Array_String_Day[4] + "_edit",
        "#ntg_div_workshop_slot_" + Array_String_Day[5] + "_edit",
        "#ntg_div_workshop_slot_" + Array_String_Day[6] + "_edit"
    ];
    var Array_String_DivSlotButtonAdd = [
        "#ntg_div_workshop_slot_" + Array_String_Day[0] + "_edit_button_add_",
        "#ntg_div_workshop_slot_" + Array_String_Day[1] + "_edit_button_add_",
        "#ntg_div_workshop_slot_" + Array_String_Day[2] + "_edit_button_add_",
        "#ntg_div_workshop_slot_" + Array_String_Day[3] + "_edit_button_add_",
        "#ntg_div_workshop_slot_" + Array_String_Day[4] + "_edit_button_add_",
        "#ntg_div_workshop_slot_" + Array_String_Day[5] + "_edit_button_add_",
        "#ntg_div_workshop_slot_" + Array_String_Day[6] + "_edit_button_add_"
    ];
    var Array_String_DivSlotButtonDelete = [
        "#ntg_div_workshop_slot_" + Array_String_Day[0] + "_edit_button_delete_",
        "#ntg_div_workshop_slot_" + Array_String_Day[1] + "_edit_button_delete_",
        "#ntg_div_workshop_slot_" + Array_String_Day[2] + "_edit_button_delete_",
        "#ntg_div_workshop_slot_" + Array_String_Day[3] + "_edit_button_delete_",
        "#ntg_div_workshop_slot_" + Array_String_Day[4] + "_edit_button_delete_",
        "#ntg_div_workshop_slot_" + Array_String_Day[5] + "_edit_button_delete_",
        "#ntg_div_workshop_slot_" + Array_String_Day[6] + "_edit_button_delete_"
    ];
    var Array_String_DivSlotInputSlot = [
        "#ntg_div_workshop_slot_" + Array_String_Day[0] + "_edit_input_slot_amount_",
        "#ntg_div_workshop_slot_" + Array_String_Day[1] + "_edit_input_slot_amount_",
        "#ntg_div_workshop_slot_" + Array_String_Day[2] + "_edit_input_slot_amount_",
        "#ntg_div_workshop_slot_" + Array_String_Day[3] + "_edit_input_slot_amount_",
        "#ntg_div_workshop_slot_" + Array_String_Day[4] + "_edit_input_slot_amount_",
        "#ntg_div_workshop_slot_" + Array_String_Day[5] + "_edit_input_slot_amount_",
        "#ntg_div_workshop_slot_" + Array_String_Day[6] + "_edit_input_slot_amount_"
    ];
    var Array_String_DivSlotInputTimeEnd = [
        "#ntg_div_workshop_slot_" + Array_String_Day[0] + "_edit_input_time_end_",
        "#ntg_div_workshop_slot_" + Array_String_Day[1] + "_edit_input_time_end_",
        "#ntg_div_workshop_slot_" + Array_String_Day[2] + "_edit_input_time_end_",
        "#ntg_div_workshop_slot_" + Array_String_Day[3] + "_edit_input_time_end_",
        "#ntg_div_workshop_slot_" + Array_String_Day[4] + "_edit_input_time_end_",
        "#ntg_div_workshop_slot_" + Array_String_Day[5] + "_edit_input_time_end_",
        "#ntg_div_workshop_slot_" + Array_String_Day[6] + "_edit_input_time_end_"
    ];
    var Array_String_DivSlotInputTimeStart = [
        "#ntg_div_workshop_slot_" + Array_String_Day[0] + "_edit_input_time_start_",
        "#ntg_div_workshop_slot_" + Array_String_Day[1] + "_edit_input_time_start_",
        "#ntg_div_workshop_slot_" + Array_String_Day[2] + "_edit_input_time_start_",
        "#ntg_div_workshop_slot_" + Array_String_Day[3] + "_edit_input_time_start_",
        "#ntg_div_workshop_slot_" + Array_String_Day[4] + "_edit_input_time_start_",
        "#ntg_div_workshop_slot_" + Array_String_Day[5] + "_edit_input_time_start_",
        "#ntg_div_workshop_slot_" + Array_String_Day[6] + "_edit_input_time_start_"
    ];
    //This is a function to re - integrate all index for all buttons in the edit form.
    function Void_IndexReIntegrateEdit(_Number_IndexDay){
        //First thing is to re arrange the naming convention of id and name of all form in the slot edit form.
        //Then unbind the click control.
        for(var Number_K = 0; Number_K < $("#ntg_div_workshop_slot_" + Array_String_Day[_Number_IndexDay] + "_edit").children().length; Number_K ++){
            var Number_IndexTemporary = Number_K + 1;
            var Object_SlotTemporary = $($("#ntg_div_workshop_slot_" + Array_String_Day[_Number_IndexDay] + "_edit").children()[Number_K]);
            Object_SlotTemporary.attr("id", "ntg_div_workshop_slot_" + Array_String_Day[_Number_IndexDay] + "_edit_" + Number_IndexTemporary);
            Object_SlotTemporary.attr("name", "ntg_div_workshop_slot_" + Array_String_Day[_Number_IndexDay] + "_edit_" + Number_IndexTemporary);
            $($($(Object_SlotTemporary.children()[0]).children()[0]).children()[1]).attr("id", "ntg_div_workshop_slot_" + Array_String_Day[_Number_IndexDay] + "_edit_input_time_start_" + Number_IndexTemporary);
            $($($(Object_SlotTemporary.children()[0]).children()[0]).children()[1]).attr("name", "ntg_div_workshop_slot_" + Array_String_Day[_Number_IndexDay] + "_edit_input_time_start_" + Number_IndexTemporary);
            $($($(Object_SlotTemporary.children()[0]).children()[0]).children()[3]).attr("id", "ntg_div_workshop_slot_" + Array_String_Day[_Number_IndexDay] + "_edit_input_time_end_" + Number_IndexTemporary);
            $($($(Object_SlotTemporary.children()[0]).children()[0]).children()[3]).attr("name", "ntg_div_workshop_slot_" + Array_String_Day[_Number_IndexDay] + "_edit_input_time_end_" + Number_IndexTemporary);
            $($(Object_SlotTemporary.children()[1]).children()[0]).attr("id", "ntg_div_workshop_slot_" + Array_String_Day[_Number_IndexDay] + "_edit_input_slot_amount_" + Number_IndexTemporary);
            $($(Object_SlotTemporary.children()[1]).children()[0]).attr("name", "ntg_div_workshop_slot_" + Array_String_Day[_Number_IndexDay] + "_edit_input_slot_amount_" + Number_IndexTemporary);
            $(Object_SlotTemporary.children()[2]).attr("id", "ntg_div_workshop_slot_" + Array_String_Day[_Number_IndexDay] + "_edit_button_add" + Number_IndexTemporary);
            $(Object_SlotTemporary.children()[2]).attr("name", "ntg_div_workshop_slot_" + Array_String_Day[_Number_IndexDay] + "_edit_button_add" + Number_IndexTemporary);
            $(Object_SlotTemporary.children()[2]).unbind("click");
            $(Object_SlotTemporary.children()[3]).attr("id", "ntg_div_workshop_slot_" + Array_String_Day[_Number_IndexDay] + "_edit_button_delete" + Number_IndexTemporary);
            $(Object_SlotTemporary.children()[3]).attr("name", "ntg_div_workshop_slot_" + Array_String_Day[_Number_IndexDay] + "_edit_button_delete" + Number_IndexTemporary);
            $(Object_SlotTemporary.children()[3]).unbind("click");



            $(Object_SlotTemporary.children()[2]).click(function(){
                $($("#ntg_div_workshop_slot_" + Array_String_Day[_Number_IndexDay] + "_edit")).append(String_Slot(
                    $("#ntg_div_workshop_slot_" + Array_String_Day[_Number_IndexDay] + "_edit").children().length,
                    Array_String_Day[_Number_IndexDay],
                    "edit"
                ));
                Void_IndexReIntegrateEdit(_Number_IndexDay);
            });
            $(Object_SlotTemporary.children()[3]).click(function(){
                if(Number_IndexTemporary == 1){
                    $($($(Object_SlotTemporary.children()[0]).children()[0]).children()[1]).val("");
                    $($($(Object_SlotTemporary.children()[0]).children()[0]).children()[3]).val("");
                    $($(Object_SlotTemporary.children()[1]).children()[0]).val("");
                }
                else if(Number_IndexTemporary > 1){
                    $($(this).parent()).remove();
                    Void_IndexReIntegrateEdit(_Number_IndexDay);
                }
            });
        }
    }
    //Loop to create slot HTML component.
    for(var Number_I = 0; Number_I < Array_String_Day.length; Number_I ++){
        for(var Number_J = 0; Number_J < Array_Number_SlotEditLenght[Number_I]; Number_J ++){
            var Number_IDTemporary = Number_J + 1;
            if(Number_IDTemporary > 1){
                $(Array_String_DivSlot[Number_I]).append(String_Slot(
                    Number_IDTemporary,
                    Array_String_Day[Number_I],
                    "edit"
                ));
            }

            $(Array_String_DivSlotInputSlot[Number_I] + Number_IDTemporary).val(Array_Number_SlotEdit[Number_I][Number_J][2]);
            $(Array_String_DivSlotInputTimeEnd[Number_I] + Number_IDTemporary).val(Array_Number_SlotEdit[Number_I][Number_J][1]);
            $(Array_String_DivSlotInputTimeStart[Number_I] + Number_IDTemporary).val(Array_Number_SlotEdit[Number_I][Number_J][0]);
            Void_IndexReIntegrateEdit(Number_I);
        }
    }



    $("#workshop_number_latitude_edit").val(Object_ResultWorkshop[Number_Index - 1].Workshop_Number_Latitude);
    $("#workshop_number_longitude_edit").val(Object_ResultWorkshop[Number_Index - 1].Workshop_Number_Longitude);
    $("#workshop_string_name_edit").val(Object_ResultWorkshop[Number_Index - 1].Workshop_String_Name);

    //Because of Object_Marker_EditRegisterWorkshop_1 I need to load the Google Maps JavaScript file first then
    //    set this JavaScript.
    if(Object_Marker_EditRegisterWorkshop_1 === undefined){
        Object_Marker_EditRegisterWorkshop_1 = new google.maps.Marker({
            map: Object_Map_EditRegisterWorkshop_1,
            position: new google.maps.LatLng(
                Object_ResultWorkshop[Number_Index - 1].Workshop_Number_Latitude,
                Object_ResultWorkshop[Number_Index - 1].Workshop_Number_Longitude
            )
        });
    }
    else{
        Object_Marker_EditRegisterWorkshop_1.setPosition(new google.maps.LatLng(
            Object_ResultWorkshop[Number_Index - 1].Workshop_Number_Latitude,
            Object_ResultWorkshop[Number_Index - 1].Workshop_Number_Longitude
        ));
    }
    Object_Map_EditRegisterWorkshop_1.panTo(new google.maps.LatLng(
        Object_ResultWorkshop[Number_Index - 1].Workshop_Number_Latitude,
        Object_ResultWorkshop[Number_Index - 1].Workshop_Number_Longitude
    ));
});