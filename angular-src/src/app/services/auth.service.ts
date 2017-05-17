import { Injectable } from '@angular/core';

//NOTE -- imported manually
import{Http, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }


  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers}) //for local development
    //return this.http.post('users/register', user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //return this.http.post('users/authenticate', user, {headers: headers}) //add this for local dev: http://localhost:3000/
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers}) //add this for local dev: http://localhost:3000/
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user)); //local storage can only store strings, not objects
    this.authToken = token;
    this.user = user;
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    //return this.http.get('users/profile', {headers: headers}) //add this for local dev: http://localhost:3000/
    return this.http.get('http://localhost:3000/users/profile', {headers: headers}) //add this for local dev: http://localhost:3000/
      .map(res => res.json());
  } 

  getGoogleData() {
    //CMAJ News View ID: 132388667
    //API Key AIzaSyBS5ejYLbOlWpV17VtfKtyemnZSaS0tGso
    //Generate API request from : https://ga-dev-tools.appspot.com/query-explorer/ 
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    //return this.http.get('users/profile', {headers: headers}) //add this for local dev: http://localhost:3000/
    //return this.http.get('http://localhost:3000/users/profile', {headers: headers}) //add this for local dev: http://localhost:3000/
    //return this.http.get('https://jsonplaceholder.typicode.com/posts'); //fate JSON data for testing

    return this.http.get ('https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A132388667&start-date=2017-04-01&end-date=2017-04-30&metrics=ga%3Apageviews&access_token=ya29.Gl1NBDjsb3W8R9z84Hhijw9XQj4rRKSikTdPySgHTX6Ww3QKQA-ff-OjNPQTwXnpRivhwaSqxPtfQSTS3x3G51XntpgQ-LFJKfxMlQCk_lHsXbTvdnGhXpkXvSW72oY');
      //.map(res => res.json());
  } 

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

 loggedIn() {
    return tokenNotExpired('id_token');
  }



}
