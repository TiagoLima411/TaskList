const repository = require('../repositories/task-repository');
const authService = require('../services/auth-service');

exports.get = async(req, res, next) => {
	try{
		var data = await repository.get();
		res.status(200).send(data)
	}catch(e){
		res.status(500).send({
			message: 'falha ao processar sua requisição'
		});
	}
}

exports.delete = async(req, res, next) => {
	try{
		await repository.delete(req.body.description);	
		res.status(200).send({
			message: 'Tarefa removida com sucesso'
		})
	}catch(e){
		console.log(e);
		res.status(500).send({
			message: 'falha ao processar sua requisição'
		});	
	}
	
}

exports.create = async(req, res, next) => {
	try{
		await repository.create({
			description: req.body.description,
			date: req.body.date,
			priority: req.body.priority,
			done: req.body.done
		});
		res.status(200).send({
			message: 'Tarefa cadastrada com sucesso!'
		});	
	}catch (e) {
		res.status(500).send(e,{
			message: 'falha ao processar sua requisição'
		});
	}
	
}

exports.put = async(req, res, next) => {
	try{
		await repository.update(req.params.id, req.body );
		res.status(200).send({
			message : 'Projeto altualizado com sucesso'
		});
	}catch (e) {
		res.status(500).send(e,{
			message: 'falha ao processar sua requisição'
		});
	}	
}