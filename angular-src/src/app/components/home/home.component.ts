import { Component, OnInit, ElementRef, AfterViewInit, VERSION } from '@angular/core';
import {AuthService} from '../../services/auth.service';
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
     private element: ElementRef

  	) { }

  ngAfterViewInit() {
    this.googleInit();
  }

  public googleInit() {
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

        const date1 = "2017-04-01";
        const date2 = "2017-04-30";
        const date3 = "2017-03-01";
        const date4 = "2017-03-31";
        const metric1 = 'pageviews';
        const metric2 = 'uniquePageviews';
        const dimension = 'pagePath';
        const sort = 'uniquePageviews';
        const max = '10';

        this.onAnalyticsSubmit(date1, date2, metric1, accessToken, config.cmajNewsViewId);
        this.onAnalyticsSubmit(date3, date4, metric1, accessToken, config.cmajNewsViewId);
        this.onAnalyticsSubmit(date1, date2, metric1, accessToken, config.cmajBlogsViewId);
        this.onAnalyticsSubmit(date3, date4, metric1, accessToken, config.cmajBlogsViewId);
        this.onUniquePageviewsSubmit(date1, date2, metric2, dimension, sort, max, accessToken, config.cmajNewsViewId);
        this.onUniquePageviewsSubmit(date3, date4, metric2, dimension, sort, max, accessToken, config.cmajNewsViewId);
        this.onUniquePageviewsSubmit(date1, date2, metric2, dimension, sort, max, accessToken, config.cmajBlogsViewId);
        this.onUniquePageviewsSubmit(date3, date4, metric2, dimension, sort, max, accessToken, config.cmajBlogsViewId);
    }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
    });
  }

  public onAnalyticsSubmit(date1, date2, metric1, accessToken, viewID) {
    //console.log(accessToken + date1 + date2);
  	//console.log("Calling Google Analytics API for give key and view id");
  	this.authService.getGoogleData(date1, date2, metric1, accessToken, viewID).subscribe(data => {
      //console.log(data);
  	  //console.log(data.id);
      //console.log(data.totalsForAllResults);
      console.log(data.totalsForAllResults["ga:pageviews"]);
	  },
	  err => {
	    //console.log(err);
 	    return false;
 	  });
  }

  public onUniquePageviewsSubmit(date1, date2, metric, dimension, sort, max, accessToken, viewID) {
    this.authService.getUniquePageviews(date1, date2, metric, dimension, sort, max, accessToken, viewID).subscribe(data => {
      //console.log(data);
      //console.log(data.id);
      //console.log(data.rows);
      //console.log(data.rows[0][0]);
      //console.log(data.rows[1][0]);
      //console.log(data.rows[2][0]);
      //console.log(data.rows[3][0]);
      //console.log(data.rows[4][0]);
    },
    err => {
      //console.log(err);
       return false;
     });
  }
 



}
