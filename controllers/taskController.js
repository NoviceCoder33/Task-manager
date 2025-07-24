exports.getTasks = async (req, res) => {
  const tasks = req.user.tasks.filter(t => !t.isDeleted).map(t => ({
    ...t._doc,
    subtasks: t.subtasks.filter(st => !st.isDeleted),
  }));
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const { subject, deadline, status } = req.body;
  const newTask = { subject, deadline, status, isDeleted: false, subtasks: [] };
  req.user.tasks.push(newTask);
  await req.user.save();
  res.status(201).json(newTask);
};

exports.updateTask = async (req, res) => {
  const task = req.user.tasks.id(req.params.taskId);
  if (!task || task.isDeleted) return res.status(404).json({ message: 'Task not found' });

  Object.assign(task, req.body);
  await req.user.save();
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const task = req.user.tasks.id(req.params.taskId);
  if (!task || task.isDeleted) return res.status(404).json({ message: 'Task not found' });

  task.isDeleted = true;
  await req.user.save();
  res.json({ message: 'Task soft-deleted' });
};

exports.getSubtasks = async (req, res) => {
  const task = req.user.tasks.id(req.params.taskId);
  if (!task || task.isDeleted) return res.status(404).json({ message: 'Task not found' });

  const subtasks = task.subtasks.filter(st => !st.isDeleted);
  res.json(subtasks);
};

exports.updateSubtasks = async (req, res) => {
  const task = req.user.tasks.id(req.params.taskId);
  if (!task || task.isDeleted) return res.status(404).json({ message: 'Task not found' });

  const retainedDeleted = task.subtasks.filter(st => st.isDeleted);
  task.subtasks = [...retainedDeleted, ...req.body];
  await req.user.save();
  res.json(task.subtasks);
};

exports.deleteSubtask = async (req, res) => {
  const task = req.user.tasks.id(req.params.taskId);
  if (!task || task.isDeleted) return res.status(404).json({ message: 'Task not found' });

  const subtask = task.subtasks.id(req.params.subtaskId);
  if (!subtask || subtask.isDeleted) return res.status(404).json({ message: 'Subtask not found' });

  subtask.isDeleted = true;
  await req.user.save();
  res.json({ message: 'Subtask soft-deleted' });
};