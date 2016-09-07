//This JavaScript is used to populate and manage everything in
//    the MetisMenu.
//Main AngularJS object.
var Object_Angular = angular.module("ng_app_page_main", []);





Object_Angular.controller("ng_controller_page_main_repeat_admin", function($scope, $http){
    var Object_APIAdmin = "/api/admins";
    $http.get(Object_APIAdmin).success(function(_Object_Response){
        $scope.categories = _Object_Response;        
    });
});





Object_Angular.controller("ng_controller_page_main_repeat_user", function($scope, $http){
    var Object_APIUser = "/api/users";
    $http.get(Object_APIUser).success(function(_Object_Response){
        $scope.categories = _Object_Response;
    });
});





Object_Angular.controller("ng_controller_page_main_repeat_workshop", function($scope, $http){
    var Object_APIWorkshop = "/api/workshops";
    $http.get(Object_APIWorkshop).success(function(_Object_Response){
        $scope.categories = _Object_Response;
    });
});





//PENDING: This directive code is not optimal.
//PENDING: See the link here for reference, http://stackoverflow.com/questions/25536514/run-directive-after-ng-repeat.
//These codes below is for changing the initial color for if an admin is available or not
//    (offline or online).
//The thing here is that I need to change the color after the document is taken from database.
//Hence, I need the $timeout method here.
Object_Angular.directive("ntgChangeScanInnerHtmlAvailable", ["$timeout", function($timeout){
    return function(
        _Object_Scope,
        _Object_Element,
        _Object_Attributes
    ){
        $timeout(function(){
            switch(_Object_Element.text().trim()){
                case "true.":
                    _Object_Element.addClass("ntg-debug-color-green");
                break;
                case "false.":
                    _Object_Element.addClass("ntg-debug-color-red");
                break;
            }
        }, 0);
    }
}]);