angular.module('todoApp', [])
.controller('TodoListController', function($scope) {
  $("#loader").hide();
  $scope.data = {};
  function init(){
    $scope.data = {
      Date:"",
      Note:"",
      Amount:"",
      Type:"",
      createdBy:""
    };
  }
  init();
  $scope.save = function(){
    Fingerprint2.get(function (components) {
      var values = components.map(function (component) { return component.value })
      $scope.data.createdBy = Fingerprint2.x64hash128(values.join(''), 31);
      $scope.data.timeStamp = new Date().toISOString();
      $scope.data.Date = new Date($scope.data.Date).toISOString();
     var urlpram = new URLSearchParams($scope.data).toString();
     var url = "https://script.google.com/macros/s/AKfycbyN9SZZwAuJPfzKvPB7KgZJD6FxKe7a9QCapPk5R6uoSLJRoZo/exec?"+urlpram;
    //  console.log("url=>",url);
     $("#loader").show();
     fetch(url).then(function(resp){
      $("#loader").hide();
      init();
      $scope.$apply();
     })
    })  
  }
});