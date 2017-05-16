import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enterkey',
  templateUrl: './enterkey.component.html',
  styleUrls: ['./enterkey.component.css']
})
export class EnterkeyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onAnalyticsSubmit() {
  	console.log("Calling Google Analytics API for give key and view id");
  }

}
