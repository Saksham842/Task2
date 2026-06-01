const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    try {
        let query = {};

        if (req.user.role !== 'Admin') {
            query.assignedTo = req.user.id;
        }

        const tasks = await Task.find(query)
            .populate('assignedTo', 'name email role')
            .populate('assignedBy', 'name email role')
            .sort({ createdAt: -1 });

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate('assignedTo', 'name email role')
            .populate('assignedBy', 'name email role');

        if (!task) return res.status(404).json({ message: 'Task not found' });

        if (req.user.role !== 'Admin' && task.assignedTo._id.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createTask = async (req, res) => {
    try {
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const { title, description, assignedTo, status } = req.body;

        if (!title || !assignedTo) {
            return res.status(400).json({ message: 'Title and assignedTo are required' });
        }

        const newTask = new Task({
            title,
            description,
            assignedTo,
            assignedBy: req.user.id,
            status: status || 'Pending'
        });

        await newTask.save();

        const populatedTask = await Task.findById(newTask._id)
            .populate('assignedTo', 'name email role')
            .populate('assignedBy', 'name email role');

        res.status(201).json({ message: 'Task created', task: populatedTask });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        if (req.user.role !== 'Admin' && task.assignedTo.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const { title, description, assignedTo, status } = req.body;

        if (req.user.role === 'Admin') {
            if (title) task.title = title;
            if (description) task.description = description;
            if (assignedTo) task.assignedTo = assignedTo;
            if (status) task.status = status;
        } else {
            if (status) {
                task.status = status;
            } else {
                return res.status(400).json({ message: 'Users can only update status' });
            }
        }

        await task.save();

        const updatedTask = await Task.findById(task._id)
            .populate('assignedTo', 'name email role')
            .populate('assignedBy', 'name email role');

        res.json({ message: 'Task updated', task: updatedTask });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
