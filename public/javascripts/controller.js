"use strict";

app.controller('mainCtrl', function($scope, $http) {
  console.log('yo');
  angular.element(document).ready(function() {
    $(document).foundation();
  })
  $scope.task = {};
  $scope.displayTodos =[];
  $scope.location = {};

  let d = new Date();
  let y = d.getFullYear();
  let m = d.getMonth() < 10 ? `0${d.getMonth()+1}` : d.getMonth() + 1;
  let day = d.getDate();
  $scope.today = `${y}-${m}-${day}`;

  function filter(todos) {
    // $scope.displayTodos = todos.filter((todo)=>{
    //   return !todo.isCompleted;
    // });
    // $scope.$apply
  }

  function populate() {
    $http.get('/todo')
    .then(function(response) {
      let todos = response.data.map((todo)=>{
        todo.datePosted = new Date(todo.datePosted);
        if(todo.deadline) todo.deadline = new Date(todo.deadline);
        if(todo.dateCompleted) todo.dateCompleted = new Date(todo.dateCompleted);
        return todo;
      })
      $scope.todos = todos;
      // filter(todos);
    })
  }

  $scope.addTask = function(task) {
    $http.post('/addtodo/', task)
    .then(function(response) {
      populate();
      $scope.task = {};
    })
  }
  $scope.applyFilter = (type) =>{

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
      $http.delete('/remove/' + id)
      .then(function(response) {
        populate();
        swal("Deleted!", "Todo removed", "success");
      }, function(response){
        console.log(response);
      })
    });
  }

  $scope.toggleComplete = function(id, newState) {
    $http.put('/update/' + id, {
      isCompleted: newState
    })
    .then(function(data) {
      populate();
    })
  }

  populate();
})
