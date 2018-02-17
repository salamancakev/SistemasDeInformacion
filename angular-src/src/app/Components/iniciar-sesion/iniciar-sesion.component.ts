import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

	email : String;
	password : String;

  constructor(private validateService : ValidateService,
  	private authService : AuthService,
  	private flashMessage : FlashMessagesService,
  	private router : Router) { }

  ngOnInit() {
  }

  onLoginSubmit(){

  	const user= {
  		email : this.email,
  		password : this.password
  	}

  	if(!this.validateService.validateLogin(user)){
  		this.flashMessage.show("Por favor rellene todos los campos", { cssClass : 'alert-danger', timeout : 3000 });
  		return false;
  	}

  	if(!this.validateService.validateEmail(user.email)){
  		this.flashMessage.show("Por favor ingrese un email válido", { cssClass : 'alert-danger', timeout : 3000 });
  		return false;
  	}	


  	this.authService.loginUser(user).subscribe(data =>{
  		if(data.success){

  			this.flashMessage.show("Bienvenido "+data.user.nombre, {cssClass : "alert-success", timeout : 5000});
  			this.router.navigate(['/dashboard']);
  		}

  		else{
  			this.flashMessage.show(data.msg, {cssClass : 'alert-danger', timeout : 3000});
  		}
  	});
  }

}
