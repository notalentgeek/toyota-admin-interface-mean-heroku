//This JavaScript is specifically for cosmetic aspects of form
//    in this web application.
//For main form animation.
$(function(){





    $("#form_left_link").click(function(_Object_Event){
        $("#form_left").delay(100).fadeIn(100);
        $("#form_right").fadeOut(100);
        $("#form_right_link").removeClass("active");
        $(this).addClass("active");
        _Object_Event.preventDefault();
    });





    $("#form_right_link").click(function(_Object_Event){
        $("#form_right").delay(100).fadeIn(100);
        $("#form_left").fadeOut(100);
        $("#form_left_link").removeClass("active");
        $(this).addClass("active");
        _Object_Event.preventDefault();
    });





});




//These codes below are for preventing buttons to stay focussed after click.
$(".btn").mouseup(function(){
    $(this).blur();
});





//These codes below are for adding and removing workshop time slot.
var Number_SlotFridayEdit           = 1;
var Number_SlotFridayRegister       = 1;
var Number_SlotMondayEdit           = 1;
var Number_SlotMondayRegister       = 1;
var Number_SlotSaturdayEdit         = 1;
var Number_SlotSaturdayRegister     = 1;
var Number_SlotSundayEdit           = 1;
var Number_SlotSundayRegister       = 1;
var Number_SlotThursdayEdit         = 1;
var Number_SlotThursdayRegister     = 1;
var Number_SlotTuesdayEdit          = 1;
var Number_SlotTuesdayRegister      = 1;
var Number_SlotWednesdayEdit        = 1;
var Number_SlotWednesdayRegister    = 1;





//Specific HTML component generator for string form.
function String_Slot(
    _Number_Index,
    _String_Day,
    _String_Edit_Or_Register
){
    var String_IndexButtonAdd           = "ntg_div_workshop_slot_" + _String_Day + "_" + _String_Edit_Or_Register + "_button_add_" + _Number_Index;
    var String_IndexButtonDelete        = "ntg_div_workshop_slot_" + _String_Day + "_" + _String_Edit_Or_Register + "_button_delete_" + _Number_Index;
    var String_IndexInputSlotAmount     = "ntg_div_workshop_slot_" + _String_Day + "_" + _String_Edit_Or_Register + "_input_slot_amount_" + _Number_Index;
    var String_IndexInputTimeEnd        = "ntg_div_workshop_slot_" + _String_Day + "_" + _String_Edit_Or_Register + "_input_time_end_" + _Number_Index;
    var String_IndexInputTimeStart      = "ntg_div_workshop_slot_" + _String_Day + "_" + _String_Edit_Or_Register + "_input_time_start_" + _Number_Index;
    var String_IndexMain                = "ntg_div_workshop_slot_" + _String_Day + "_" + _String_Edit_Or_Register + "_" + _Number_Index;
    




    //Change _String_Day to capital letter. I meant the first letter.
    var String_Day = _String_Day.charAt(0).toUpperCase() + _String_Day.slice(1) + ".";




    //HTML compression here, http://www.textfixer.com/html/compress-html-compression.php.
    return "<div class=' row ' id=" + String_IndexMain + " > <div class=' col-xs-6 ' > <div class=' input-group ' > <span class=' input-group-addon ntg-debug-dimension-width-px-150 ' > " + String_Day + " </span> <input class=' form-control ntg-debug-dimension-height-px-45 ' id=" + String_IndexInputTimeStart + " name=" + String_IndexInputTimeStart + " placeholder='HHMM' type='text' > <span class=' input-group-addon ' > - </span> <input class=' form-control ntg-debug-dimension-height-px-45 ' id=" + String_IndexInputTimeEnd + " name=" + String_IndexInputTimeEnd + " placeholder='HHMM' type='text' > </div> </div> <div class=' col-xs-2 ntg-debug-padding-left-px-0 ' > <input class=' form-control ntg-debug-dimension-height-px-45 ' id=" + String_IndexInputSlotAmount + " name=" + String_IndexInputSlotAmount + " placeholder='Slot Amount.' type='number' > </div> <div class=' col-xs-2 ntg-debug-padding-left-px-0 ' > <button class=' btn btn-default btn-success form-control ntg-debug-dimension-height-px-45 ' id=" + String_IndexButtonAdd + " type='button' >Add.</button> </div> <div class=' col-xs-2 ntg-debug-padding-left-px-0 ' > <button class=' btn btn-danger btn-default form-control ntg-debug-dimension-height-px-45 ' id=" + String_IndexButtonDelete + " type='button' >Delete.</button> </div> </div>";
};





