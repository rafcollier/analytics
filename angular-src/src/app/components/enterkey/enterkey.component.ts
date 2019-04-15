import { Component, OnInit, ElementRef, AfterViewInit, VERSION, NgZone } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {tokenNotExpired} from 'angular2-jwt';

@Component({
  selector: 'app-enterkey',
  templateUrl: './enterkey.component.html',
  styleUrls: ['./enterkey.component.css']
})
export class EnterkeyComponent implements OnInit {
  startDate: String;
  endDate: String;
  token: String;
  private sub: any;

  constructor(
    private validateService: ValidateService, 
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone
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
      startDate: this.startDate,
      endDate: this.endDate
    }
    
    this.zone.run( () => {
      this.router.navigate(['/barchart'], {queryParams: {
        token: this.token, 
        startDate: clientInfo.startDate,
        endDate: clientInfo.endDate
        }
      }); 
    });
  }
}

