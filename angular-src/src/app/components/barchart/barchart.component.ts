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
  data: Array<any> = [5, 12, 34, 56, 88];
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
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getGoogleData();
  }

  getGoogleData(){
    let token = 0;
    let clientID = 0;
    let startDate = 0;
    let endDate = 0;
    let viewID = [];
    let views = [];
    const metric1 = 'pageviews';
    const metric2 = 'uniquePageviews';
    const dimension = 'pagePath';
    const sort = 'uniquePageViews';
    const max = 10;

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
    
    for(var i = 0; i < viewID.length; i++) {
      if(viewID[i] != undefined) {
        views.push(viewID[i]);
      }
    }

    this.onAnalyticsSubmit(startDate, endDate, metric1, token, views);
    //this.onUniquePageviewsSubmit(startDate, endDate, metric2, dimension, sort, max, token, views);
  }

  public onAnalyticsSubmit(date1, date2, metric1, accessToken, views) {
   // console.log("Calling Google Analytics API for total pageviews");
    let pageCountArray = [];
    let count = 0;
    for(let i=0; i<views.length; i++) {
      this.authService.getGoogleData(date1, date2, metric1, accessToken, views[i]).subscribe(data => {
        let pageViews = parseInt(data.totalsForAllResults["ga:pageviews"]);
        console.log(pageViews);
        console.log(typeof(pageViews));
        pageCountArray.push(pageViews);
        console.log(pageCountArray);
        count++;
        console.log(count);
        if(count == 3) { 
          this.pageviews = pageCountArray;
          //console.log(this.pageviews);
          this.createChart();
        }
      },
      err => {
        console.log(err);
        return false;
      });
    }
  }





  //public onAnalyticsSubmit(date1, date2, metric1, accessToken, viewID) {
   // console.log("Calling Google Analytics API for total pageviews");
   // this.authService.getGoogleData(date1, date2, metric1, accessToken, viewID).subscribe(data => {
   //   console.log(data);
      //console.log(data.id);
      //console.log(data.totalsForAllResults);
   //   console.log( data.profileInfo["profileName"] + " : " + data.totalsForAllResults["ga:pageviews"]);
   //   this.createChart();
   // },
   // err => {
   //   console.log(err);
   //    return false;
   //  });
  //}

  public onUniquePageviewsSubmit(date1, date2, metric, dimension, sort, max, accessToken, views) {
    //console.log("Calling Google Analytics API for top 10 page by pageview");

    for(let i=0; i<views.length; i++) {
      this.authService.getUniquePageviews(date1, date2, metric, dimension, sort, max, accessToken, views[i]).subscribe(data => {
        //console.log(data);
        //console.log(data.id);
        //console.log(data.rows);
        console.log(data.profileInfo["profileName"]);
        console.log(data.rows[0][0]);
        console.log(data.rows[1][0]);
        console.log(data.rows[2][0]);
        console.log(data.rows[3][0]);
        console.log(data.rows[4][0]);
        console.log(data.rows[5][0]);
        console.log(data.rows[6][0]);
        console.log(data.rows[7][0]);
        console.log(data.rows[8][0]);
        console.log(data.rows[9][0]);
      },
      err => {
        console.log(err);
        return false;
       });
    }
  }




  createChart() {

    console.log("in createChart");

    console.log(this.pageviews);
    console.log(typeof(this.pageviews[0]));
    console.log(this.data);
    console.log(typeof(this.data[0]));

  
    



    let element1 = this.chartContainer1.nativeElement;
    let element2 = this.chartContainer2.nativeElement;

    this.width = element2.offsetWidth - this.margin.left - this.margin.right;
    this.height = element2.offsetHeight - this.margin.top - this.margin.bottom;

    let svg1 = d3.select(element1).append('svg')
      .attr('width', element1.offsetWidth)
      .attr('height', element1.offsetHeight);

    let svg2 = d3.select(element2).append('svg')
      .attr('width', element2.offsetWidth)
      .attr('height', element2.offsetHeight);


    svg1.selectAll("rect")
      .data(this.pageviews)
      .enter()
      .append("rect")
      .attr("x", function(d, i) {
        return (i * 21)  //Bar width of 20 plus 1 for padding
      })
      .attr("y", function(d) {
        return element1.offsetHeight - d;  //Height minus data value
      })
      .attr("width", 20)
      .attr("height", function(d) {
        return d * 4;
      })
      .attr("fill", "teal");

      svg2.selectAll("rect")
      .data(this.data)
      .enter()
      .append("rect")
      .attr("x", function(d, i) {
        return (i * 21)  //Bar width of 20 plus 1 for padding
      })
      .attr("y", function(d) {
        return element2.offsetHeight - d;  //Height minus data value
      })
      .attr("width", 20)
      .attr("height", function(d) {
        return d * 4;
      })
      .attr("fill", "teal");


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
