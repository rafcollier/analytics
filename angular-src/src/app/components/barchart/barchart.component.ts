import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';

const config = require('../../../../../config/google');

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BarchartComponent implements OnInit {
  //@ViewChild('chart1') private chartContainer1: ElementRef;
  //@ViewChild('chart2') private chartContainer2: ElementRef;
  //data: Array<any> = [5, 12, 34, 56, 88];
  data: Array<any> = [8, 10, 6, 7, 15, 22];
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

  showData = false;
  inputAll = {};
  pageviews: Array<any> = [];
  topPages: Array<any> = [];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
   let inputObj = this.getInputData();
   let firstDaysArr = this.getDates(inputObj["firstDay"]);
   let lastDaysArr = this.getDates(inputObj["lastDay"]);
   this.inputAll = {
     "token": inputObj["token"],
     "firstDays": firstDaysArr,
     "lastDays": lastDaysArr,
     "views" : [
        {"name": config.name1, "id": config.viewID1}, 
        {"name": config.name2, "id": config.viewID2}, 
        {"name": config.name3, "id": config.viewID3}, 
        {"name": config.name4, "id": config.viewID4}, 
        {"name": config.name5, "id": config.viewID5} 
     ],
     "metric1": "pageviews",
     "metric2": "uniquePageviews",
     "dimension": "pagePath",
     "sort": "uniquePageviews",
     "max": 10
   }

   console.log(this.inputAll); 
  }
  

  //Get form data passed in from enterkey component as routing parameters
  getInputData() {
    console.log("In getInputData");
    let dataInput = {};
    this.sub = this.route
    .queryParams
    .subscribe(params => {
      dataInput["token"] = params['token'];
      dataInput["firstDay"] = params['startDate'];
      dataInput["lastDay"] = params['endDate'];
    });
    return dataInput;
  }

  //Get Array of 5 previous months (first or last days)
  getDates(day) {
    console.log("In getDates");
    const num = 6;
    let objArr = []; 
    let strArr = []; 
    strArr[0] = day;
    objArr[0] = this.getDate(day);
    for(var i = 1; i < num; i++) {
      if(day.substr(8) == '01') { //First day of month
        objArr[i] = this.prevMonthFirst(objArr[i-1]);
      } else {
        const firstDay = this.prevMonthFirst(this.getDate(strArr[i-1].substr(0,8).concat('01'))); //get first day previous month
        objArr[i] = this.prevMonthLast(firstDay); //get last day previous month from the first day
      }
      strArr[i] = objArr[i].toISOString().substr(0,10);
    }
    return strArr; 
  }

  //Create data object when passed a date string: YYYY-MM-DD
  getDate(date) {
    const year = parseInt(date.slice(0,4));
    const month = parseInt(date.slice(5,7));
    const days = parseInt(date.substr(8));
    const newDate = new Date(year, month - 1, days);//
    return newDate;
  }

  //Calculate first day of the previous month when passed a date object
  prevMonthFirst(date) {
    var firstDate = new Date (date.getFullYear(), date.getMonth() -1, 1);
    return firstDate;
  }

  //Calculate last day of the previous month when passed a date object
  prevMonthLast(date) {
    var lastDate = new Date (date.getFullYear(), date.getMonth() + 1, 0);
    return lastDate;
  }


  public onButtonOneClick() {
    console.log("Button One Clicked.");
    this.showData = true;
    this.onAnalyticsSubmit(this.inputAll["views"][0]);
    this.onUniquePageviewsSubmit(this.inputAll["views"][0]);
    
  }

  public onButtonTwoClick() {
    console.log("Button One Clicked.");
    this.onAnalyticsSubmit(this.inputAll["views"][1]);
    this.onUniquePageviewsSubmit(this.inputAll["views"][1]);
    this.showData = true;
  }

  public onButtonThreeClick() {
    console.log("Button One Clicked.");
    this.onAnalyticsSubmit(this.inputAll["views"][2]);
    this.onUniquePageviewsSubmit(this.inputAll["views"][2]);
    this.showData = true;
  }

  public onButtonFourClick() {
    console.log("Button One Clicked.");
    this.onAnalyticsSubmit(this.inputAll["views"][3]);
    this.onUniquePageviewsSubmit(this.inputAll["views"][3]);
    this.showData = true;
  }

  public onButtonFiveClick() {
    console.log("Button One Clicked.");
    this.onAnalyticsSubmit(this.inputAll["views"][4]);
    this.onUniquePageviewsSubmit(this.inputAll["views"][4]);
    this.showData = true;
  }

  public onAnalyticsSubmit(view) {
    console.log("In onAnalyticsSubmit");
    console.log(view);
    var pageviewArray = [];
    var count = 0;

    for (var i = 0; i < this.inputAll["firstDays"].length; i++) {

     this.authService.getGoogleData(this.inputAll["firstDays"][i], this.inputAll["lastDays"][i], this.inputAll["metric1"], this.inputAll["token"], view["id"]).subscribe(data => {
        count++;
        pageviewArray.push({"pageName" : view["name"], "views": parseInt(data.totalsForAllResults["ga:pageviews"]), "month": data.query["start-date"]});

        //sort array if arrived out of sequence
        if(count == this.inputAll["firstDays"].length) {
          pageviewArray.sort((a,b) => {
            if(a.month < b.month)
              return -1;
            if(a.month > b.month)
              return 1;
            return 0;
          });
        console.log(pageviewArray); 
        this.createChart(pageviewArray);
        }  
      },
      err => {
        console.log(err);
        return false;
      });
    }
    //console.log(pageviewArray);
    //let sortedArr = this.sortArr(pageviewArray); 
    //return pageviewArray;
  }

  public onUniquePageviewsSubmit(view) {
    let topPagesArray = [];
    let count = 0;
    let topPagesObject = 
        {
          url: "",
          views: "" 
        };

    this.authService.getUniquePageviews(this.inputAll["firstDays"][0], this.inputAll["lastDays"][0], this.inputAll["metric2"], this.inputAll["dimension"], this.inputAll["sort"], this.inputAll["max"], this.inputAll["token"], view["id"]).subscribe(data => {
      console.log(data);
      for(var i=0; i<this.inputAll["max"]; i++) {
        topPagesArray.push({"url": data.rows[i][0], "views": data.rows[i][1]}); 
      }
      this.topPages = topPagesArray;
      //console.log(this.topPages);
      },
      err => {
        console.log(err);
        return false;
      });
    }
  

  public createChart(dataset) {

    console.log("in createChart");
    console.log(dataset);

    //let element1 = this.chartContainer1.nativeElement;
   // let element2 = this.chartContainer2.nativeElement;

    //this.width = element1.offsetWidth - this.margin.left - this.margin.right;
    //this.height = element1.offsetHeight - this.margin.top - this.margin.bottom;
    //console.log(this.width);
    //console.log(this.height);
   // console.log(element1.offsetWidth);
    //console.log(element1.offsetHeight);

    //let svg1 = d3.select(element1).append('svg')
     // .attr('width', element1.offsetWidth)
     // .attr('height', element1.offsetHeight);

    //let svg2 = d3.select(element2).append('svg')
     // .attr('width', element2.offsetWidth)
     // .attr('height', element2.offsetHeight);



   //console.log(this.data);
   //console.log(this.pageviewsOnly);

    //svg1.selectAll("rect")
     // .data(this.data)
     // .data(this.pageviewsOnly)
     // .enter()
     // .append("rect")
     // .attr("x", function(d, i) {
     //   return (i * 65)  //Bar width of 20 plus 1 for padding
     // })
     // .attr("y", function(d) {
     //   return element1.offsetHeight - (d * 0.001) ;  //Height minus data value
     // })
     // .attr("width", 60)
     // .attr("height", function(d) {
     //   return (d * 0.001); 
     // })
     // .attr("fill", "red");





//      svg2.selectAll("rect")
//      .data(this.data)
//      .enter()
//      .append("rect")
//      .attr("x", function(d, i) {
//        return (i * 21)  //Bar width of 20 plus 1 for padding
//      })
//      .attr("y", function(d) {
//        return element2.offsetHeight - (d * 10);  //Height minus data value
//      })
//      .attr("width", 20)
//      .attr("height", function(d) {
//        return (d * 10);
//      })
//      .attr("fill", "green");





      //d3.select("body").selectAll("p")
       // .data(this.data)
       // .enter()
       // .append("p")
       // //.text("New Paragraph");
       // .text(function(d) {return d;})
       // .style("color", "red");



      //d3.select("body").selectAll("h4")
       // .data(this.data)
       // .enter()
       // .append("h4")
       // .text(function(d) {return d;});
        //.attr("class", "bar");


     // d3.select("body").selectAll(".somediv") //can't select DIV because already DIV in HTML
      //  .data(this.pageviewsOnly)
      //  .enter()
      //  .append("div")
      //  .attr("class", "bar")
      //  .style("height", function(d) {
      //    var barHeight = d * 0.001;
      //    return barHeight + "px";
      //  });



      //var w = 500;
      //var h = 50;

      //var svg = d3.select("body")
      //  .append("svg")
      //  .attr("width", w)
      //  .attr("height", h)
//
//      var circles = svg.selectAll("circle")  
//        .data(this.data)
//        .enter()
//        .append("circle");
//
//      circles.attr('cx', function(d, i) {
//        return (i * 50) + 25;
//      })
//      .attr("cy", h/2)
//      .attr("r", function(d) {
//        return d;
//      })
//      .attr("fill", "yellow");

     
      d3.select("svg").remove();

      var w = 500;
      var h = 500;
      var barPadding = 3;
      //var dataset = this.pageviewsOnly;
      //var dataset = this.pageviews;
      //var dataset = pageViewArray;
      //console.log("dataset");
      //console.log(dataset);

      //var xscale = d3.scaleLinear()
       // .domain([d3.min(dataset, function(d) { return d; }), d3.max(dataset, function(d) {return d;})])
       // .range([0, w]);
        
      //var yscale = d3.scaleLinear()
      //  .domain([d3.min(dataset, function(d) { return d; }), d3.max(dataset, function(d) {return d;})])
      //  .range([0, h]);


      var svg = d3.select("#barchart1")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("align", "center");


      svg.selectAll("rect")  
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
          return i * (w / dataset.length);
        })
        .attr("y", function(d) {
          if(d["pageName"] == "CMAJ News")
            return h - (d["views"] * 0.035);
          if(d["pageName"] == "CMAJ Blogs")
            return h - (d["views"] * 0.05);
          if(d["pageName"] == "CMAJ.CA")
            return h - (d["views"] * 0.0015);
          if(d["pageName"] == "CMAJ Open")
            return h - (d["views"] * 0.025);
          if(d["pageName"] == "CMAJ Mobile")
            return h - (d["views"] * 0.0055);
          else
            return h - (d["views"] * 0.002);
        })
        .attr("width", w /dataset.length - barPadding)
        .attr("height", function(d) {
          if(d["pageName"] == "CMAJ News")
            return (d["views"] * 0.035);
          if(d["pageName"] == "CMAJ Blogs")
            return (d["views"] * 0.05);
          if(d["pageName"] == "CMAJ.CA")
            return (d["views"] * 0.0015);
          if(d["pageName"] == "CMAJ Open")
            return (d["views"] * 0.025);
          if(d["pageName"] == "CMAJ Mobile")
            return (d["views"] * 0.0055);
          else
            return (d["views"] * 0.02);
        })
        .attr("fill", "#DE8D47");
      
      svg.selectAll("text.values")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
          return (d["views"] * 0.001).toFixed(1);
        })
        .attr("x", function (d, i) {
          return i * (w / dataset.length) + 25;
        })
        .attr("y", function (d) {
          if(d["pageName"] == "CMAJ News")
            return h - (d["views"] * 0.035) + 25;
          if(d["pageName"] == "CMAJ Blogs")
            return h - (d["views"] * 0.05) + 25;
          if(d["pageName"] == "CMAJ.CA")
            return h - (d["views"] * 0.0015) + 25;
          if(d["pageName"] == "CMAJ Open")
            return h - (d["views"] * 0.025) + 25;
          if(d["pageName"] == "CMAJ Mobile")
            return h - (d["views"] * 0.0055) + 25;
          else
            return h - (d["views"] * 0.02) + 25;
        })
        .attr("font-family", "arial")
        .attr("font-size", "16px")
        .attr("fill", "white");

      svg.selectAll("text.labels")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
          return d["month"].slice(0,7);
        })
        .attr("x", function (d, i) {
          return i * (w / dataset.length) + 15;
        })
        .attr("y", function (d) {
          return h - 20;
        })
        .attr("font-family", "arial")
        .attr("font-size", "14px")
        .attr("fill", "white");


      




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
