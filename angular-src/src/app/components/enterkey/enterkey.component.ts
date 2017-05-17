import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-enterkey',
  templateUrl: './enterkey.component.html',
  styleUrls: ['./enterkey.component.css']
})
export class EnterkeyComponent implements OnInit {

  constructor(
     private authService: AuthService

  	) { }

  ngOnInit() {
  }

  onAnalyticsSubmit() {

  	console.log("Calling Google Analytics API for give key and view id");
  	this.authService.getGoogleData().subscribe(data => {
  	  //console.log(profile.user.username);	
  	  console.log(data);
	},
	err => {
	  console.log(err);
 	  return false;
 	});
  }

}
