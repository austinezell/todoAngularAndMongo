const router = require("express").Router();
const Todo = require("../models/ToDoSchema.js")

router.get('/all', function(req, res){
  ToDo.find({}, function(err, todos){
    err ? res.status(499).send(err) : res.send(todos);
  })
})

router.get('/done', function(req, res){
  Todo.find({isCompleted: true}, function(err, todos){
    err ? res.status(499).send(err) : res.send(todos);
  })
})

router.get('/todo', function(req, res){
  Todo.find({isCompleted: false}, function(err, todos){
    err ? res.status(499).send(err) : res.send(todos);
  })
})

router.post('/add', function(req, res){
  ToDo.create(req.body, function(err, newTodo){
    if(!err){
      res.end()
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
  if (req.body.isCompletedUpdate){
    if (req.body.isCompleted === true) {
      req.body.dateCompleted = new Date();
    }
    else req.body.dateCompleted = null;
  }
  ToDo.findByIdAndUpdate(req.params.id, req.body, function(err, todo){
    if (err || !todo){
      res.status(400).send(err);
    }else {
      res.send(todo)
    }
  })
})


module.exports = router;
