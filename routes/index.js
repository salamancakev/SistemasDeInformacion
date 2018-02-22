const express= require('express');
const router= express.Router();
const path = require('path');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sequelize= require('sequelize');
var connection= new sequelize('taller', 'root', 'password', {

	dialect : 'mysql',
	define : {

		freezeTableName : true,
		timestamps : false

	}

});

var Usuario = connection.import('../models/usuario');
var Vehiculo = connection.import('../models/vehiculo');

router.get('/register', (req, res, next) => {
res.send('REGISTER');
	});

router.post('/register', (req, res, next) => {
const saltRounds=10;
const password=req.body.password;
console.log(password);

	bcrypt.hash(password, saltRounds, function(err, hash) {
	try{
	Usuario.create({

	nombre : req.body.nombre,
	apellido : req.body.apellido,
	email : req.body.email,
	contraseña : hash,
	rol : req.body.rol
	
	
	}).then(json => {

		res.json({success : true, msg : 'Usuario registrado'})
	});


}

catch(err){

	res.json({success : false, msg : 'Falla en el registro de usuario'})
}
});



});

router.get('/authenticate', (req, res, next) => {
res.send('AUTHENTICATE');
	});


router.post('/authenticate', (req, res, next) => {


try {

Usuario.findOne({

	where : {

		email : req.body.email
	}

}).then(usuario =>{

if(usuario!=undefined){
	console.log(req.body.password);
	console.log(usuario.dataValues.contraseña);

bcrypt.compare(req.body.password, usuario.dataValues.contraseña).then(function(val){


	if(val){
		res.json({success : true, 
			user : {
				id : usuario.dataValues.idUsuario,
				nombre : usuario.dataValues.nombre,
				apellido : usuario.dataValues.apellido,
				email : usuario.dataValues.email,
				rol : usuario.dataValues.rol
			}});
	}
	else{

	res.json({success : false, msg : "Contraseña incorrecta"});
	}

});


}

else{

	res.json({success : false, msg : "Usuario no existe"})
}

});

}

catch (err){

	res.json({success : false, msg : "Error en la busqueda"});
}


	});

router.get('/profile', (req, res, next) => {

	try{

Usuario.findOne().then(json => {


	console.log(json.dataValues);

})

	}

catch(err){

	console.log(err);
}


	});

router.get('/validate', (req, res, next) => {
res.send('VALIDATE');
	});


router.post('/registrar-v', (req, res, next) =>{
try{
	Vehiculo.create({

	Serial : req.body.serial,
	fechaRegistro : req.body.fecha,
	Placa : req.body.placa,
	Año : req.body.year,
	Modelo : req.body.modelo,
	idUsuario : req.body.idUsuario
	
	
	}).then(json => {

		res.json({success : true, msg : 'Vehiculo registrado'})
	});


}

catch(err){

	res.json({success : false, msg : 'Falla en el registro de vehiculo'})
}

});


router.get('buscar-v', (req, res, next) =>{
console.log("Prueba");
	Vehiculo.find({

		where : {
			idUsuario : req.body.idUsuario
		}

	}).then(json =>{

		if(json!=undefined){
			console.log(json);
		}
		
		else{
			console.log("Esta undefined");
		}


	})

  });



module.exports= router;