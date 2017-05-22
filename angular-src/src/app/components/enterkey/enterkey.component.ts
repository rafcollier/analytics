import { Component, OnInit, ElementRef, AfterViewInit, VERSION } from '@angular/core';
import {AuthService} from '../../services/auth.service';

declare const gapi: any;

@Component({
  selector: 'app-enterkey',
  templateUrl: './enterkey.component.html',
  styleUrls: ['./enterkey.component.css']
})
export class EnterkeyComponent implements AfterViewInit {

  private clientId:string = '964102028533-8nglmq3i7cjsfqdgvugi6t3fo76oom82.apps.googleusercontent.com';

  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly',
    'https://www.googleapis.com/auth/plus.login' //to get access token
  ].join(' ');

  public auth2: any;
  
  public googleInit() {
    
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
        cookiepolicy: 'single_host_origin',
        scope: this.scope
      });
      this.attachSignin(this.element.nativeElement.firstChild);
    });
  }
  
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        console.log('ID Token || ' + googleUser.getAuthResponse().id_token);
        console.log('Access Token || ' + googleUser.getAuthResponse().access_token);
        const accessToken = googleUser.getAuthResponse().access_token;
        console.log(accessToken);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        this.onAnalyticsSubmit(accessToken);

      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }


  constructor(
     private authService: AuthService,
     private element: ElementRef

  	) { }

  ngAfterViewInit() {
    this.googleInit();
  }


  public onAnalyticsSubmit(accessToken) {
    const date1 = "2017-04-01";
    const date2 = "2017-04-30";

    console.log(accessToken + date1 + date2);
    
  	//console.log("Calling Google Analytics API for give key and view id");
  	this.authService.getGoogleData(date1, date2, accessToken).subscribe(data => {
      console.log(data);
  	  console.log(data.id);
      console.log(data.totalsForAllResults);
      console.log(data.totalsForAllResults["ga:pageviews"]);
	  },
	  err => {
	    console.log(err);
 	    return false;
 	  });
  }


}
