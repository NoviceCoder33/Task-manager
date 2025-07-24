const mongoose = require('mongoose');

const SubtaskSchema = new mongoose.Schema({
  subject: String,
  deadline: Date,
  status: String,
  isDeleted: { type: Boolean, default: false }
});

const TaskSchema = new mongoose.Schema({
  subject: String,
  deadline: Date,
  status: String,
  isDeleted: { type: Boolean, default: false },
  subtasks: [SubtaskSchema]
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  tasks: [TaskSchema]
});

module.exports = mongoose.model('User', UserSchema);