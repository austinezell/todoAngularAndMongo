"use strict";

app.controller('mainCtrl', function($scope, Todo) {
  angular.element(document).ready(function() {
    $(document).foundation();
  })
  $scope.task = {};
  $scope.location = {};
  $scope.todos= {};

  $scope.today = new Date().toInputString();

  $scope.populate = function() {
    Todo.getAll($scope.location.name)
    .then(function(response) {
      $scope.todos[$scope.location.name] = response.data.map((todo)=>{
        todo.datePosted = new Date(todo.datePosted);
        todo.editable = false;
        if(todo.deadline) todo.deadline = new Date(todo.deadline);
        if(todo.dateCompleted) todo.dateCompleted = new Date(todo.dateCompleted);
        return todo;
      })
    })
  }

  $scope.addTask = function(task) {
    Todo.addTask(task)
    .then(function(response) {
      $scope.populate();
      $scope.task = {};
    })
  }
  $scope.remove = function(id) {
    swal({
      title: "Are you sure?",
      text: "",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false
    }, function() {
      Todo.remove(id)
      .then(function(response) {
        $scope.populate();
        swal("Deleted!", "Todo removed", "success");
      }, function(error){
        console.log(error);
      })
    });
  }

  $scope.toggleComplete = function(todo) {
    todo.isCompleted = !todo.isCompleted;
    todo.dateCompleted = new Date();
    Todo.update(todo._id, {
      isCompleted: todo.isCompleted,
      isCompletedUpdate: true
    })
  }

  $scope.editDescription = (id, description)=>{
    Todo.update(id, {description})
  }

  $scope.changeDeadline = (todo) =>{
    todo.deadline = todo.newDeadline;
    Todo.update(todo._id, {
      deadline: todo.deadline
    })
  }

})
