'use strict';
Date.prototype.toInputString = function(){
  let y = this.getFullYear();
  let m = this.getMonth() < 10 ? `0${this.getMonth()+1}` : this.getMonth() + 1;
  let d = this.getDate() < 10 ? `0${this.getDate()}` : this.getDate();
  return `${y}-${m}-${d}`
}

let app = angular.module('todo', ['ui.router', 'ngAnimate']);

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
  .state("tasks.todos", {
    url: "/todo",
    templateUrl: "/templates/todos/todoList_todo.html",
    controller: function($scope, $state) {
      $scope.location.name = $state.current.name.replace('tasks.', '');
      $scope.populate($state.current.name.replace('tasks.', ''));
      $scope.$apply;
    }
  })
  .state("tasks.done", {
    url: "/done",
    templateUrl: "/templates/todos/todoList_done.html",
    controller: function($scope, $state) {
      $scope.location.name = $state.current.name.replace('tasks.', '');
      $scope.populate();
      $scope.$apply;
    }
  })
  .state("tasks.all", {
    url: "/all",
    templateUrl: "/templates/todos/todoList_all.html",
    controller: function($scope, $state){
      $scope.location.name = $state.current.name.replace('tasks.', '');
      $scope.populate();
      $scope.$apply;
    }
  })
  $urlRouterProvider.otherwise('/tasks/todo')
})

app.directive("foundationRepeat", function() {
  return function(scope, element, attrs) {
    $(element).foundation()
  }
})
