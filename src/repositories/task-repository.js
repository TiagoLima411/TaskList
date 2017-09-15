const mongoose = require('mongoose');
const Task = mongoose.model('Task');

exports.get = async(data) => {
	var res = await Task.find({}, 'createdAt project description date priority done')
		.populate('project','titleProj')
	return res;
}

exports.getById = async(id) => {
	var res = await Task.findById(id)
		.populate('project','titleProj');
	return res;
}

exports.create = async(data) => {
	var task = new Task(data);
	await task.save();
}

exports.delete = async(id) => {
	await Task
		.findByIdAndRemove(id);
}

exports.update = async(id, data) => {
	await Task
				.findByIdAndUpdate(id,{
					$set:{
						project: data.project,
                        description: data.description,
                        date: data.date,
						priority: data.priority,
						done: data.done
					}
	});
}