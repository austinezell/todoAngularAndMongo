var mongoose = require('mongoose');


var ToDoSchema = mongoose.Schema({
  description: {type: String, required: true},
  completed: {type: Boolean, default: false}
});


module.exports = mongoose.model('ToDo', ToDoSchema);
