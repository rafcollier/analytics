import { Component, OnInit } from '@angular/core';
//NOTE this was imported manually
import {ValidateService} from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Component({
  selector: 'app-enterkey',
  templateUrl: './enterkey.component.html',
  styleUrls: ['./enterkey.component.css']
})
export class EnterkeyComponent implements OnInit {
  //clientID: String;
  //viewID1: String;
  //viewID2: String;
  //viewID3: String;
  //viewID4: String;
  //viewID5: String;
  startDate: String;
  endDate: String;
  token: String;
  private sub: any;

  constructor(
      private validateService: ValidateService, 
      private flashMessage: FlashMessagesService,
      private authService: AuthService,
      private router: Router,
      private route: ActivatedRoute
    ) { }

  ngOnInit() {
  }


  onIdSubmit(){

  this.sub = this.route
    .queryParams
    .subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.token = params['token'] || 0;
      console.log("In enterkey and token is: " + this.token);
    });

    const clientInfo = {
      //clientID: this.clientID,
      //viewID1: this.viewID1,
      //viewID2: this.viewID2,
      //viewID3: this.viewID3,
      //viewID4: this.viewID4,
      //viewID5: this.viewID5,
      startDate: this.startDate,
      endDate: this.endDate
    }

    this.router.navigate(['/barchart'], {queryParams: {
      token: this.token, 
      //clientID: clientInfo.clientID,
      //viewID1: clientInfo.viewID1,
      //viewID2: clientInfo.viewID2,
      //viewID3: clientInfo.viewID3,
      //viewID4: clientInfo.viewID4,
      //viewID5: clientInfo.viewID5,
      startDate: clientInfo.startDate,
      endDate: clientInfo.endDate
      }
    }); 
  }
}