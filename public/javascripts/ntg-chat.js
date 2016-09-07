//Chat logic.
var String_Delimeter = "*!@#^%$&*(*!@#^%$&*(*!@#^%$&*(";
$("#ntg_form_chat_tool").submit(function(_Object_Event){





    _Object_Event.preventDefault();
    var String_MessageNew = $("#ntg_input_chat_tool").val(); //Take the value of the chat input.
    if(String_MessageNew){ //Do simple String validation before sending message to chat server.
        //Sent an SocketIO event with the value of chat input as a "parameter".
        Object_SocketIO_Client.emit(
            "ntg_event_message_sent_to_server",
            String_NameDisplay + String_Delimeter + $("#ntg_input_chat_tool").val()
        );
    }
    $("#ntg_input_chat_tool").val(""); //Empty the send message text input.





    return false;





});





//These codes below happened if this object received message.
Object_SocketIO_Client.on("ntg_event_message_sent_to_server", function(_Object_DataReceived){





    var String_Received = _Object_DataReceived;
    var Array_String_Received = String_Received.split(String_Delimeter);





    //Testing String received, then split it into 2 to prepare right and left chat alignment.
    /*
    console.log("=====TEST SPLIT=====");
    console.log(Array_String_Received[0]);
    console.log(Array_String_Received[1]);
    console.log("=====TEST SPLIT=====");
    */





    //If this user received its own message, that just sent.
    if(String_NameDisplay == Array_String_Received[0]){
        Object_ChatBoxCurrent.append($("<li class='list-group-item text-left'><strong>" + Array_String_Received[0] + ":</strong> " + Array_String_Received[1] + "</li>"));
    }
    else if(String_NameDisplay != Array_String_Received[0]){
        Object_ChatBoxCurrent.append($("<li class='list-group-item text-right'>" + Array_String_Received[1]  + "<strong> :" + Array_String_Received[0] + "</li>"));
    }
    




    //These two lines of codes are for scrolling the chat box to the newest chat received.
    var Object_Element = document.getElementById(Object_ChatBoxCurrent.attr("id"));
    Object_Element.scrollTop = Object_Element.scrollHeight;





});





//This is the currently selected chat box.
var Object_ChatBoxCurrent = undefined;
//Initiate and setting so that when the user <a></a> is clicked
//    new chat box appeared.
//At this moment the only way to change chat box is via these buttons.
//Make sure that everything happens after the Angular components load.
setTimeout(Void_AfterAngularLoad, 0);
//This is the HTML code for the chat box.
//I will populate this with <li></li> everytime there is an incoming chat.
var String_DivChatBox = "<ul class=' list-group ntg-debug-margin-0 ' > </ul>";
//Put everything that want to be executed after Angular components load here.
function Void_AfterAngularLoad(){

    Void_ReInitiateUserListButtonChat();

}





//For everytime there is user added into the database.
//In case the system is a real time.
//At this moment 6th September 2016 the system is not yet a real time function.
function Void_ReInitiateUserListButtonChat(){
    var Object_NTGDivChat = $("#ntg_div_chat_box");
    var Array_Object_NTGDivChatChildren = Object_NTGDivChat.children();
    var Array_Object_NTGULUserChildren = $("#ntg_ul_user").children();
    var Number_NTGDivChatChildrenLength = Array_Object_NTGDivChatChildren.length;
    var Number_NTGULUserChildrenLength = Array_Object_NTGULUserChildren.length;





    function Function_ButtonCallback(_Number_Index){
        return function(){





            //Set the ID.
            var String_AdminName = $("#ntg_div_string_name_display").html();
            var String_UserName = $($($($($(Array_Object_NTGULUserChildren[_Number_Index]).children()[0]).children()[0]).children()[1]).children()[0]).html();
            var String_ULUserIDRough = ("ntg_ul_chat_" + String_AdminName + "_" + String_UserName).replace(" ", "");
            var String_ULUserIDTrimmed =
                String_ULUserIDRough
                    .replace("(", "") //Remove (.
                    .replace(")", "") //Remove ).
                    .replace("@", "") //Remove @.
                    .replace(/ /g,"") //Remove all spaces.
                    .replace(/(\r\n|\n|\r)/gm,"") //Remove all line breaks.
                    .replace(/\s+/, "") //This is also to remove all spaces (honestly, I only used this as safety measures lol).
                    .split(".").join(""); //Removes all dots.





            //Here I need to add a new chat box.
            //However, I need to add a class of ntg-display-none to all
            //    other chat box.
            //Hence, I need to list all the available chat box first.
            var Boolean_Exist = false;
            Array_Object_NTGDivChatChildren = Object_NTGDivChat.children();
            Number_NTGDivChatChildrenLength = Object_NTGDivChat.children().length;





            //Do a loop to set everything back into hidden.
            for(var Number_J = 0; Number_J < Number_NTGDivChatChildrenLength; Number_J ++){





                $(Array_Object_NTGDivChatChildren[Number_J]).removeClass("ntg-debug-display-block");
                $(Array_Object_NTGDivChatChildren[Number_J]).addClass("ntg-debug-display-none");
                if($(Array_Object_NTGDivChatChildren[Number_J]).attr("id") == String_ULUserIDTrimmed){





                    Boolean_Exist = true;
                    Object_ChatBoxCurrent = $(Array_Object_NTGDivChatChildren[Number_J]);
                    Object_ChatBoxCurrent.removeClass("ntg-debug-display-none");
                    Object_ChatBoxCurrent.addClass("ntg-debug-display-block");





                }





            }





            //Preventing the application to add multiple chat box.
            //If there is a chatbox exist with the same name than
            //    this application should not add additional chat box.
            if(Boolean_Exist == false){





                //After all chat box is hidden then try to add the new chat box.
                var Object_NTGDivChatAppend = $(String_DivChatBox).appendTo(Object_NTGDivChat);
                Array_Object_NTGDivChatChildren = Object_NTGDivChat.children();
                Number_NTGDivChatChildrenLength = Object_NTGDivChat.children().length;
                //Get the newest appened object.
                Object_ChatBoxCurrent = $(Object_NTGDivChatAppend);





                //I need to becareful on how to assign ID here. Otherwise the loop will be failed.
                Object_ChatBoxCurrent.attr(
                    "id",
                    String_ULUserIDTrimmed
                );
                Object_ChatBoxCurrent.removeClass("ntg-debug-display-none");
                Object_ChatBoxCurrent.addClass("ntg-debug-display-block");





            }





        }
    }





    for(var Number_I = 0; Number_I < Number_NTGULUserChildrenLength; Number_I ++){





        //Bind click at the <a></a>.
        //Assign object to the clicked <a></a>.
        var Object_AUser = $($(Array_Object_NTGULUserChildren[Number_I]).children()[0]);
        Object_AUser.click(Function_ButtonCallback(Number_I));





    }
}