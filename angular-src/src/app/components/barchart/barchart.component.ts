import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BarchartComponent implements OnInit {
  @ViewChild('chart1') private chartContainer1: ElementRef;
  @ViewChild('chart2') private chartContainer2: ElementRef;
  //data: Array<any> = [5, 12, 34, 56, 88];
  data: Array<any> = [8593, 7710, 6786, 6476, 4389, 8305];
  margin: any = { top: 20, bottom: 20, left: 20, right: 20};
  private chart: any;
  public width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;
  private sub: any;
  pageviews: Array<any>;
  pageviewsOnly = [];
  dateObj: Array<any>; 
  dateStr: Array<any>; 
  topPages: Array<any>;
  
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getGoogleData();
  }

  getGoogleData(){
    console.log("In getGoogleData");
    let token = "";
    let clientID = "";
    let startDate = "";
    let endDate = "";
    let viewID = [];
    let views = [];
    const metric1 = 'pageviews';
    const metric2 = 'uniquePageviews';
    const dimension = 'pagePath';
    const sort = 'uniquePageViews';
    const max = 5;


    //Get form data passed in from enterkey component as routing parameters
    this.sub = this.route
    .queryParams
    .subscribe(params => {
      token = params['token'];
      clientID = params['clientID'];
      startDate = params['startDate'];
      endDate = params['endDate'];
      viewID[0] = params['viewID1'];
      viewID[1] = params['viewID2'];
      viewID[2] = params['viewID3'];
      viewID[3] = params['viewID4'];
      viewID[4] = params['viewID5'];
    });


    //Create array of the views entered in form 
    for(var i = 0; i < viewID.length; i++) {
      if(viewID[i] != undefined) {
        views.push(viewID[i]);
      }
    }

    //Find previous full months 
    let dateObjArrayFirst = []; 
    let dateObjArrayLast = []; 
    let dateStrArrayFirst = []; 
    let dateStrArrayLast = []; 
    dateStrArrayFirst[0] = startDate;
    dateStrArrayLast[0] = endDate;
    dateObjArrayFirst[0] = this.getDate(startDate);
    dateObjArrayLast[0] = this.getDate(endDate);

    const numMonths = 6;

    for(var i = 1; i < numMonths; i++) {
      dateObjArrayFirst[i] = this.prevMonthFirst(dateObjArrayFirst[i-1]);
      dateObjArrayLast[i] = this.prevMonthLast(dateObjArrayFirst[i]); //Use first day of previous month to get last of that month
      dateStrArrayFirst[i] = dateObjArrayFirst[i].toISOString().substring(0,10);
      dateStrArrayLast[i] = dateObjArrayLast[i].toISOString().substring(0,10);
    }
   
    this.onAnalyticsSubmit(dateStrArrayFirst, dateStrArrayLast, metric1, token, views[1]);

    

    //this.onUniquePageviewsSubmit(startDate, endDate, metric2, dimension, sort, max, token, views);
  }


  //Create data object when passed a date string: YYYY-MM-DD
  public getDate(date) {
    const year = parseInt(date.slice(0,4));
    const month = parseInt(date.slice(5,7));
    const days = parseInt(date.substr(8));
    const newDate = new Date(year, month - 1, days);//
    return newDate;
  }

  //Calculate the previous month when passed a date object
  public prevMonthFirst(date) {
    var firstDate = new Date (date.getFullYear(), date.getMonth() -1, 1);
    return firstDate;
  }

  public prevMonthLast(date) {
    var lastDate = new Date (date.getFullYear(), date.getMonth() + 1, 0);
    return lastDate;
  }

  public onAnalyticsSubmit(date1, date2, metric1, accessToken, view) {
    console.log("In onAnalyticsSubmit");
    var pageviewArray = [];
    var count = 0;
    var pageviewObject = {
        "name": "",
        "views": 0,
        "month": "" 
      }; 

    for (var i = 0; i < date1.length; i++) {

      this.authService.getGoogleData(date1[i], date2[i], metric1, accessToken, view).subscribe(data => {

        console.log(data);
        count++;
        console.log(count);
        pageviewObject.name = data.profileInfo["profileName"];
        pageviewObject.views = parseInt(data.totalsForAllResults["ga:pageviews"]);
        pageviewObject.month = data.query["start-date"]; 
        pageviewArray.push({"name" : pageviewObject.name, "views": pageviewObject.views, "month": pageviewObject.month});
        console.log(pageviewObject);
        console.log(pageviewArray);

        //sort array if arrived out of sequence
        if(count == date1.length) {
          pageviewArray.sort((a,b) => {
            if(a.month < b.month)
              return -1;
            if(a.month > b.month)
              return 1;
            return 0;
          });
          this.pageviews = pageviewArray;
          for (var i = 0; i < pageviewArray.length; i++) {
            this.pageviewsOnly[i] = parseInt(pageviewArray[i].views);
          }
          console.log(this.pageviewsOnly);
          this.createChart();
        }
      },
      err => {
        console.log(err);
        return false;
      });
    }
  }

  

  //public onUniquePageviewsSubmit(date1, date2, metric, dimension, sort, max, accessToken, views) {
   // let topPagesArray = [];
   // let count = 0;
   // for(let i=0; i<views.length; i++) {
   //   let topPagesObject = 
   //     {
   //       name: "",
   //       page1: "",
   //       page1Views: 0,
   //       page2: "",
   //       page2Views: 0,
   //       page3: "",
   //       page3Views: 0,
   //       page4: "",
   //       page4Views: 0,
   //       page5: "",
   //       page5Views: 0,
   //     }
   //   this.authService.getUniquePageviews(date1, date2, metric, dimension, sort, max, accessToken, views[i]).subscribe(data => {
   //     console.log(data);
   //     //console.log(data.rows);
