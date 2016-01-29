'use strict';


var app = angular.module('sample', ['ui.router']);

app.config(function($urlRouterProvider, $stateProvider){
  $stateProvider
  .state('home', {url: '/', templateUrl: '/templates/home.html'})
  $urlRouterProvider.otherwise('/')
})

app.controller('main', function($scope, $http){

  $scope.task = '';

  $scope.todayDate = new Date();

  $scope.populate = function(){
    $http.get('/todo')
    .then(function(data){
      $scope.todos = data.data
    })
  }

  $scope.addTask = function(description){
    $http.post('/addtodo/', {description: description})
    .then(function(data){
      $scope.populate()
      $scope.task= ''
    })
  }



  $scope.remove = function(id) {
    $http.delete('/remove/'+id)
    .then(function(data){
      $scope.populate()
    })
  }

  $scope.toggleComplete = function(id, newState){
    $http.put('/update/'+id, {completed: newState})
    .then(function(data){
      $scope.populate()
    })
  }

  $scope.populate()
})
