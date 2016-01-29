var mongoose = require('mongoose');


var ToDoSchema = mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String},
  isCompleted: {type: Boolean, default: false},
  datePosted: {type: Date, default: new Date},
  deadline: {type: Date},
  dateCompleted: {type: Date}
});


module.exports = mongoose.model('ToDo', ToDoSchema);
