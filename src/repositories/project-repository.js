'use strict'
const mongoose = require('mongoose');
const Project  = mongoose.model('Project');

exports.get = async() => {
	const res = await Project.find({});
	return res;
}

exports.getById = async(id) => {
	const res = await Project
		.findById(id);
	return res;
}

exports.getByTitle = async(title) => {
	const res = Project
		.find({
			titleProj: title
		});
	return res;	
}

exports.delete = async(id) => {
	await Project
		.findByIdAndRemove(id);
}

exports.create = async(data) => {
	var project = new Project(data);
	await project.save();
}

exports.update = async(id, data) => {
	await Project
				.findByIdAndUpdate(id,{
					$set:{
						titleProj: data.titleProj
					}
	});
}