'use strict';

var app = angular.module('sample', ['ui.router']);

app.config(function($urlRouterProvider, $stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/templates/home.html',
      controller: "mainCtrl"
    })
  $urlRouterProvider.otherwise('/')
})

app.controller('mainCtrl', function($scope, $http) {
  angular.element(document).ready(function() {
    $(document).foundation()
  })
  $scope.task = {}

  let d = new Date();
  let y = d.getFullYear();
  let m = d.getMonth() < 10 ? `0${d.getMonth()+1}` : d.getMonth() + 1;
  let day = d.getDate();
  $scope.today = `${y}-${m}-${day}`;

  function populate() {
    $http.get('/todo')
      .then(function(data) {
        $scope.todos = data.data
      })
  }

  $scope.addTask = function(task) {
    $http.post('/addtodo/', task)
      .then(function(data) {
        populate();
        $scope.task = {};
      })
  }



  $scope.remove = function(id) {
    $http.delete('/remove/' + id)
      .then(function(data) {
        populate();
      })
  }

  $scope.toggleComplete = function(id, newState) {
    console.log('id', id, 'newState', newState);
    $http.put('/update/' + id, {
        isCompleted: newState
      })
      .then(function(data) {
        populate();
      })
  }

  populate();
})
