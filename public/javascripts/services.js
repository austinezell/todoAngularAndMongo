"use strict"

app.service("Todo", function($http){
  this.update = (id, update) =>{
    $http.put(`todos/update/${id}`, update)
    .then(response=>{
    }, err=>{
    })
  }

  this.getAll = (location) =>{
    return $http.get(`/todos/${location}`)
  }

  this.addTask = (task) =>{
    return $http.post('todos/add/', task)
  }

  this.remove = (id) => {
    return $http.delete('todos/remove/' + id);
  }
})