function Void_ControlSlot(
    _Number_SlotVariable,
    _String_Day,
    _String_Edit_Or_Register
){
    //Function to re - integrate all index if there is a component added or removed.
    function Void_IndexReIntegrateRegister(){
        //Now the messy part!
        //I need to iterate through all remainder HTML component at set the ID back
        //    accordingly.
        //Create the loop first!
        var Array_Object_ChildAfterDelete = $("#ntg_div_workshop_slot_" + _String_Day + "_"+ _String_Edit_Or_Register).children();
        var Number_AmountChild = Array_Object_ChildAfterDelete.length;
        for(var Number_J = 0; Number_J < _Number_SlotVariable; Number_J ++){





            var Number_IndexComponentButton = Number_J + 1;
            




            var Button_Add1Non          = $($($(Array_Object_ChildAfterDelete[Number_J]).children()[2]).children()[0]);
            var Button_Delete1Non       = $($($(Array_Object_ChildAfterDelete[Number_J]).children()[3]).children()[0]);
            var Div_Main1Non            = $(Array_Object_ChildAfterDelete[Number_J]);
            var Input_SlotAmount1Non    = $($($(Array_Object_ChildAfterDelete[Number_J]).children()[1]).children()[0]);
            var Input_TimeEnd1Non       = $($($($(Array_Object_ChildAfterDelete[Number_J]).children()[0]).children()[0]).children()[3]);
            var Input_TimeStart1Non     = $($($($(Array_Object_ChildAfterDelete[Number_J]).children()[0]).children()[0]).children()[1]);
            Button_Add1Non.attr         ("id", "ntg_div_workshop_slot_" + _String_Day + "_" + _String_Edit_Or_Register +"_button_add_" + Number_IndexComponentButton);
            Button_Add1Non.attr         ("name", "ntg_div_workshop_slot_" + _String_Day + "_" + _String_Edit_Or_Register +"_button_add_" + Number_IndexComponentButton);
            Button_Delete1Non.attr      ("id", "ntg_div_workshop_slot_" + _String_Day + "_" + _String_Edit_Or_Register +"_button_delete_" + Number_IndexComponentButton);
            Button_Delete1Non.attr      ("name", "ntg_div_workshop_slot_" + _String_Day + "_" + _String_Edit_Or_Register +"_button_delete_" + Number_IndexComponentButton);
            Div_Main1Non.attr           ("id", "ntg_div_workshop_slot_" + _String_Day + "_" + _String_Edit_Or_Register +"_" + Number_IndexComponentButton);
            Div_Main1Non.attr           ("name", "ntg_div_workshop_slot_" + _String_Day + "_" + _String_Edit_Or_Register +"_" + Number_IndexComponentButton);
            Input_SlotAmount1Non.attr   ("id", "ntg_div_workshop_slot_" + _String_Day + "_" + _String_Edit_Or_Register +"_input_slot_amount_" + Number_IndexComponentButton);
            Input_SlotAmount1Non.attr   ("name", "ntg_div_workshop_slot_" + _String_Day + "_" + _String_Edit_Or_Register +"_input_slot_amount_" + Number_IndexComponentButton);
            Input_TimeEnd1Non.attr      ("id", "ntg_div_workshop_slot_" + _String_Day + "_" + _String_Edit_Or_Register +"_input_time_end_" + Number_IndexComponentButton);
            Input_TimeEnd1Non.attr      ("name", "ntg_div_workshop_slot_" + _String_Day + "_" + _String_Edit_Or_Register +"_input_time_end_" + Number_IndexComponentButton);
            Input_TimeStart1Non.attr    ("id", "ntg_div_workshop_slot_" + _String_Day + "_" + _String_Edit_Or_Register +"_input_time_start_" + Number_IndexComponentButton);
            Input_TimeStart1Non.attr    ("name", "ntg_div_workshop_slot_" + _String_Day + "_" + _String_Edit_Or_Register +"_input_time_start_" + Number_IndexComponentButton);





        }
    }





    //I need to iterate all button based on the count.
    for(var Number_I = 0; Number_I < _Number_SlotVariable; Number_I ++){
        var Number_IndexComponent = Number_I + 1;
        //Remove the previous "click" binder for button delete.
        //Otherwise the binder for new delete button would not be appended.
        $("#ntg_div_workshop_slot_" + _String_Day + "_"+ _String_Edit_Or_Register +"_button_add_" + Number_IndexComponent).unbind("click");
        $("#ntg_div_workshop_slot_" + _String_Day + "_"+ _String_Edit_Or_Register +"_button_delete_" + Number_IndexComponent).unbind("click");
        




        //Controller for add button.
        $("#ntg_div_workshop_slot_" + _String_Day + "_"+ _String_Edit_Or_Register +"_button_add_" + Number_IndexComponent).click(function(){
            //Set the value to be increased by 1.
            _Number_SlotVariable ++;
            //Then append the element there.
            $("#ntg_div_workshop_slot_" + _String_Day + "_"+ _String_Edit_Or_Register).append(String_Slot(
                _Number_SlotVariable,
                _String_Day,
                _String_Edit_Or_Register
            ));
            //Run this function again to set the button click controller on newly added
            //    HTML component.
            Void_ControlSlot(_Number_SlotVariable, _String_Day, _String_Edit_Or_Register);
            Void_IndexReIntegrateRegister();
        });
        //Controller for delete button.
        //Make sure when the Number_IndexComponent is 1 delete button is to reset the form.
        if(Number_IndexComponent == 1){
            $("#ntg_div_workshop_slot_" + _String_Day + "_"+ _String_Edit_Or_Register +"_button_delete_" + Number_IndexComponent).click(function(){
                var Input_SlotAmount1   = $($($($($(this).parent()).parent()).children()[1]).children()[0])
                var Input_TimeEnd1      = $($($($($($(this).parent()).parent()).children()[0]).children()[0]).children()[1])
                var Input_TimeStart1    = $($($($($($(this).parent()).parent()).children()[0]).children()[0]).children()[3])
                Input_SlotAmount1.val("");
                Input_TimeEnd1.val("");
                Input_TimeStart1.val("");
            });
        }
        else if(Number_IndexComponent != 1){
            $("#ntg_div_workshop_slot_" + _String_Day + "_"+ _String_Edit_Or_Register +"_button_delete_" + Number_IndexComponent).click(function(){
                //Set the value to be decreased by 1.
                _Number_SlotVariable --;
                if(_Number_SlotVariable < 1){
                    _Number_SlotVariable = 1;
                }
                //Remove slot form block visually.
                $($($(this).parent()).parent()).remove();
                Void_IndexReIntegrateRegister();
            });
        }
    }
}





Void_ControlSlot(Number_SlotFridayRegister, "friday", "register");
Void_ControlSlot(Number_SlotMondayRegister, "monday", "register");
Void_ControlSlot(Number_SlotSaturdayRegister, "saturday", "register");
Void_ControlSlot(Number_SlotSundayRegister, "sunday", "register");
Void_ControlSlot(Number_SlotThursdayRegister, "thursday", "register");
Void_ControlSlot(Number_SlotTuesdayRegister, "tuesday", "register");
Void_ControlSlot(Number_SlotWednesdayRegister, "wednesday", "register");