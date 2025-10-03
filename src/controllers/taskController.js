const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  
  const { title, description, status } = req.body;
  const task = new Task({ title, description, status, owner: req.user.id });
  await task.save();
  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const filter = { owner: req.user.id };
  if (req.query.status) filter.status = req.query.status;
  if (req.query.q) {
    filter.$or = [
      { title: { $regex: req.query.q, $options: 'i' } },
      { description: { $regex: req.query.q, $options: 'i' } }
    ];
  }
  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const task = await Task.findOneAndUpdate({ _id: id, owner: req.user.id }, updates, { new: true, runValidators: true });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id, owner: req.user.id });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Task deleted' });
};
