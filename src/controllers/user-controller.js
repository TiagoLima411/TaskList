'use strict';

const validationContract = require('../validators/fluent-validator');
const repository = require('../repositories/user-repository');
const md5 = require('md5');
const authService = require('../services/auth-service');

const emailService = require('../services/email-service');

exports.create = async(req, res, next) => {
	let contract = new validationContract();
	contract.hasMinLen(req.body.name, 4, 'O nome deve ter pelo menos 4 caracteres');
	contract.isEmail(req.body.email,'Email inválido');
	contract.hasMinLen(req.body.password, 6, 'A seha deve ter pelo menos 6 caracteres');

	//Se os dados forem invalidos
	if(!contract.isValid()){
		res.status(400).send(contract.errors()).end();
		return;
	}
	
	try{
		await repository.create({
			name: req.body.name,
			email: req.body.email,
			password: md5(req.body.password + global.SALT_KEY),
			roles: ["user"]
		});

		emailService.send(
			req.body.email, 
			'Bem vindo ao Task List', 
			global.EMAIL_TMPL.replace('{0}', req.body.name));

		res.status(201).send({
			message: 'Usuário cadastrado com sucesso!'
		});	
	}catch (e) {
		res.status(500).send({
			message: 'falha ao processar sua requisição'
		});
	}
	
}

exports.authenticate = async(req, res, next) => {
	try{
		const user = await repository.authenticate({
			email: req.body.email,
			password: md5(req.body.password + global.SALT_KEY)
		});

		if(!user){
			res.status(404).send({
				message : 'Usuário ou senha inválidos'
			});
			return;
		}

		const token = await authService.generateToken({
			id: user._id,
			email: user.email,
			name: user.name,
			roles: user.roles
		});

		res.status(201).send({
            token: token,
            data: {
                email: user.email,
                name: user.name,
                roles: user.roles
            }
		});
	
	}catch (e) {
		res.status(500).send({
			message: 'falha ao processar sua requisição'
		});
	}
	
}

exports.refreshToken = async(req, res, next) => {
	try{
		//Recupera o token
		const token = req.body.token || req.query.token || req.headers['x-access-token'];
		//Decodifica o token
		const data = await authService.decodeToken(token);

		const user = await repository.getById(data.id);

		if(!user){
			res.status(404).send({
				message : 'Cliente não encontrado'
			});
			return;
		}

		const tokenData = await authService.generateToken({
			id: user._id,
			email: user.email,
			name: user.name,
			roles: user.roles
		});

		res.status(201).send({
            token: token,
            data: {
                email: user.email,
                name: user.name,
                roles: user.roles
            }
		});
	
	}catch (e) {
		console.log(e);
		res.status(500).send({
			message: 'falha ao processar sua requisição'
		});
	}
	
}

exports.getNameAndEmail = async(req, res, next) => {
	try{
		const user = await repository.getNameAndEmail({
			email: req.body.email,
			password: md5(req.body.password + global.SALT_KEY)
		});
		if(!user){
			res.status(401).send({
				message: 'Usuário não encontrado verifique e-mail ou senha'
			})
		}
		res.status(200).send(user)
	}catch(e){
		console.log(e)
		res.status(500).send({
			message: 'Usuário não encontrado ou Falha na requisição'
		})
	}
}