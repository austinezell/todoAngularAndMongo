var express = require('express');
var router = express.Router();
var ToDo = require('../models/todo.js')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/todo', function(req, res){
  ToDo.find({}, function(err, todos){
    res.send(todos)
  })
})

router.post('/addtodo', function(req, res){
  ToDo.create(req.body, function(err, newTodo){
    if(!err){
    res.send('something')
    }
  })
})

router.delete('/remove/:id', function(req, res){
  ToDo.findByIdAndRemove(req.params.id, function(err, todo){
    if (err || !todo){
      res.status(400).send("error")
    }
    else{
      res.send("todo id" +req.params.id+ "deleted")
    }
  })
})

router.put('/update/:id', function(req, res){
  console.log(req.body);
  ToDo.findByIdAndUpdate(req.params.id, req.body, function(err, todo){
    console.log(todo);
    if (err || !todo){
      res.status(400).send(err);
    }else {
      res.send(todo)
    }
  })
})


module.exports = router;
