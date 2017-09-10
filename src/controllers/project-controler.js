const repository = require('../repositories/project-repository');
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

exports.getByTitle = async(req,res, next) =>{
	try{
		const data = await repository.getByTitle(req.params.titleProj);
		res.status(200).send(data);
	}catch(e){
		res.status(500).send({
			message: 'falha ao processar sua requisição'
		});
	}
}

exports.delete = async(req, res, next) => {
	try{
		await repository.delete(req.body.titleProj);	
		res.status(200).send({
			message: 'Projeto removido com sucesso'
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
			titleProj: req.body.titleProj
		});

		res.status(200).send({
			message: 'Projeto cadastrado com sucesso!'
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