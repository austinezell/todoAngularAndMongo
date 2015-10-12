'use strict';


var app = angular.module('sample', ['ui.router']);

app.config(function($urlRouterProvider, $stateProvider){
  $stateProvider
  .state('home', {url: '/', templateUrl: '/templates/home.html'})
  $urlRouterProvider.otherwise('/')
})

app.controller('main', function($scope, $http){

  $scope.task = ''

  $scope.populate = function(){
    $http.get('http://localhost:3000/todo')
    .then(function(data){
      $scope.todos = data.data
    })
  }

  $scope.addTask = function(description){
    $http.post('http://localhost:3000/addtodo', {description: description})
    .then(function(data){
      console.log($scope.task);
      $scope.populate()
      $scope.task= ''
    })
  }

  $scope.remove = function(id) {
    $http.delete('http://localhost:3000/remove/'+id)
    .then(function(data){
      $scope.populate()
    })
  }

  $scope.toggleComplete = function(id, newState){
    $http.put('http://localhost:3000/update/'+id, {completed: newState})
    .then(function(data){
      $scope.populate()
    })
  }

  $scope.populate()
})