//
//        topPagesObject.name = data.profileInfo["profileName"];
//        topPagesObject.page1 = data.rows[0][0];
//        topPagesObject.page1Views = data.rows[0][1];
//        topPagesObject.page2 = data.rows[1][0];
//        topPagesObject.page2Views = data.rows[1][1];
//        topPagesObject.page3 = data.rows[2][0];
//        topPagesObject.page3Views = data.rows[2][1];
//        topPagesObject.page4 = data.rows[3][0];
//        topPagesObject.page4Views = data.rows[3][1];
//        topPagesObject.page5 = data.rows[4][0];
//        topPagesObject.page5Views = data.rows[4][1];
//
//        topPagesArray.push(topPagesObject);
//        count++;
//        console.log(count);
//        if(count == views.length) {
//          this.topPages = topPagesArray;
//        }
//      },
//      err => {
//        console.log(err);
//        return false;
//       });
//    }
//  }

  createChart() {

    console.log("in createChart");

    let element1 = this.chartContainer1.nativeElement;
    //let element2 = this.chartContainer2.nativeElement;

    this.width = element1.offsetWidth - this.margin.left - this.margin.right;
    this.height = element1.offsetHeight - this.margin.top - this.margin.bottom;

    //console.log(this.width);
    //console.log(this.height);
    //console.log(element1.offsetWidth);
    //console.log(element1.offsetHeight);

    let svg1 = d3.select(element1).append('svg')
      .attr('width', element1.offsetWidth)
      .attr('height', element1.offsetHeight);

    //let svg2 = d3.select(element2).append('svg')
     // .attr('width', element2.offsetWidth)
     // .attr('height', element2.offsetHeight);



   console.log(this.data);
   console.log(this.pageviewsOnly);

    svg1.selectAll("rect")
     // .data(this.data)
      .data(this.pageviewsOnly)
      .enter()
      .append("rect")
      .attr("x", function(d, i) {
        return (i * 65)  //Bar width of 20 plus 1 for padding
      })
      .attr("y", function(d) {
        return element1.offsetHeight - (d * 0.001) ;  //Height minus data value
      })
      .attr("width", 60)
      .attr("height", function(d) {
        return (d * 0.001); 
      })
      .attr("fill", "red");





      //svg2.selectAll("rect")
      //.data(this.data)
      //.enter()
      //.append("rect")
      //.attr("x", function(d, i) {
      //  return (i * 21)  //Bar width of 20 plus 1 for padding
      //})
      //.attr("y", function(d) {
      //  return element2.offsetHeight - d;  //Height minus data value
      //})
      //.attr("width", 20)
      //.attr("height", function(d) {
      //  return d * 4;
      //})
      //.attr("fill", "green");


    // chart plot area
    //this.chart = svg.append('g')
     // .attr('class', 'bars')
     // .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    // define X & Y domains
    //let xDomain = this.data.map(d => d[0]);
    //let yDomain = [0, d3.max(this.data, d => d[1])];

    // create scales
    //this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
    //this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

    // bar colors
    //this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['red', 'blue']);

    // x & y axis
   // this.xAxis = svg.append('g')
   //   .attr('class', 'axis axis-x')
    //  .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
    //  .call(d3.axisBottom(this.xScale));
   // this.yAxis = svg.append('g')
    //  .attr('class', 'axis axis-y')
    //  .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
    //  .call(d3.axisLeft(this.yScale));
  }

  //updateChart() {
    // update scales & axis
    //this.xScale.domain(this.data.map(d => d[0]));
    //this.yScale.domain([0, d3.max(this.data, d => d[1])]);
    //this.colors.domain([0, this.data.length]);
    ////this.xAxis.transition().call(d3.axisBottom(this.xScale));
    //this.yAxis.transition().call(d3.axisLeft(this.yScale));

    //let update = this.chart.selectAll('.bar')
    //  .data(this.data);

    // remove exiting bars
    //update.exit().remove();

    // update existing bars
    //this.chart.selectAll('.bar').transition()
    //  .attr('x', d => this.xScale(d[0]))
    //  .attr('y', d => this.yScale(d[1]))
    //  .attr('width', d => this.xScale.bandwidth())
    //  .attr('height', d => this.height - this.yScale(d[1]))
    //  .style('fill', (d, i) => this.colors(i));

    // add new bars
    //update
    //  .enter()
    //  .append('rect')
    //  .attr('class', 'bar')
    //  .attr('x', d => this.xScale(d[0]))
    //  .attr('y', d => this.yScale(0))
    //  .attr('y', 0)
    //  .attr('width', this.xScale.bandwidth())
    //  .attr('height', 0)
    //  .style('fill', (d, i) => this.colors(i))
    //  .transition()
    //  .delay((d, i) => i * 10)
    //  .attr('y', d => this.yScale(d[1]))
    //  .attr('height', d => this.height - this.yScale(d[1]));
  //}


}
