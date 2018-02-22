import { Component } from '@angular/core';
import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from "angular2-flash-messages";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';


  constructor(private validateService : ValidateService,
  	private authService : AuthService,
  	private flashMessage : FlashMessagesService,
  	private router : Router) { }

  ngOnInit() {
  }

  onLogoutClick(){

  	this.authService.logout();
  	this.flashMessage.show("Sesión cerrada",{cssClass : 'alert-success', timeout : 5000});
  	this.router.navigate(['inicio']);
  	return false;
  }

}