const mongoose = require('mongoose');
const Task = mongoose.model('Task');

exports.get = async(data) => {
	var res = await Task.find({}, 'description date priority')
	return res;
}

exports.create = async(data) => {
	var task = new Task(data);
	await task.save();
}

exports.delete = async(description) => {
	await Task
		.findOneAndRemove(description);
}

exports.update = async(id, data) => {
	await Task
				.findByIdAndUpdate(id,{
					$set:{
                        description: data.description,
                        date: data.date,
                        priority: data.priority
					}
	});
}