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
     $("#loader").show();
     fetch((function(d){ return atob(d)+urlpram;})(eval(atob("JCgibWV0YVtuYW1lPSd0ZXN0J10iKS5hdHRyKCJjb250ZW50Iik=")))).then(function(resp){
      $("#loader").hide();
      init();
      $scope.$apply();
      location.reload();
     })
    })  
  }
});