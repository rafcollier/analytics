import { Component, OnInit } from '@angular/core';
//NOTE this was imported manually
import {ValidateService} from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  username: String;
  password: String;

  //NOTE -- inject the service into the contructor
  constructor(
      private validateService: ValidateService, 
      private flashMessage: FlashMessagesService,
      private authService: AuthService,
      private router: Router
      ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    console.log("Registration form submitted");
    const user = {
      username: this.username,
      password: this.password
    }

    //Required fields
    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('You are registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']); 
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']); 
      }
    });

  }
}
