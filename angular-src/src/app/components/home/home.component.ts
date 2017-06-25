import { Component, OnInit, ElementRef, AfterViewInit, VERSION } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
declare const gapi: any;
const config = require('../../../../../config/google');


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly',
    'https://www.googleapis.com/auth/plus.login' //to get access token
  ].join(' ');

  public auth2: any;

  constructor(
     private authService: AuthService,
     private element: ElementRef,
     private router: Router
  	) { }

  ngAfterViewInit() {
    console.log("inside afterviewinit");
    this.googleInit();
  }

  public googleInit() {
    console.log("inside google init");
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: config.clientIdCmaj,
        cookiepolicy: 'single_host_origin',
        scope: this.scope
      });
      this.attachSignin(this.element.nativeElement.firstChild);
    });
  }
  
  public attachSignin(element) {
    console.log("inside attach signin");
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        const accessToken = googleUser.getAuthResponse().access_token;
        //console.log('ID Token || ' + googleUser.getAuthResponse().id_token);
        //console.log('Access Token || ' + googleUser.getAuthResponse().access_token);
        //console.log(accessToken);
        //console.log('ID: ' + profile.getId());
        //console.log('Name: ' + profile.getName());
        //console.log('Image URL: ' + profile.getImageUrl());
        //console.log('Email: ' + profile.getEmail());

        this.router.navigate(['/enterkey'], {queryParams: {token: accessToken}});

    }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
    });
  }




}


