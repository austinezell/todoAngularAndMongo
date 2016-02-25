'use strict';

var app = angular.module('sample', ['ui.router']);

app.config(function($urlRouterProvider, $stateProvider) {
  $stateProvider
  // .state('home', {
  //   url: '/',
  //   template: "<ui-view/>",
  //   controller: "mainCtrl"
  // })
  .state("tasks", {
    url: "/tasks",
    templateUrl: '/templates/todos.html',
    abstract: true,
    controller: "mainCtrl"
  })
  .state("tasks.todo", {
    url: "/todo",
    controller: function($scope, $state) {
      console.log('loaded');
      $scope.location.name = $state.current.name.replace('tasks.', '');
      console.log("hey",$scope.location.name);
    }
  })
  .state("tasks.done", {
    url: "/done",
    controller: function($scope, $state) {
      console.log('loaded');
      $scope.location.name = $state.current.name.replace('tasks.', '');
      console.log("hey",$scope.location.name);
    }

  })
  .state("tasks.all", {
    url: "/all",
    controller: function($scope, $state) {
      console.log('loaded');
      $scope.location.name = $state.current.name.replace('tasks.', '');
      console.log("hey",$scope.location.name);    }
  })
  $urlRouterProvider.otherwise('/tasks/todo')
})

app.directive("foundationRepeat", function() {
  return function(scope, element, attrs) {
    $(element).foundation()
  }
})
