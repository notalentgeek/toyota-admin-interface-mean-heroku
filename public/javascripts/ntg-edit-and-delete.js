//Create a basic function for Remove and update database.
function Void_Delete_Edit_And_Reset(
    _String_IDButtonEdit,
    _String_IDButtonRemove,
    _String_IDButtonReset,
    _String_IDButtonResetRegister,
    _String_IDSelectObject,
    _String_URLAPI,
    _String_URLRedirect
){





    //Take the value from the select HTML component.
    var String_ValueFromSelect = $(_String_IDSelectObject).val();





    //Capture what thing are seleted in the HTML select component.
    $(_String_IDSelectObject).change(function(){





        //Take the value in the String.
        String_ValueFromSelect = $(_String_IDSelectObject).val();
        //Specifically for PUT method we need to know the ID to the thing that is selected.
        //So everytime the select HTML value is changed, then changed the action URL value.
        //    according to the selected thing id.
        //The result from String_ValueFromSelect is "String:id_here".
        //Hence we need to remove the "String:".
        $("#form_left").attr("action", _String_URLAPI + String_ValueFromSelect.toLowerCase().split("string:").pop());





    });





    //This is for the PUT update method.
    //These codes can modify the content of dataabase.
    $(_String_IDButtonEdit).click(function(){





        //Edit workshop slot form.
        var Array_String_WorkshopSlotFridayAmountChildren = $("#ntg_div_workshop_slot_friday_edit").children().length;
        var Array_String_WorkshopSlotMondayAmountChildren = $("#ntg_div_workshop_slot_monday_edit").children().length;
        var Array_String_WorkshopSlotSaturdayAmountChildren = $("#ntg_div_workshop_slot_saturday_edit").children().length;
        var Array_String_WorkshopSlotSundayAmountChildren = $("#ntg_div_workshop_slot_sunday_edit").children().length;
        var Array_String_WorkshopSlotThursdayAmountChildren = $("#ntg_div_workshop_slot_thursday_edit").children().length;
        var Array_String_WorkshopSlotTuesdayAmountChildren = $("#ntg_div_workshop_slot_tuesday_edit").children().length;
        var Array_String_WorkshopSlotWednesdayAmountChildren = $("#ntg_div_workshop_slot_wednesday_edit").children().length;
        var Array_String_WorkshopSlotAmountChildren = [
            Array_String_WorkshopSlotFridayAmountChildren,
            Array_String_WorkshopSlotMondayAmountChildren,
            Array_String_WorkshopSlotSaturdayAmountChildren,
            Array_String_WorkshopSlotSundayAmountChildren,
            Array_String_WorkshopSlotThursdayAmountChildren,
            Array_String_WorkshopSlotTuesdayAmountChildren,
            Array_String_WorkshopSlotWednesdayAmountChildren
        ];
        var Array_String_Day = [
            "friday",
            "monday",
            "saturday",
            "sunday",
            "thursday",
            "tuesday",
            "wednesday"
        ];
        var Array_String_SlotFriday = [];
        var Array_String_SlotMonday = [];
        var Array_String_SlotSaturday = [];
        var Array_String_SlotSunday = [];
        var Array_String_SlotThursday = [];
        var Array_String_SlotTuesday = [];
        var Array_String_SlotWednesday = [];
        var Array_String_Slot = [
            Array_String_SlotFriday,
            Array_String_SlotMonday,
            Array_String_SlotSaturday,
            Array_String_SlotSunday,
            Array_String_SlotThursday,
            Array_String_SlotTuesday,
            Array_String_SlotWednesday
        ];
        for(var Number_I = 0; Number_I < Array_String_Day.length; Number_I ++){
            for(var Number_J= 0; Number_J < Array_String_WorkshopSlotAmountChildren[Number_I]; Number_J ++){
                var String_Array_Temporary = [];
                var Number_IndexTemporary = Number_J + 1;
                String_Array_Temporary.push($("#ntg_div_workshop_slot_" + Array_String_Day[Number_I] + "_edit_input_time_start_" + Number_IndexTemporary).val());
                String_Array_Temporary.push($("#ntg_div_workshop_slot_" + Array_String_Day[Number_I] + "_edit_input_time_end_" + Number_IndexTemporary).val());
                String_Array_Temporary.push($("#ntg_div_workshop_slot_" + Array_String_Day[Number_I] + "_edit_input_slot_amount_" + Number_IndexTemporary).val());
                Array_String_Slot[Number_I].push(String_Array_Temporary);
            }
        }


        $.ajax({

            //Just spam every possible value here.
            data: ({

                "car_string_name_edit": $("#car_string_name_edit").val(),
                "user_string_carid_edit": $("#user_string_carid_edit").val(),
                "user_string_carname_edit": $("#user_string_carname_edit:selected").text(),
                "user_string_email_edit": $("#user_string_email_edit").val(),
                "user_string_name_edit": $("#user_string_name_edit").val(),
                "user_string_password_edit": $("#user_string_password_edit").val(),
                "workshop_array_string_slot_friday": Array_String_Slot[0],
                "workshop_array_string_slot_monday": Array_String_Slot[1],
                "workshop_array_string_slot_saturday": Array_String_Slot[2],
                "workshop_array_string_slot_sunday": Array_String_Slot[3],
                "workshop_array_string_slot_thursday": Array_String_Slot[4],
                "workshop_array_string_slot_tuesday": Array_String_Slot[5],
                "workshop_array_string_slot_wednesday": Array_String_Slot[6],
                "workshop_number_latitude_edit": $("#workshop_number_latitude_edit").val(),
                "workshop_number_longitude_edit": $("#workshop_number_longitude_edit").val(),
                "workshop_string_name_edit": $("#workshop_string_name_edit").val()

            }),
            dataType: "JSON", //This line is important/
            success: function(_Object_Result){ }, //What happened when the update process success.
            type: "PUT",
            url: _String_URLAPI + String_ValueFromSelect.toLowerCase().split("string:").pop()

        });





        //Redirect when thing goes failure or success.
        window.location.replace(_String_URLRedirect);





    });





    //Delete button control.
    //These codes will delete thing that is selected in the HTML select box.
    $(_String_IDButtonRemove).click(function(){





        $.ajax({
            success: function(_Object_Result){ },
            type: "DELETE",
            url: _String_URLAPI + String_ValueFromSelect.toLowerCase().split("string:").pop()
        });



        window.location.replace(_String_URLRedirect);





    });





}





//Make the control for car, user, and workshop.
Void_Delete_Edit_And_Reset(
    "#ntg_button_edit_car",
    "#ntg_button_remove_car",
    "#ntg_button_reset_car",
    "#ntg_button_reset_car_register",
    "#ntg_select_car",
    "/api/cars/",
    "/page_edit_register_car"
);
Void_Delete_Edit_And_Reset(
    "#ntg_button_edit_user",
    "#ntg_button_remove_user",
    "#ntg_button_reset_user",
    "#ntg_button_reset_user_register",
    "#ntg_select_user",
    "/api/users/",
    "/page_edit_register_user"
);
Void_Delete_Edit_And_Reset(
    "#ntg_button_edit_workshop",
    "#ntg_button_remove_workshop",
    "#ntg_button_reset_workshop",
    "#ntg_button_reset_workshop_register",
    "#ntg_select_workshop",
    "/api/workshops/",
    "/page_edit_register_workshop"
);