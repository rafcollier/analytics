import { Injectable } from '@angular/core';

//NOTE -- imported manually
import{Http, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  //authToken: any;
  //user: any;

  constructor(private http: Http) { }

  getGoogleData(date1, date2, metric1, accessToken, viewID) {

    //https://ga-dev-tools.appspot.com/query-explorer/
    console.log("in AuthServices getGoogleData");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A' + viewID + '&start-date=' + date1 + '&end-date=' + date2 + '&metrics=ga%3A' + metric1 + '&access_token=' + accessToken)
      .map(res => res.json());
  } 

  getUniquePageviews(date1, date2, metric, dimension, sort, max, accessToken, viewID) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A' + viewID + '&start-date=' + date1 + '&end-date=' + date2 + '&metrics=ga%3A' + metric + '&dimensions=ga%3A' + dimension  + '&sort=-ga%3A' + sort + '&max-results=' + max + '&access_token=' + accessToken)
      .map(res => res.json());
  } 

  getCountryData(date1, date2, metric, dimension, sort, max, accessToken, viewID) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A' + viewID + '&start-date=' + date1 + '&end-date=' + date2 + '&metrics=ga%3A' + metric + '&dimensions=ga%3A' + dimension  + '&sort=-ga%3A' + sort + '&max-results=' + max + '&access_token=' + accessToken)
      .map(res => res.json());
  } 

  getSourceData(date1, date2, metric, dimension, sort, max, accessToken, viewID) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A' + viewID + '&start-date=' + date1 + '&end-date=' + date2 + '&metrics=ga%3A' + metric + '&dimensions=ga%3A' + dimension  + '&sort=-ga%3A' + sort + '&max-results=' + max + '&access_token=' + accessToken)
      .map(res => res.json());
  } 

  getDeviceData(date1, date2, metric, dimension, sort, max, accessToken, viewID) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A' + viewID + '&start-date=' + date1 + '&end-date=' + date2 + '&metrics=ga%3A' + metric + '&dimensions=ga%3A' + dimension  + '&sort=-ga%3A' + sort + '&max-results=' + max + '&access_token=' + accessToken)
      .map(res => res.json());
  } 


}




