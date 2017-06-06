import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

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

  constructor() { }

  ngOnInit() {
    console.log("Data: " + this.data);
  	this.createChart();
  }

  createChart() {
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
      .data(this.data)
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
