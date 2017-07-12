webpackJsonp([1,4],{

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutComponent; });
var AboutComponent = (function () {
    function AboutComponent() {
    }
    AboutComponent.prototype.ngOnInit = function () {
    };
    AboutComponent.ctorParameters = function () { return []; };
    return AboutComponent;
}());
//# sourceMappingURL=/Users/Collier/Documents/Projects/analytics/angular-src/src/about.component.js.map

/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(576);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(24);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BarchartComponent; });




var config = __webpack_require__(322);
var BarchartComponent = (function () {
    function BarchartComponent(router, route, authService) {
        this.router = router;
        this.route = route;
        this.authService = authService;
        //@ViewChild('chart1') private chartContainer1: ElementRef;
        //@ViewChild('chart2') private chartContainer2: ElementRef;
        //data: Array<any> = [5, 12, 34, 56, 88];
        this.data = [8, 10, 6, 7, 15, 22];
        this.margin = { top: 20, bottom: 20, left: 20, right: 20 };
        this.showData = false;
        this.inputAll = {};
        this.pageviews = [];
        this.topPages = [];
    }
    BarchartComponent.prototype.ngOnInit = function () {
        var inputObj = this.getInputData();
        var firstDaysArr = this.getDates(inputObj["firstDay"]);
        var lastDaysArr = this.getDates(inputObj["lastDay"]);
        this.inputAll = {
            "token": inputObj["token"],
            "firstDays": firstDaysArr,
            "lastDays": lastDaysArr,
            "views": [
                { "name": config.name1, "id": config.viewID1 },
                { "name": config.name2, "id": config.viewID2 },
                { "name": config.name3, "id": config.viewID3 },
                { "name": config.name4, "id": config.viewID4 },
                { "name": config.name5, "id": config.viewID5 }
            ],
            "metric1": "pageviews",
            "metric2": "uniquePageviews",
            "dimension": "pagePath",
            "sort": "uniquePageviews",
            "max": 10
        };
        console.log(this.inputAll);
    };
    //Get form data passed in from enterkey component as routing parameters
    BarchartComponent.prototype.getInputData = function () {
        console.log("In getInputData");
        var dataInput = {};
        this.sub = this.route
            .queryParams
            .subscribe(function (params) {
            dataInput["token"] = params['token'];
            dataInput["firstDay"] = params['startDate'];
            dataInput["lastDay"] = params['endDate'];
        });
        return dataInput;
    };
    //Get Array of 5 previous months (first or last days)
    BarchartComponent.prototype.getDates = function (day) {
        console.log("In getDates");
        var num = 6;
        var objArr = [];
        var strArr = [];
        strArr[0] = day;
        objArr[0] = this.getDate(day);
        for (var i = 1; i < num; i++) {
            if (day.substr(8) == '01') {
                objArr[i] = this.prevMonthFirst(objArr[i - 1]);
            }
            else {
                var firstDay = this.prevMonthFirst(this.getDate(strArr[i - 1].substr(0, 8).concat('01'))); //get first day previous month
                objArr[i] = this.prevMonthLast(firstDay); //get last day previous month from the first day
            }
            strArr[i] = objArr[i].toISOString().substr(0, 10);
        }
        return strArr;
    };
    //Create data object when passed a date string: YYYY-MM-DD
    BarchartComponent.prototype.getDate = function (date) {
        var year = parseInt(date.slice(0, 4));
        var month = parseInt(date.slice(5, 7));
        var days = parseInt(date.substr(8));
        var newDate = new Date(year, month - 1, days); //
        return newDate;
    };
    //Calculate first day of the previous month when passed a date object
    BarchartComponent.prototype.prevMonthFirst = function (date) {
        var firstDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
        return firstDate;
    };
    //Calculate last day of the previous month when passed a date object
    BarchartComponent.prototype.prevMonthLast = function (date) {
        var lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return lastDate;
    };
    BarchartComponent.prototype.onButtonOneClick = function () {
        console.log("Button One Clicked.");
        this.showData = true;
        this.onAnalyticsSubmit(this.inputAll["views"][0]);
        this.onUniquePageviewsSubmit(this.inputAll["views"][0]);
    };
    BarchartComponent.prototype.onButtonTwoClick = function () {
        console.log("Button One Clicked.");
        this.onAnalyticsSubmit(this.inputAll["views"][1]);
        this.onUniquePageviewsSubmit(this.inputAll["views"][1]);
        this.showData = true;
    };
    BarchartComponent.prototype.onButtonThreeClick = function () {
        console.log("Button One Clicked.");
        this.onAnalyticsSubmit(this.inputAll["views"][2]);
        this.onUniquePageviewsSubmit(this.inputAll["views"][2]);
        this.showData = true;
    };
    BarchartComponent.prototype.onButtonFourClick = function () {
        console.log("Button One Clicked.");
        this.onAnalyticsSubmit(this.inputAll["views"][3]);
        this.onUniquePageviewsSubmit(this.inputAll["views"][3]);
        this.showData = true;
    };
    BarchartComponent.prototype.onButtonFiveClick = function () {
        console.log("Button One Clicked.");
        this.onAnalyticsSubmit(this.inputAll["views"][4]);
        this.onUniquePageviewsSubmit(this.inputAll["views"][4]);
        this.showData = true;
    };
    BarchartComponent.prototype.onAnalyticsSubmit = function (view) {
        var _this = this;
        console.log("In onAnalyticsSubmit");
        console.log(view);
        var pageviewArray = [];
        var count = 0;
        for (var i = 0; i < this.inputAll["firstDays"].length; i++) {
            this.authService.getGoogleData(this.inputAll["firstDays"][i], this.inputAll["lastDays"][i], this.inputAll["metric1"], this.inputAll["token"], view["id"]).subscribe(function (data) {
                count++;
                pageviewArray.push({ "pageName": view["name"], "views": parseInt(data.totalsForAllResults["ga:pageviews"]), "month": data.query["start-date"] });
                //sort array if arrived out of sequence
                if (count == _this.inputAll["firstDays"].length) {
                    pageviewArray.sort(function (a, b) {
                        if (a.month < b.month)
                            return -1;
                        if (a.month > b.month)
                            return 1;
                        return 0;
                    });
                    console.log(pageviewArray);
                    _this.createChart(pageviewArray);
                }
            }, function (err) {
                console.log(err);
                return false;
            });
        }
        //console.log(pageviewArray);
        //let sortedArr = this.sortArr(pageviewArray); 
        //return pageviewArray;
    };
    BarchartComponent.prototype.onUniquePageviewsSubmit = function (view) {
        var _this = this;
        var topPagesArray = [];
        var count = 0;
        var topPagesObject = {
            url: "",
            views: ""
        };
        this.authService.getUniquePageviews(this.inputAll["firstDays"][0], this.inputAll["lastDays"][0], this.inputAll["metric2"], this.inputAll["dimension"], this.inputAll["sort"], this.inputAll["max"], this.inputAll["token"], view["id"]).subscribe(function (data) {
            console.log(data);
            for (var i = 0; i < _this.inputAll["max"]; i++) {
                topPagesArray.push({ "url": data.rows[i][0], "views": data.rows[i][1] });
            }
            _this.topPages = topPagesArray;
            //console.log(this.topPages);
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    BarchartComponent.prototype.createChart = function (dataset) {
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
        __WEBPACK_IMPORTED_MODULE_0_d3__["select"]("svg").remove();
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
        var svg = __WEBPACK_IMPORTED_MODULE_0_d3__["select"]("#barchart1")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("align", "center");
        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", function (d, i) {
            return i * (w / dataset.length);
        })
            .attr("y", function (d) {
            if (d["pageName"] == "CMAJ News")
                return h - (d["views"] * 0.035);
            if (d["pageName"] == "CMAJ Blogs")
                return h - (d["views"] * 0.05);
            if (d["pageName"] == "CMAJ.CA")
                return h - (d["views"] * 0.0015);
            if (d["pageName"] == "CMAJ Open")
                return h - (d["views"] * 0.025);
            if (d["pageName"] == "CMAJ Mobile")
                return h - (d["views"] * 0.0055);
            else
                return h - (d["views"] * 0.002);
        })
            .attr("width", w / dataset.length - barPadding)
            .attr("height", function (d) {
            if (d["pageName"] == "CMAJ News")
                return (d["views"] * 0.035);
            if (d["pageName"] == "CMAJ Blogs")
                return (d["views"] * 0.05);
            if (d["pageName"] == "CMAJ.CA")
                return (d["views"] * 0.0015);
            if (d["pageName"] == "CMAJ Open")
                return (d["views"] * 0.025);
            if (d["pageName"] == "CMAJ Mobile")
                return (d["views"] * 0.0055);
            else
                return (d["views"] * 0.02);
        })
            .attr("fill", "#DE8D47");
        svg.selectAll("text.values")
            .data(dataset)
            .enter()
            .append("text")
            .text(function (d) {
            return (d["views"] * 0.001).toFixed(1);
        })
            .attr("x", function (d, i) {
            return i * (w / dataset.length) + 25;
        })
            .attr("y", function (d) {
            if (d["pageName"] == "CMAJ News")
                return h - (d["views"] * 0.035) + 25;
            if (d["pageName"] == "CMAJ Blogs")
                return h - (d["views"] * 0.05) + 25;
            if (d["pageName"] == "CMAJ.CA")
                return h - (d["views"] * 0.0015) + 25;
            if (d["pageName"] == "CMAJ Open")
                return h - (d["views"] * 0.025) + 25;
            if (d["pageName"] == "CMAJ Mobile")
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
            .text(function (d) {
            return d["month"].slice(0, 7);
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
    };
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
    BarchartComponent.ctorParameters = function () { return [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] }, { type: __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] }]; };
    return BarchartComponent;
}());
//# sourceMappingURL=/Users/Collier/Documents/Projects/analytics/angular-src/src/barchart.component.js.map

/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_validate_service__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_flash_messages__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(56);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnterkeyComponent; });





var EnterkeyComponent = (function () {
    function EnterkeyComponent(validateService, flashMessage, authService, router, route) {
        this.validateService = validateService;
        this.flashMessage = flashMessage;
        this.authService = authService;
        this.router = router;
        this.route = route;
    }
    EnterkeyComponent.prototype.ngOnInit = function () {
    };
    EnterkeyComponent.prototype.onIdSubmit = function () {
        var _this = this;
        this.sub = this.route
            .queryParams
            .subscribe(function (params) {
            // Defaults to 0 if no query param provided.
            _this.token = params['token'] || 0;
            console.log("In enterkey and token is: " + _this.token);
        });
        var clientInfo = {
            //clientID: this.clientID,
            //viewID1: this.viewID1,
            //viewID2: this.viewID2,
            //viewID3: this.viewID3,
            //viewID4: this.viewID4,
            //viewID5: this.viewID5,
            startDate: this.startDate,
            endDate: this.endDate
        };
        this.router.navigate(['/barchart'], { queryParams: {
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
    };
    EnterkeyComponent.ctorParameters = function () { return [{ type: __WEBPACK_IMPORTED_MODULE_0__services_validate_service__["a" /* ValidateService */] }, { type: __WEBPACK_IMPORTED_MODULE_1_angular2_flash_messages__["FlashMessagesService"] }, { type: __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] }, { type: __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] }, { type: __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* ActivatedRoute */] }]; };
    return EnterkeyComponent;
}());
//# sourceMappingURL=/Users/Collier/Documents/Projects/analytics/angular-src/src/enterkey.component.js.map

/***/ }),

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(56);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });



var config = __webpack_require__(322);
var HomeComponent = (function () {
    function HomeComponent(authService, element, router) {
        this.authService = authService;
        this.element = element;
        this.router = router;
        this.scope = [
            'profile',
            'email',
            'https://www.googleapis.com/auth/plus.me',
            'https://www.googleapis.com/auth/contacts.readonly',
            'https://www.googleapis.com/auth/admin.directory.user.readonly',
            'https://www.googleapis.com/auth/plus.login' //to get access token
        ].join(' ');
    }
    HomeComponent.prototype.ngAfterViewInit = function () {
        console.log("inside afterviewinit");
        this.googleInit();
    };
    HomeComponent.prototype.googleInit = function () {
        var _this = this;
        console.log("inside google init");
        gapi.load('auth2', function () {
            _this.auth2 = gapi.auth2.init({
                client_id: config.clientIdCmaj,
                cookiepolicy: 'single_host_origin',
                scope: _this.scope
            });
            _this.attachSignin(_this.element.nativeElement.firstChild);
        });
    };
    HomeComponent.prototype.attachSignin = function (element) {
        var _this = this;
        console.log("inside attach signin");
        this.auth2.attachClickHandler(element, {}, function (googleUser) {
            var profile = googleUser.getBasicProfile();
            var accessToken = googleUser.getAuthResponse().access_token;
            //console.log('ID Token || ' + googleUser.getAuthResponse().id_token);
            //console.log('Access Token || ' + googleUser.getAuthResponse().access_token);
            //console.log(accessToken);
            //console.log('ID: ' + profile.getId());
            //console.log('Name: ' + profile.getName());
            //console.log('Image URL: ' + profile.getImageUrl());
            //console.log('Email: ' + profile.getEmail());
            _this.router.navigate(['/enterkey'], { queryParams: { token: accessToken } });
        }, function (error) {
            console.log(JSON.stringify(error, undefined, 2));
        });
    };
    HomeComponent.ctorParameters = function () { return [{ type: __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] }, { type: __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] }]; };
    return HomeComponent;
}());
//# sourceMappingURL=/Users/Collier/Documents/Projects/analytics/angular-src/src/home.component.js.map

/***/ }),

/***/ 190:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidateService; });
var ValidateService = (function () {
    function ValidateService() {
    }
    ValidateService.prototype.validateRegister = function (user) {
        console.log("Validating registration form");
        if (user.username == undefined || user.password == undefined) {
            return false;
        }
        else {
            return true;
        }
    };
    ValidateService.ctorParameters = function () { return []; };
    return ValidateService;
}());
//# sourceMappingURL=/Users/Collier/Documents/Projects/analytics/angular-src/src/validate.service.js.map

/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(583);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_jwt__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });



var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
    }
    AuthService.prototype.registerUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        //return this.http.post('http://localhost:3000/users/register', user, {headers: headers}) //for local development
        return this.http.post('users/register', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.authenticateUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('users/authenticate', user, { headers: headers }) //add this for local dev: http://localhost:3000/
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.storeUserData = function (token, user) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user)); //local storage can only store strings, not objects
        this.authToken = token;
        this.user = user;
    };
    AuthService.prototype.getProfile = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get('users/profile', { headers: headers }) //add this for local dev: http://localhost:3000/
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.getGoogleData = function (date1, date2, metric1, accessToken, viewID) {
        //https://ga-dev-tools.appspot.com/query-explorer/
        //Generate API request from : https://ga-dev-tools.appspot.com/query-explorer/ 
        console.log("in AuthServices getGoogleData");
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        //return this.http.get('https://jsonplaceholder.typicode.com/posts'); //fate JSON data for testing
        return this.http.get('https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A' + viewID + '&start-date=' + date1 + '&end-date=' + date2 + '&metrics=ga%3A' + metric1 + '&access_token=' + accessToken)
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.getUniquePageviews = function (date1, date2, metric, dimension, sort, max, accessToken, viewID) {
        //https://ga-dev-tools.appspot.com/query-explorer/
        //Generate API request from : https://ga-dev-tools.appspot.com/query-explorer/ 
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        //return this.http.get('https://jsonplaceholder.typicode.com/posts'); //fate JSON data for testing
        return this.http.get('https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A' + viewID + '&start-date=' + date1 + '&end-date=' + date2 + '&metrics=ga%3A' + metric + '&dimensions=ga%3A' + dimension + '&sort=-ga%3A' + sort + '&max-results=' + max + '&access_token=' + accessToken)
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.loadToken = function () {
        var token = localStorage.getItem('id_token');
        this.authToken = token;
    };
    AuthService.prototype.logout = function () {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    };
    AuthService.prototype.loggedIn = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_angular2_jwt__["tokenNotExpired"])('id_token');
    };
    AuthService.ctorParameters = function () { return [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_http__["Http"] }]; };
    return AuthService;
}());
//# sourceMappingURL=/Users/Collier/Documents/Projects/analytics/angular-src/src/auth.service.js.map

/***/ }),

/***/ 265:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_auth_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });



var NavbarComponent = (function () {
    function NavbarComponent(authService, router, flashMessage) {
        this.authService = authService;
        this.router = router;
        this.flashMessage = flashMessage;
        this.isIn = false;
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent.prototype.toggleState = function () {
        var bool = this.isIn;
        this.isIn = bool === false ? true : false;
    };
    NavbarComponent.prototype.onLogoutClick = function () {
        this.authService.logout();
        this.flashMessage.show('You are logged out', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login']);
        return false;
    };
    NavbarComponent.prototype.onRefreshHome = function () {
        var _this = this;
        console.log("Refresh Homepage");
        this.router.navigateByUrl('/dummy', { skipLocationChange: true });
        setTimeout(function () { return _this.router.navigate(['']); });
        return false;
    };
    NavbarComponent.ctorParameters = function () { return [{ type: __WEBPACK_IMPORTED_MODULE_0__services_auth_service__["a" /* AuthService */] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] }, { type: __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__["FlashMessagesService"] }]; };
    return NavbarComponent;
}());
//# sourceMappingURL=/Users/Collier/Documents/Projects/analytics/angular-src/src/navbar.component.js.map

/***/ }),

/***/ 322:
/***/ (function(module, exports) {

module.exports = {
	clientIdCmaj: '964102028533-8nglmq3i7cjsfqdgvugi6t3fo76oom82.apps.googleusercontent.com', 
	viewID1: '132388667', 
	name1: 'CMAJ News',
    viewID2: '86326441',
    name2: 'CMAJ Blogs',
    viewID3: '32499969',
    name3: 'CMAJ.CA',
    viewID4: '65830623',
    name4: 'CMAJ Open',
    viewID5: '103455005',
    name5: 'CMAJ Mobile'
 }

/***/ }),

/***/ 323:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 323;


/***/ }),

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environments_environment__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__gendir_app_app_module_ngfactory__ = __webpack_require__(397);




if (__WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* platformBrowser */])().bootstrapModuleFactory(__WEBPACK_IMPORTED_MODULE_3__gendir_app_app_module_ngfactory__["a" /* AppModuleNgFactory */]);
//# sourceMappingURL=/Users/Collier/Documents/Projects/analytics/angular-src/src/main.js.map

/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
/* tslint:disable */
var styles = [''];
//# sourceMappingURL=/Users/Collier/Documents/Projects/analytics/angular-src/src/app.component.css.shim.ngstyle.js.map

/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_app_component__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core_src_metadata_view__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core_src_linker_component_factory__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component_css_shim_ngstyle__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_components_navbar_navbar_component__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_navbar_navbar_component_ngfactory__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angular2_flash_messages_module_flash_messages_component__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angular2_flash_messages_module_flash_messages_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_angular2_flash_messages_module_flash_messages_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__gendir_node_modules_angular2_flash_messages_module_flash_messages_component_ngfactory__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_core_src_linker_view_container__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__gendir_node_modules_angular_router_src_directives_router_outlet_ngfactory__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__app_services_auth_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_router_src_router__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angular2_flash_messages_module_flash_messages_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angular2_flash_messages_module_flash_messages_service___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_angular2_flash_messages_module_flash_messages_service__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_router_src_router_outlet_map__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__angular_core_src_linker_component_factory_resolver__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_router_src_directives_router_outlet__ = __webpack_require__(131);
/* unused harmony export Wrapper_AppComponent */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponentNgFactory; });
/* unused harmony export View_AppComponent0 */
/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
/* tslint:disable */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};




















var Wrapper_AppComponent = (function () {
    function Wrapper_AppComponent() {
        this._changed = false;
        this.context = new __WEBPACK_IMPORTED_MODULE_0__app_app_component__["a" /* AppComponent */]();
    }
    Wrapper_AppComponent.prototype.ngOnDetach = function (view, componentView, el) {
    };
    Wrapper_AppComponent.prototype.ngOnDestroy = function () {
    };
    Wrapper_AppComponent.prototype.ngDoCheck = function (view, el, throwOnChange) {
        var changed = this._changed;
        this._changed = false;
        return changed;
    };
    Wrapper_AppComponent.prototype.checkHost = function (view, componentView, el, throwOnChange) {
    };
    Wrapper_AppComponent.prototype.handleEvent = function (eventName, $event) {
        var result = true;
        return result;
    };
    Wrapper_AppComponent.prototype.subscribe = function (view, _eventHandler) {
        this._eventHandler = _eventHandler;
    };
    return Wrapper_AppComponent;
}());
var renderType_AppComponent_Host = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderComponentType"]('', 0, __WEBPACK_IMPORTED_MODULE_3__angular_core_src_metadata_view__["b" /* ViewEncapsulation */].None, [], {});
var View_AppComponent_Host0 = (function (_super) {
    __extends(View_AppComponent_Host0, _super);
    function View_AppComponent_Host0(viewUtils, parentView, parentIndex, parentElement) {
        _super.call(this, View_AppComponent_Host0, renderType_AppComponent_Host, __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__["a" /* ViewType */].HOST, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways);
    }
    View_AppComponent_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["selectOrCreateRenderHostElement"](this.renderer, 'app-root', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], rootSelector, null);
        this.compView_0 = new View_AppComponent0(this.viewUtils, this, 0, this._el_0);
        this._AppComponent_0_3 = new Wrapper_AppComponent();
        this.compView_0.create(this._AppComponent_0_3.context);
        this.init(this._el_0, (this.renderer.directRenderer ? null : [this._el_0]), null);
        return new __WEBPACK_IMPORTED_MODULE_6__angular_core_src_linker_component_factory__["a" /* ComponentRef_ */](0, this, this._el_0, this._AppComponent_0_3.context);
    };
    View_AppComponent_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === __WEBPACK_IMPORTED_MODULE_0__app_app_component__["a" /* AppComponent */]) && (0 === requestNodeIndex))) {
            return this._AppComponent_0_3.context;
        }
        return notFoundResult;
    };
    View_AppComponent_Host0.prototype.detectChangesInternal = function (throwOnChange) {
        this._AppComponent_0_3.ngDoCheck(this, this._el_0, throwOnChange);
        this.compView_0.internalDetectChanges(throwOnChange);
    };
    View_AppComponent_Host0.prototype.destroyInternal = function () {
        this.compView_0.destroy();
    };
    View_AppComponent_Host0.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    return View_AppComponent_Host0;
}(__WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__["a" /* AppView */]));
var AppComponentNgFactory = new __WEBPACK_IMPORTED_MODULE_6__angular_core_src_linker_component_factory__["b" /* ComponentFactory */]('app-root', View_AppComponent_Host0, __WEBPACK_IMPORTED_MODULE_0__app_app_component__["a" /* AppComponent */]);
var styles_AppComponent = [__WEBPACK_IMPORTED_MODULE_7__app_component_css_shim_ngstyle__["a" /* styles */]];
var renderType_AppComponent = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderComponentType"]('', 0, __WEBPACK_IMPORTED_MODULE_3__angular_core_src_metadata_view__["b" /* ViewEncapsulation */].Emulated, styles_AppComponent, {});
var View_AppComponent0 = (function (_super) {
    __extends(View_AppComponent0, _super);
    function View_AppComponent0(viewUtils, parentView, parentIndex, parentElement) {
        _super.call(this, View_AppComponent0, renderType_AppComponent, __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__["a" /* ViewType */].COMPONENT, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways);
    }
    View_AppComponent0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.parentElement);
        this._el_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, parentRenderNode, 'app-navbar', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], null);
        this.compView_0 = new __WEBPACK_IMPORTED_MODULE_9__components_navbar_navbar_component_ngfactory__["a" /* View_NavbarComponent0 */](this.viewUtils, this, 0, this._el_0);
        this._NavbarComponent_0_3 = new __WEBPACK_IMPORTED_MODULE_9__components_navbar_navbar_component_ngfactory__["b" /* Wrapper_NavbarComponent */](this.parentView.injectorGet(__WEBPACK_IMPORTED_MODULE_14__app_services_auth_service__["a" /* AuthService */], this.parentIndex), this.parentView.injectorGet(__WEBPACK_IMPORTED_MODULE_15__angular_router_src_router__["a" /* Router */], this.parentIndex), this.parentView.injectorGet(__WEBPACK_IMPORTED_MODULE_16_angular2_flash_messages_module_flash_messages_service__["FlashMessagesService"], this.parentIndex));
        this.compView_0.create(this._NavbarComponent_0_3.context);
        this._text_1 = this.renderer.createText(parentRenderNode, '\n', null);
        this._el_2 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, parentRenderNode, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'container'), null);
        this._text_3 = this.renderer.createText(this._el_2, '\n  ', null);
        this._el_4 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_2, 'flash-messages', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], null);
        this.compView_4 = new __WEBPACK_IMPORTED_MODULE_11__gendir_node_modules_angular2_flash_messages_module_flash_messages_component_ngfactory__["a" /* View_FlashMessagesComponent0 */](this.viewUtils, this, 4, this._el_4);
        this._FlashMessagesComponent_4_3 = new __WEBPACK_IMPORTED_MODULE_11__gendir_node_modules_angular2_flash_messages_module_flash_messages_component_ngfactory__["b" /* Wrapper_FlashMessagesComponent */](this.parentView.injectorGet(__WEBPACK_IMPORTED_MODULE_16_angular2_flash_messages_module_flash_messages_service__["FlashMessagesService"], this.parentIndex), this.compView_4.ref);
        this.compView_4.create(this._FlashMessagesComponent_4_3.context);
        this._text_5 = this.renderer.createText(this._el_2, '\n  ', null);
        this._el_6 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_2, 'router-outlet', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], null);
        this._vc_6 = new __WEBPACK_IMPORTED_MODULE_12__angular_core_src_linker_view_container__["a" /* ViewContainer */](6, 2, this, this._el_6);
        this._RouterOutlet_6_5 = new __WEBPACK_IMPORTED_MODULE_13__gendir_node_modules_angular_router_src_directives_router_outlet_ngfactory__["a" /* Wrapper_RouterOutlet */](this.parentView.injectorGet(__WEBPACK_IMPORTED_MODULE_17__angular_router_src_router_outlet_map__["a" /* RouterOutletMap */], this.parentIndex), this._vc_6.vcRef, this.parentView.injectorGet(__WEBPACK_IMPORTED_MODULE_18__angular_core_src_linker_component_factory_resolver__["a" /* ComponentFactoryResolver */], this.parentIndex), null);
        this._text_7 = this.renderer.createText(this._el_2, '\n', null);
        this._text_8 = this.renderer.createText(parentRenderNode, '\n', null);
        this.init(null, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._el_4,
            this._text_5,
            this._el_6,
            this._text_7,
            this._text_8
        ]), null);
        return null;
    };
    View_AppComponent0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === __WEBPACK_IMPORTED_MODULE_8__app_components_navbar_navbar_component__["a" /* NavbarComponent */]) && (0 === requestNodeIndex))) {
            return this._NavbarComponent_0_3.context;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_10_angular2_flash_messages_module_flash_messages_component__["FlashMessagesComponent"]) && (4 === requestNodeIndex))) {
            return this._FlashMessagesComponent_4_3.context;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_19__angular_router_src_directives_router_outlet__["a" /* RouterOutlet */]) && (6 === requestNodeIndex))) {
            return this._RouterOutlet_6_5.context;
        }
        return notFoundResult;
    };
    View_AppComponent0.prototype.detectChangesInternal = function (throwOnChange) {
        this._NavbarComponent_0_3.ngDoCheck(this, this._el_0, throwOnChange);
        this._FlashMessagesComponent_4_3.ngDoCheck(this, this._el_4, throwOnChange);
        this._RouterOutlet_6_5.ngDoCheck(this, this._el_6, throwOnChange);
        this._vc_6.detectChangesInNestedViews(throwOnChange);
        this.compView_0.internalDetectChanges(throwOnChange);
        this.compView_4.internalDetectChanges(throwOnChange);
    };
    View_AppComponent0.prototype.destroyInternal = function () {
        this._vc_6.destroyNestedViews();
        this.compView_0.destroy();
        this.compView_4.destroy();
        this._RouterOutlet_6_5.ngOnDestroy();
    };
    return View_AppComponent0;
}(__WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__["a" /* AppView */]));
//# sourceMappingURL=/Users/Collier/Documents/Projects/analytics/angular-src/src/app.component.ngfactory.js.map

/***/ }),

/***/ 397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core_src_linker_ng_module_factory__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_module__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_src_common_module__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core_src_application_module__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_src_browser__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms_src_directives__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms_src_form_providers__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http_src_http_module__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_module__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angular2_flash_messages_module_module__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angular2_flash_messages_module_module___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_angular2_flash_messages_module_module__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_common_src_localization__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_core_src_application_init__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_core_src_testability_testability__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_core_src_application_ref__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_core_src_linker_compiler__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_platform_browser_src_dom_events_hammer_gestures__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_platform_browser_src_dom_events_event_manager__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_platform_browser_src_dom_shared_styles_host__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__angular_platform_browser_src_dom_dom_renderer__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_platform_browser_src_security_dom_sanitization_service__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__angular_core_src_animation_animation_queue__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__angular_core_src_linker_view_utils__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__angular_platform_browser_src_browser_title__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__angular_forms_src_directives_radio_control_value_accessor__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__angular_http_src_backends_browser_xhr__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__angular_http_src_base_response_options__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__angular_http_src_backends_xhr_backend__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__angular_http_src_base_request_options__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_angular2_flash_messages_module_flash_messages_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_angular2_flash_messages_module_flash_messages_service___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_28_angular2_flash_messages_module_flash_messages_service__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__angular_common_src_location_location__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__angular_router_src_url_tree__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__angular_router_src_router_outlet_map__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__angular_core_src_linker_system_js_ng_module_factory_loader__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__angular_router_src_router_preloader__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__app_services_validate_service__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__app_services_auth_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__app_guards_auth_guard__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__components_home_home_component_ngfactory__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__components_about_about_component_ngfactory__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__components_enterkey_enterkey_component_ngfactory__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__components_barchart_barchart_component_ngfactory__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__app_component_ngfactory__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__angular_core_src_i18n_tokens__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__angular_core_src_application_tokens__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__angular_platform_browser_src_dom_events_dom_events__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__angular_platform_browser_src_dom_events_key_events__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__angular_core_src_zone_ng_zone__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__angular_platform_browser_src_dom_debug_ng_probe__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__angular_common_src_location_platform_location__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__angular_common_src_location_location_strategy__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__app_components_home_home_component__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__app_components_about_about_component__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__app_components_enterkey_enterkey_component__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__app_components_barchart_barchart_component__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__angular_router_src_url_handling_strategy__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__angular_router_src_route_reuse_strategy__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__angular_router_src_router__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__angular_core_src_console__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__angular_core_src_error_handler__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__angular_platform_browser_src_dom_dom_tokens__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__angular_platform_browser_src_dom_animation_driver__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__angular_core_src_render_api__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__angular_core_src_security__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__angular_core_src_change_detection_differs_iterable_differs__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__angular_core_src_change_detection_differs_keyvalue_differs__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__angular_http_src_interfaces__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66__angular_http_src_http__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__angular_core_src_linker_ng_module_factory_loader__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68__angular_router_src_router_config_loader__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69__angular_router_src_router_state__ = __webpack_require__(32);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModuleNgFactory; });
/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
/* tslint:disable */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};






































































var AppModuleInjector = (function (_super) {
    __extends(AppModuleInjector, _super);
    function AppModuleInjector(parent) {
        _super.call(this, parent, [
            __WEBPACK_IMPORTED_MODULE_37__components_home_home_component_ngfactory__["a" /* HomeComponentNgFactory */],
            __WEBPACK_IMPORTED_MODULE_38__components_about_about_component_ngfactory__["a" /* AboutComponentNgFactory */],
            __WEBPACK_IMPORTED_MODULE_39__components_enterkey_enterkey_component_ngfactory__["a" /* EnterkeyComponentNgFactory */],
            __WEBPACK_IMPORTED_MODULE_40__components_barchart_barchart_component_ngfactory__["a" /* BarchartComponentNgFactory */],
            __WEBPACK_IMPORTED_MODULE_41__app_component_ngfactory__["a" /* AppComponentNgFactory */]
        ], [__WEBPACK_IMPORTED_MODULE_41__app_component_ngfactory__["a" /* AppComponentNgFactory */]]);
    }
    Object.defineProperty(AppModuleInjector.prototype, "_LOCALE_ID_10", {
        get: function () {
            if ((this.__LOCALE_ID_10 == null)) {
                (this.__LOCALE_ID_10 = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_application_module__["a" /* _localeFactory */](this.parent.get(__WEBPACK_IMPORTED_MODULE_42__angular_core_src_i18n_tokens__["a" /* LOCALE_ID */], null)));
            }
            return this.__LOCALE_ID_10;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_NgLocalization_11", {
        get: function () {
            if ((this.__NgLocalization_11 == null)) {
                (this.__NgLocalization_11 = new __WEBPACK_IMPORTED_MODULE_10__angular_common_src_localization__["a" /* NgLocaleLocalization */](this._LOCALE_ID_10));
            }
            return this.__NgLocalization_11;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ApplicationRef_18", {
        get: function () {
            if ((this.__ApplicationRef_18 == null)) {
                (this.__ApplicationRef_18 = this._ApplicationRef__17);
            }
            return this.__ApplicationRef_18;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Compiler_19", {
        get: function () {
            if ((this.__Compiler_19 == null)) {
                (this.__Compiler_19 = new __WEBPACK_IMPORTED_MODULE_14__angular_core_src_linker_compiler__["a" /* Compiler */]());
            }
            return this.__Compiler_19;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_APP_ID_20", {
        get: function () {
            if ((this.__APP_ID_20 == null)) {
                (this.__APP_ID_20 = __WEBPACK_IMPORTED_MODULE_43__angular_core_src_application_tokens__["a" /* _appIdRandomProviderFactory */]());
            }
            return this.__APP_ID_20;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_DOCUMENT_21", {
        get: function () {
            if ((this.__DOCUMENT_21 == null)) {
                (this.__DOCUMENT_21 = __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_src_browser__["a" /* _document */]());
            }
            return this.__DOCUMENT_21;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_HAMMER_GESTURE_CONFIG_22", {
        get: function () {
            if ((this.__HAMMER_GESTURE_CONFIG_22 == null)) {
                (this.__HAMMER_GESTURE_CONFIG_22 = new __WEBPACK_IMPORTED_MODULE_15__angular_platform_browser_src_dom_events_hammer_gestures__["a" /* HammerGestureConfig */]());
            }
            return this.__HAMMER_GESTURE_CONFIG_22;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_EVENT_MANAGER_PLUGINS_23", {
        get: function () {
            if ((this.__EVENT_MANAGER_PLUGINS_23 == null)) {
                (this.__EVENT_MANAGER_PLUGINS_23 = [
                    new __WEBPACK_IMPORTED_MODULE_44__angular_platform_browser_src_dom_events_dom_events__["a" /* DomEventsPlugin */](),
                    new __WEBPACK_IMPORTED_MODULE_45__angular_platform_browser_src_dom_events_key_events__["a" /* KeyEventsPlugin */](),
                    new __WEBPACK_IMPORTED_MODULE_15__angular_platform_browser_src_dom_events_hammer_gestures__["b" /* HammerGesturesPlugin */](this._HAMMER_GESTURE_CONFIG_22)
                ]);
            }
            return this.__EVENT_MANAGER_PLUGINS_23;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_EventManager_24", {
        get: function () {
            if ((this.__EventManager_24 == null)) {
                (this.__EventManager_24 = new __WEBPACK_IMPORTED_MODULE_16__angular_platform_browser_src_dom_events_event_manager__["a" /* EventManager */](this._EVENT_MANAGER_PLUGINS_23, this.parent.get(__WEBPACK_IMPORTED_MODULE_46__angular_core_src_zone_ng_zone__["a" /* NgZone */])));
            }
            return this.__EventManager_24;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_AnimationDriver_26", {
        get: function () {
            if ((this.__AnimationDriver_26 == null)) {
                (this.__AnimationDriver_26 = __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_src_browser__["b" /* _resolveDefaultAnimationDriver */]());
            }
            return this.__AnimationDriver_26;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_DomRootRenderer_27", {
        get: function () {
            if ((this.__DomRootRenderer_27 == null)) {
                (this.__DomRootRenderer_27 = new __WEBPACK_IMPORTED_MODULE_18__angular_platform_browser_src_dom_dom_renderer__["a" /* DomRootRenderer_ */](this._DOCUMENT_21, this._EventManager_24, this._DomSharedStylesHost_25, this._AnimationDriver_26, this._APP_ID_20));
            }
            return this.__DomRootRenderer_27;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_NgProbeToken_28", {
        get: function () {
            if ((this.__NgProbeToken_28 == null)) {
                (this.__NgProbeToken_28 = [__WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_module__["a" /* routerNgProbeToken */]()]);
            }
            return this.__NgProbeToken_28;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_RootRenderer_29", {
        get: function () {
            if ((this.__RootRenderer_29 == null)) {
                (this.__RootRenderer_29 = __WEBPACK_IMPORTED_MODULE_47__angular_platform_browser_src_dom_debug_ng_probe__["a" /* _createConditionalRootRenderer */](this._DomRootRenderer_27, this.parent.get(__WEBPACK_IMPORTED_MODULE_47__angular_platform_browser_src_dom_debug_ng_probe__["b" /* NgProbeToken */], null), this._NgProbeToken_28));
            }
            return this.__RootRenderer_29;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_DomSanitizer_30", {
        get: function () {
            if ((this.__DomSanitizer_30 == null)) {
                (this.__DomSanitizer_30 = new __WEBPACK_IMPORTED_MODULE_19__angular_platform_browser_src_security_dom_sanitization_service__["a" /* DomSanitizerImpl */]());
            }
            return this.__DomSanitizer_30;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Sanitizer_31", {
        get: function () {
            if ((this.__Sanitizer_31 == null)) {
                (this.__Sanitizer_31 = this._DomSanitizer_30);
            }
            return this.__Sanitizer_31;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_AnimationQueue_32", {
        get: function () {
            if ((this.__AnimationQueue_32 == null)) {
                (this.__AnimationQueue_32 = new __WEBPACK_IMPORTED_MODULE_20__angular_core_src_animation_animation_queue__["a" /* AnimationQueue */](this.parent.get(__WEBPACK_IMPORTED_MODULE_46__angular_core_src_zone_ng_zone__["a" /* NgZone */])));
            }
            return this.__AnimationQueue_32;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ViewUtils_33", {
        get: function () {
            if ((this.__ViewUtils_33 == null)) {
                (this.__ViewUtils_33 = new __WEBPACK_IMPORTED_MODULE_21__angular_core_src_linker_view_utils__["ViewUtils"](this._RootRenderer_29, this._Sanitizer_31, this._AnimationQueue_32));
            }
            return this.__ViewUtils_33;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_IterableDiffers_34", {
        get: function () {
            if ((this.__IterableDiffers_34 == null)) {
                (this.__IterableDiffers_34 = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_application_module__["b" /* _iterableDiffersFactory */]());
            }
            return this.__IterableDiffers_34;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_KeyValueDiffers_35", {
        get: function () {
            if ((this.__KeyValueDiffers_35 == null)) {
                (this.__KeyValueDiffers_35 = __WEBPACK_IMPORTED_MODULE_3__angular_core_src_application_module__["c" /* _keyValueDiffersFactory */]());
            }
            return this.__KeyValueDiffers_35;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_SharedStylesHost_36", {
        get: function () {
            if ((this.__SharedStylesHost_36 == null)) {
                (this.__SharedStylesHost_36 = this._DomSharedStylesHost_25);
            }
            return this.__SharedStylesHost_36;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Title_37", {
        get: function () {
            if ((this.__Title_37 == null)) {
                (this.__Title_37 = new __WEBPACK_IMPORTED_MODULE_22__angular_platform_browser_src_browser_title__["a" /* Title */]());
            }
            return this.__Title_37;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_RadioControlRegistry_38", {
        get: function () {
            if ((this.__RadioControlRegistry_38 == null)) {
                (this.__RadioControlRegistry_38 = new __WEBPACK_IMPORTED_MODULE_23__angular_forms_src_directives_radio_control_value_accessor__["a" /* RadioControlRegistry */]());
            }
            return this.__RadioControlRegistry_38;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_BrowserXhr_39", {
        get: function () {
            if ((this.__BrowserXhr_39 == null)) {
                (this.__BrowserXhr_39 = new __WEBPACK_IMPORTED_MODULE_24__angular_http_src_backends_browser_xhr__["a" /* BrowserXhr */]());
            }
            return this.__BrowserXhr_39;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ResponseOptions_40", {
        get: function () {
            if ((this.__ResponseOptions_40 == null)) {
                (this.__ResponseOptions_40 = new __WEBPACK_IMPORTED_MODULE_25__angular_http_src_base_response_options__["a" /* BaseResponseOptions */]());
            }
            return this.__ResponseOptions_40;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_XSRFStrategy_41", {
        get: function () {
            if ((this.__XSRFStrategy_41 == null)) {
                (this.__XSRFStrategy_41 = __WEBPACK_IMPORTED_MODULE_7__angular_http_src_http_module__["a" /* _createDefaultCookieXSRFStrategy */]());
            }
            return this.__XSRFStrategy_41;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_XHRBackend_42", {
        get: function () {
            if ((this.__XHRBackend_42 == null)) {
                (this.__XHRBackend_42 = new __WEBPACK_IMPORTED_MODULE_26__angular_http_src_backends_xhr_backend__["a" /* XHRBackend */](this._BrowserXhr_39, this._ResponseOptions_40, this._XSRFStrategy_41));
            }
            return this.__XHRBackend_42;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_RequestOptions_43", {
        get: function () {
            if ((this.__RequestOptions_43 == null)) {
                (this.__RequestOptions_43 = new __WEBPACK_IMPORTED_MODULE_27__angular_http_src_base_request_options__["a" /* BaseRequestOptions */]());
            }
            return this.__RequestOptions_43;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Http_44", {
        get: function () {
            if ((this.__Http_44 == null)) {
                (this.__Http_44 = __WEBPACK_IMPORTED_MODULE_7__angular_http_src_http_module__["b" /* httpFactory */](this._XHRBackend_42, this._RequestOptions_43));
            }
            return this.__Http_44;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_FlashMessagesService_45", {
        get: function () {
            if ((this.__FlashMessagesService_45 == null)) {
                (this.__FlashMessagesService_45 = new __WEBPACK_IMPORTED_MODULE_28_angular2_flash_messages_module_flash_messages_service__["FlashMessagesService"]());
            }
            return this.__FlashMessagesService_45;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ROUTER_CONFIGURATION_46", {
        get: function () {
            if ((this.__ROUTER_CONFIGURATION_46 == null)) {
                (this.__ROUTER_CONFIGURATION_46 = {});
            }
            return this.__ROUTER_CONFIGURATION_46;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_LocationStrategy_47", {
        get: function () {
            if ((this.__LocationStrategy_47 == null)) {
                (this.__LocationStrategy_47 = __WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_module__["b" /* provideLocationStrategy */](this.parent.get(__WEBPACK_IMPORTED_MODULE_48__angular_common_src_location_platform_location__["a" /* PlatformLocation */]), this.parent.get(__WEBPACK_IMPORTED_MODULE_49__angular_common_src_location_location_strategy__["a" /* APP_BASE_HREF */], null), this._ROUTER_CONFIGURATION_46));
            }
            return this.__LocationStrategy_47;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Location_48", {
        get: function () {
            if ((this.__Location_48 == null)) {
                (this.__Location_48 = new __WEBPACK_IMPORTED_MODULE_29__angular_common_src_location_location__["a" /* Location */](this._LocationStrategy_47));
            }
            return this.__Location_48;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_UrlSerializer_49", {
        get: function () {
            if ((this.__UrlSerializer_49 == null)) {
                (this.__UrlSerializer_49 = new __WEBPACK_IMPORTED_MODULE_30__angular_router_src_url_tree__["a" /* DefaultUrlSerializer */]());
            }
            return this.__UrlSerializer_49;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_RouterOutletMap_50", {
        get: function () {
            if ((this.__RouterOutletMap_50 == null)) {
                (this.__RouterOutletMap_50 = new __WEBPACK_IMPORTED_MODULE_31__angular_router_src_router_outlet_map__["a" /* RouterOutletMap */]());
            }
            return this.__RouterOutletMap_50;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_NgModuleFactoryLoader_51", {
        get: function () {
            if ((this.__NgModuleFactoryLoader_51 == null)) {
                (this.__NgModuleFactoryLoader_51 = new __WEBPACK_IMPORTED_MODULE_32__angular_core_src_linker_system_js_ng_module_factory_loader__["a" /* SystemJsNgModuleLoader */](this._Compiler_19, this.parent.get(__WEBPACK_IMPORTED_MODULE_32__angular_core_src_linker_system_js_ng_module_factory_loader__["b" /* SystemJsNgModuleLoaderConfig */], null)));
            }
            return this.__NgModuleFactoryLoader_51;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ROUTES_52", {
        get: function () {
            if ((this.__ROUTES_52 == null)) {
                (this.__ROUTES_52 = [[
                        {
                            path: '',
                            component: __WEBPACK_IMPORTED_MODULE_50__app_components_home_home_component__["a" /* HomeComponent */]
                        },
                        {
                            path: 'about',
                            component: __WEBPACK_IMPORTED_MODULE_51__app_components_about_about_component__["a" /* AboutComponent */]
                        },
                        {
                            path: 'enterkey',
                            component: __WEBPACK_IMPORTED_MODULE_52__app_components_enterkey_enterkey_component__["a" /* EnterkeyComponent */]
                        },
                        {
                            path: 'barchart',
                            component: __WEBPACK_IMPORTED_MODULE_53__app_components_barchart_barchart_component__["a" /* BarchartComponent */]
                        }
                    ]
                ]);
            }
            return this.__ROUTES_52;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Router_53", {
        get: function () {
            if ((this.__Router_53 == null)) {
                (this.__Router_53 = __WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_module__["c" /* setupRouter */](this._ApplicationRef_18, this._UrlSerializer_49, this._RouterOutletMap_50, this._Location_48, this, this._NgModuleFactoryLoader_51, this._Compiler_19, this._ROUTES_52, this._ROUTER_CONFIGURATION_46, this.parent.get(__WEBPACK_IMPORTED_MODULE_54__angular_router_src_url_handling_strategy__["a" /* UrlHandlingStrategy */], null), this.parent.get(__WEBPACK_IMPORTED_MODULE_55__angular_router_src_route_reuse_strategy__["a" /* RouteReuseStrategy */], null)));
            }
            return this.__Router_53;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ActivatedRoute_54", {
        get: function () {
            if ((this.__ActivatedRoute_54 == null)) {
                (this.__ActivatedRoute_54 = __WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_module__["d" /* rootRoute */](this._Router_53));
            }
            return this.__ActivatedRoute_54;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_PreloadAllModules_58", {
        get: function () {
            if ((this.__PreloadAllModules_58 == null)) {
                (this.__PreloadAllModules_58 = new __WEBPACK_IMPORTED_MODULE_33__angular_router_src_router_preloader__["a" /* PreloadAllModules */]());
            }
            return this.__PreloadAllModules_58;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ROUTER_INITIALIZER_59", {
        get: function () {
            if ((this.__ROUTER_INITIALIZER_59 == null)) {
                (this.__ROUTER_INITIALIZER_59 = __WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_module__["e" /* getBootstrapListener */](this._RouterInitializer_13));
            }
            return this.__ROUTER_INITIALIZER_59;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_APP_BOOTSTRAP_LISTENER_60", {
        get: function () {
            if ((this.__APP_BOOTSTRAP_LISTENER_60 == null)) {
                (this.__APP_BOOTSTRAP_LISTENER_60 = [this._ROUTER_INITIALIZER_59]);
            }
            return this.__APP_BOOTSTRAP_LISTENER_60;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ValidateService_61", {
        get: function () {
            if ((this.__ValidateService_61 == null)) {
                (this.__ValidateService_61 = new __WEBPACK_IMPORTED_MODULE_34__app_services_validate_service__["a" /* ValidateService */]());
            }
            return this.__ValidateService_61;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_AuthService_62", {
        get: function () {
            if ((this.__AuthService_62 == null)) {
                (this.__AuthService_62 = new __WEBPACK_IMPORTED_MODULE_35__app_services_auth_service__["a" /* AuthService */](this._Http_44));
            }
            return this.__AuthService_62;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_AuthGuard_63", {
        get: function () {
            if ((this.__AuthGuard_63 == null)) {
                (this.__AuthGuard_63 = new __WEBPACK_IMPORTED_MODULE_36__app_guards_auth_guard__["a" /* AuthGuard */](this._AuthService_62, this._Router_53));
            }
            return this.__AuthGuard_63;
        },
        enumerable: true,
        configurable: true
    });
    AppModuleInjector.prototype.createInternal = function () {
        this._CommonModule_0 = new __WEBPACK_IMPORTED_MODULE_2__angular_common_src_common_module__["a" /* CommonModule */]();
        this._ApplicationModule_1 = new __WEBPACK_IMPORTED_MODULE_3__angular_core_src_application_module__["d" /* ApplicationModule */]();
        this._BrowserModule_2 = new __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_src_browser__["c" /* BrowserModule */](this.parent.get(__WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_src_browser__["c" /* BrowserModule */], null));
        this._InternalFormsSharedModule_3 = new __WEBPACK_IMPORTED_MODULE_5__angular_forms_src_directives__["a" /* InternalFormsSharedModule */]();
        this._FormsModule_4 = new __WEBPACK_IMPORTED_MODULE_6__angular_forms_src_form_providers__["a" /* FormsModule */]();
        this._HttpModule_5 = new __WEBPACK_IMPORTED_MODULE_7__angular_http_src_http_module__["c" /* HttpModule */]();
        this._ROUTER_FORROOT_GUARD_6 = __WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_module__["f" /* provideForRootGuard */](this.parent.get(__WEBPACK_IMPORTED_MODULE_56__angular_router_src_router__["a" /* Router */], null));
        this._RouterModule_7 = new __WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_module__["g" /* RouterModule */](this._ROUTER_FORROOT_GUARD_6);
        this._FlashMessagesModule_8 = new __WEBPACK_IMPORTED_MODULE_9_angular2_flash_messages_module_module__["FlashMessagesModule"]();
        this._AppModule_9 = new __WEBPACK_IMPORTED_MODULE_1__app_app_module__["a" /* AppModule */]();
        this._ErrorHandler_12 = __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_src_browser__["d" /* errorHandler */]();
        this._RouterInitializer_13 = new __WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_module__["h" /* RouterInitializer */](this);
        this._APP_INITIALIZER_14 = [__WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_module__["i" /* getAppInitializer */](this._RouterInitializer_13)];
        this._ApplicationInitStatus_15 = new __WEBPACK_IMPORTED_MODULE_11__angular_core_src_application_init__["a" /* ApplicationInitStatus */](this._APP_INITIALIZER_14);
        this._Testability_16 = new __WEBPACK_IMPORTED_MODULE_12__angular_core_src_testability_testability__["a" /* Testability */](this.parent.get(__WEBPACK_IMPORTED_MODULE_46__angular_core_src_zone_ng_zone__["a" /* NgZone */]));
        this._ApplicationRef__17 = new __WEBPACK_IMPORTED_MODULE_13__angular_core_src_application_ref__["a" /* ApplicationRef_ */](this.parent.get(__WEBPACK_IMPORTED_MODULE_46__angular_core_src_zone_ng_zone__["a" /* NgZone */]), this.parent.get(__WEBPACK_IMPORTED_MODULE_57__angular_core_src_console__["a" /* Console */]), this, this._ErrorHandler_12, this, this._ApplicationInitStatus_15, this.parent.get(__WEBPACK_IMPORTED_MODULE_12__angular_core_src_testability_testability__["b" /* TestabilityRegistry */], null), this._Testability_16);
        this._DomSharedStylesHost_25 = new __WEBPACK_IMPORTED_MODULE_17__angular_platform_browser_src_dom_shared_styles_host__["a" /* DomSharedStylesHost */](this._DOCUMENT_21);
        this._NoPreloading_55 = new __WEBPACK_IMPORTED_MODULE_33__angular_router_src_router_preloader__["b" /* NoPreloading */]();
        this._PreloadingStrategy_56 = this._NoPreloading_55;
        this._RouterPreloader_57 = new __WEBPACK_IMPORTED_MODULE_33__angular_router_src_router_preloader__["c" /* RouterPreloader */](this._Router_53, this._NgModuleFactoryLoader_51, this._Compiler_19, this, this._PreloadingStrategy_56);
        return this._AppModule_9;
    };
    AppModuleInjector.prototype.getInternal = function (token, notFoundResult) {
        if ((token === __WEBPACK_IMPORTED_MODULE_2__angular_common_src_common_module__["a" /* CommonModule */])) {
            return this._CommonModule_0;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_3__angular_core_src_application_module__["d" /* ApplicationModule */])) {
            return this._ApplicationModule_1;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_src_browser__["c" /* BrowserModule */])) {
            return this._BrowserModule_2;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_5__angular_forms_src_directives__["a" /* InternalFormsSharedModule */])) {
            return this._InternalFormsSharedModule_3;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_6__angular_forms_src_form_providers__["a" /* FormsModule */])) {
            return this._FormsModule_4;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_7__angular_http_src_http_module__["c" /* HttpModule */])) {
            return this._HttpModule_5;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_module__["j" /* ROUTER_FORROOT_GUARD */])) {
            return this._ROUTER_FORROOT_GUARD_6;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_module__["g" /* RouterModule */])) {
            return this._RouterModule_7;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_9_angular2_flash_messages_module_module__["FlashMessagesModule"])) {
            return this._FlashMessagesModule_8;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_1__app_app_module__["a" /* AppModule */])) {
            return this._AppModule_9;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_42__angular_core_src_i18n_tokens__["a" /* LOCALE_ID */])) {
            return this._LOCALE_ID_10;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_10__angular_common_src_localization__["b" /* NgLocalization */])) {
            return this._NgLocalization_11;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_58__angular_core_src_error_handler__["a" /* ErrorHandler */])) {
            return this._ErrorHandler_12;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_module__["h" /* RouterInitializer */])) {
            return this._RouterInitializer_13;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_11__angular_core_src_application_init__["b" /* APP_INITIALIZER */])) {
            return this._APP_INITIALIZER_14;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_11__angular_core_src_application_init__["a" /* ApplicationInitStatus */])) {
            return this._ApplicationInitStatus_15;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_12__angular_core_src_testability_testability__["a" /* Testability */])) {
            return this._Testability_16;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_13__angular_core_src_application_ref__["a" /* ApplicationRef_ */])) {
            return this._ApplicationRef__17;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_13__angular_core_src_application_ref__["b" /* ApplicationRef */])) {
            return this._ApplicationRef_18;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_14__angular_core_src_linker_compiler__["a" /* Compiler */])) {
            return this._Compiler_19;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_43__angular_core_src_application_tokens__["b" /* APP_ID */])) {
            return this._APP_ID_20;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_59__angular_platform_browser_src_dom_dom_tokens__["a" /* DOCUMENT */])) {
            return this._DOCUMENT_21;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_15__angular_platform_browser_src_dom_events_hammer_gestures__["c" /* HAMMER_GESTURE_CONFIG */])) {
            return this._HAMMER_GESTURE_CONFIG_22;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_16__angular_platform_browser_src_dom_events_event_manager__["b" /* EVENT_MANAGER_PLUGINS */])) {
            return this._EVENT_MANAGER_PLUGINS_23;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_16__angular_platform_browser_src_dom_events_event_manager__["a" /* EventManager */])) {
            return this._EventManager_24;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_17__angular_platform_browser_src_dom_shared_styles_host__["a" /* DomSharedStylesHost */])) {
            return this._DomSharedStylesHost_25;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_60__angular_platform_browser_src_dom_animation_driver__["a" /* AnimationDriver */])) {
            return this._AnimationDriver_26;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_18__angular_platform_browser_src_dom_dom_renderer__["b" /* DomRootRenderer */])) {
            return this._DomRootRenderer_27;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_13__angular_core_src_application_ref__["c" /* NgProbeToken */])) {
            return this._NgProbeToken_28;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_61__angular_core_src_render_api__["a" /* RootRenderer */])) {
            return this._RootRenderer_29;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_19__angular_platform_browser_src_security_dom_sanitization_service__["b" /* DomSanitizer */])) {
            return this._DomSanitizer_30;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_62__angular_core_src_security__["a" /* Sanitizer */])) {
            return this._Sanitizer_31;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_20__angular_core_src_animation_animation_queue__["a" /* AnimationQueue */])) {
            return this._AnimationQueue_32;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_21__angular_core_src_linker_view_utils__["ViewUtils"])) {
            return this._ViewUtils_33;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_63__angular_core_src_change_detection_differs_iterable_differs__["a" /* IterableDiffers */])) {
            return this._IterableDiffers_34;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_64__angular_core_src_change_detection_differs_keyvalue_differs__["a" /* KeyValueDiffers */])) {
            return this._KeyValueDiffers_35;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_17__angular_platform_browser_src_dom_shared_styles_host__["b" /* SharedStylesHost */])) {
            return this._SharedStylesHost_36;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_22__angular_platform_browser_src_browser_title__["a" /* Title */])) {
            return this._Title_37;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_23__angular_forms_src_directives_radio_control_value_accessor__["a" /* RadioControlRegistry */])) {
            return this._RadioControlRegistry_38;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_24__angular_http_src_backends_browser_xhr__["a" /* BrowserXhr */])) {
            return this._BrowserXhr_39;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_25__angular_http_src_base_response_options__["b" /* ResponseOptions */])) {
            return this._ResponseOptions_40;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_65__angular_http_src_interfaces__["a" /* XSRFStrategy */])) {
            return this._XSRFStrategy_41;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_26__angular_http_src_backends_xhr_backend__["a" /* XHRBackend */])) {
            return this._XHRBackend_42;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_27__angular_http_src_base_request_options__["b" /* RequestOptions */])) {
            return this._RequestOptions_43;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_66__angular_http_src_http__["a" /* Http */])) {
            return this._Http_44;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_28_angular2_flash_messages_module_flash_messages_service__["FlashMessagesService"])) {
            return this._FlashMessagesService_45;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_module__["k" /* ROUTER_CONFIGURATION */])) {
            return this._ROUTER_CONFIGURATION_46;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_49__angular_common_src_location_location_strategy__["b" /* LocationStrategy */])) {
            return this._LocationStrategy_47;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_29__angular_common_src_location_location__["a" /* Location */])) {
            return this._Location_48;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_30__angular_router_src_url_tree__["b" /* UrlSerializer */])) {
            return this._UrlSerializer_49;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_31__angular_router_src_router_outlet_map__["a" /* RouterOutletMap */])) {
            return this._RouterOutletMap_50;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_67__angular_core_src_linker_ng_module_factory_loader__["a" /* NgModuleFactoryLoader */])) {
            return this._NgModuleFactoryLoader_51;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_68__angular_router_src_router_config_loader__["a" /* ROUTES */])) {
            return this._ROUTES_52;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_56__angular_router_src_router__["a" /* Router */])) {
            return this._Router_53;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_69__angular_router_src_router_state__["a" /* ActivatedRoute */])) {
            return this._ActivatedRoute_54;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_33__angular_router_src_router_preloader__["b" /* NoPreloading */])) {
            return this._NoPreloading_55;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_33__angular_router_src_router_preloader__["d" /* PreloadingStrategy */])) {
            return this._PreloadingStrategy_56;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_33__angular_router_src_router_preloader__["c" /* RouterPreloader */])) {
            return this._RouterPreloader_57;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_33__angular_router_src_router_preloader__["a" /* PreloadAllModules */])) {
            return this._PreloadAllModules_58;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_module__["l" /* ROUTER_INITIALIZER */])) {
            return this._ROUTER_INITIALIZER_59;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_43__angular_core_src_application_tokens__["c" /* APP_BOOTSTRAP_LISTENER */])) {
            return this._APP_BOOTSTRAP_LISTENER_60;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_34__app_services_validate_service__["a" /* ValidateService */])) {
            return this._ValidateService_61;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_35__app_services_auth_service__["a" /* AuthService */])) {
            return this._AuthService_62;
        }
        if ((token === __WEBPACK_IMPORTED_MODULE_36__app_guards_auth_guard__["a" /* AuthGuard */])) {
            return this._AuthGuard_63;
        }
        return notFoundResult;
    };
    AppModuleInjector.prototype.destroyInternal = function () {
        this._ApplicationRef__17.ngOnDestroy();
        this._DomSharedStylesHost_25.ngOnDestroy();
        this._RouterPreloader_57.ngOnDestroy();
    };
    return AppModuleInjector;
}(__WEBPACK_IMPORTED_MODULE_0__angular_core_src_linker_ng_module_factory__["a" /* NgModuleInjector */]));
var AppModuleNgFactory = new __WEBPACK_IMPORTED_MODULE_0__angular_core_src_linker_ng_module_factory__["b" /* NgModuleFactory */](AppModuleInjector, __WEBPACK_IMPORTED_MODULE_1__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/Users/Collier/Documents/Projects/analytics/angular-src/src/app.module.ngfactory.js.map

/***/ }),

/***/ 398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
/* tslint:disable */
var styles = [''];
//# sourceMappingURL=/Users/Collier/Documents/Projects/analytics/angular-src/src/about.component.css.shim.ngstyle.js.map

/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_components_about_about_component__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core_src_metadata_view__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core_src_linker_component_factory__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__about_component_css_shim_ngstyle__ = __webpack_require__(398);
/* unused harmony export Wrapper_AboutComponent */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutComponentNgFactory; });
/* unused harmony export View_AboutComponent0 */
/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
/* tslint:disable */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};








var Wrapper_AboutComponent = (function () {
    function Wrapper_AboutComponent() {
        this._changed = false;
        this.context = new __WEBPACK_IMPORTED_MODULE_0__app_components_about_about_component__["a" /* AboutComponent */]();
    }
    Wrapper_AboutComponent.prototype.ngOnDetach = function (view, componentView, el) {
    };
    Wrapper_AboutComponent.prototype.ngOnDestroy = function () {
    };
    Wrapper_AboutComponent.prototype.ngDoCheck = function (view, el, throwOnChange) {
        var changed = this._changed;
        this._changed = false;
        if (!throwOnChange) {
            if ((view.numberOfChecks === 0)) {
                this.context.ngOnInit();
            }
        }
        return changed;
    };
    Wrapper_AboutComponent.prototype.checkHost = function (view, componentView, el, throwOnChange) {
    };
    Wrapper_AboutComponent.prototype.handleEvent = function (eventName, $event) {
        var result = true;
        return result;
    };
    Wrapper_AboutComponent.prototype.subscribe = function (view, _eventHandler) {
        this._eventHandler = _eventHandler;
    };
    return Wrapper_AboutComponent;
}());
var renderType_AboutComponent_Host = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderComponentType"]('', 0, __WEBPACK_IMPORTED_MODULE_3__angular_core_src_metadata_view__["b" /* ViewEncapsulation */].None, [], {});
var View_AboutComponent_Host0 = (function (_super) {
    __extends(View_AboutComponent_Host0, _super);
    function View_AboutComponent_Host0(viewUtils, parentView, parentIndex, parentElement) {
        _super.call(this, View_AboutComponent_Host0, renderType_AboutComponent_Host, __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__["a" /* ViewType */].HOST, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways);
    }
    View_AboutComponent_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["selectOrCreateRenderHostElement"](this.renderer, 'app-about', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], rootSelector, null);
        this.compView_0 = new View_AboutComponent0(this.viewUtils, this, 0, this._el_0);
        this._AboutComponent_0_3 = new Wrapper_AboutComponent();
        this.compView_0.create(this._AboutComponent_0_3.context);
        this.init(this._el_0, (this.renderer.directRenderer ? null : [this._el_0]), null);
        return new __WEBPACK_IMPORTED_MODULE_6__angular_core_src_linker_component_factory__["a" /* ComponentRef_ */](0, this, this._el_0, this._AboutComponent_0_3.context);
    };
    View_AboutComponent_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === __WEBPACK_IMPORTED_MODULE_0__app_components_about_about_component__["a" /* AboutComponent */]) && (0 === requestNodeIndex))) {
            return this._AboutComponent_0_3.context;
        }
        return notFoundResult;
    };
    View_AboutComponent_Host0.prototype.detectChangesInternal = function (throwOnChange) {
        this._AboutComponent_0_3.ngDoCheck(this, this._el_0, throwOnChange);
        this.compView_0.internalDetectChanges(throwOnChange);
    };
    View_AboutComponent_Host0.prototype.destroyInternal = function () {
        this.compView_0.destroy();
    };
    View_AboutComponent_Host0.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    return View_AboutComponent_Host0;
}(__WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__["a" /* AppView */]));
var AboutComponentNgFactory = new __WEBPACK_IMPORTED_MODULE_6__angular_core_src_linker_component_factory__["b" /* ComponentFactory */]('app-about', View_AboutComponent_Host0, __WEBPACK_IMPORTED_MODULE_0__app_components_about_about_component__["a" /* AboutComponent */]);
var styles_AboutComponent = [__WEBPACK_IMPORTED_MODULE_7__about_component_css_shim_ngstyle__["a" /* styles */]];
var renderType_AboutComponent = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderComponentType"]('', 0, __WEBPACK_IMPORTED_MODULE_3__angular_core_src_metadata_view__["b" /* ViewEncapsulation */].Emulated, styles_AboutComponent, {});
var View_AboutComponent0 = (function (_super) {
    __extends(View_AboutComponent0, _super);
    function View_AboutComponent0(viewUtils, parentView, parentIndex, parentElement) {
        _super.call(this, View_AboutComponent0, renderType_AboutComponent, __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__["a" /* ViewType */].COMPONENT, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways);
    }
    View_AboutComponent0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.parentElement);
        this._el_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, parentRenderNode, 'p', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], null);
        this._text_1 = this.renderer.createText(this._el_0, '\n  about works!\n', null);
        this._text_2 = this.renderer.createText(parentRenderNode, '\n', null);
        this.init(null, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1,
            this._text_2
        ]), null);
        return null;
    };
    return View_AboutComponent0;
}(__WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__["a" /* AppView */]));
//# sourceMappingURL=/Users/Collier/Documents/Projects/analytics/angular-src/src/about.component.ngfactory.js.map

/***/ }),

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
/* tslint:disable */
var styles = ['.flex-container {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  \n}\n\n.flex-container1 {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.flex-item1 {\n  padding: 2px;\n  margin: 2px;\n  color: white;\n  font-weight: bold;\n  font-size: 3em;\n  text-align: center;\n  line-height: 30px;\n}\n\n.flex-item2 {\n  padding: 5px;\n  margin: 10px;\n  color: white;\n  font-weight: bold;\n  font-size: 3em;\n  text-align: left;\n}\n\n.row {\n    width: auto;\n    border: 1px solid blue;\n}\n\n.flex-item {\n  padding: 5px;\n  margin: 10px;\n  line-height: 50px;\n  color: white;\n  font-weight: bold;\n  font-size: 3em;\n  text-align: center;\n  border: 1px solid green;\n}\n\n.d3-chart {\n  width: 600px;\n  height: 0px;\n}\n\n.d3-chart .axis path,\n.d3-chart .axis line {\n  stroke: #999;\n}\n\n.d3-chart .axis text {\n  fill: #999;\n}\n\n.grey-font {\n  color: #868685;\n}\n\n.blue-font {\n  color: #3BB9FF;\n}\n\ndiv.bar {\n    display: inline-block;\n    width: 20px;\n    height: 75px;   \n    background-color: teal;\n    margin-right: 2px;\n}'];
//# sourceMappingURL=/Users/Collier/Documents/Projects/analytics/angular-src/src/barchart.component.css.ngstyle.js.map

/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_components_barchart_barchart_component__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core_src_metadata_view__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core_src_linker_component_factory__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_router_src_router__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_state__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_services_auth_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__barchart_component_css_ngstyle__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_core_src_linker_view_container__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_core_src_change_detection_change_detection_util__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__gendir_node_modules_angular_common_src_directives_ng_for_ngfactory__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_core_src_linker_template_ref__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_core_src_change_detection_differs_iterable_differs__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_common_src_directives_ng_for__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__gendir_node_modules_angular_common_src_directives_ng_if_ngfactory__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__angular_common_src_directives_ng_if__ = __webpack_require__(101);
/* unused harmony export Wrapper_BarchartComponent */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BarchartComponentNgFactory; });
/* unused harmony export View_BarchartComponent0 */
/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
/* tslint:disable */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};



















var Wrapper_BarchartComponent = (function () {
    function Wrapper_BarchartComponent(p0, p1, p2) {
        this._changed = false;
        this.context = new __WEBPACK_IMPORTED_MODULE_0__app_components_barchart_barchart_component__["a" /* BarchartComponent */](p0, p1, p2);
    }
    Wrapper_BarchartComponent.prototype.ngOnDetach = function (view, componentView, el) {
    };
    Wrapper_BarchartComponent.prototype.ngOnDestroy = function () {
    };
    Wrapper_BarchartComponent.prototype.ngDoCheck = function (view, el, throwOnChange) {
        var changed = this._changed;
        this._changed = false;
        if (!throwOnChange) {
            if ((view.numberOfChecks === 0)) {
                this.context.ngOnInit();
            }
        }
        return changed;
    };
    Wrapper_BarchartComponent.prototype.checkHost = function (view, componentView, el, throwOnChange) {
    };
    Wrapper_BarchartComponent.prototype.handleEvent = function (eventName, $event) {
        var result = true;
        return result;
    };
    Wrapper_BarchartComponent.prototype.subscribe = function (view, _eventHandler) {
        this._eventHandler = _eventHandler;
    };
    return Wrapper_BarchartComponent;
}());
var renderType_BarchartComponent_Host = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderComponentType"]('', 0, __WEBPACK_IMPORTED_MODULE_3__angular_core_src_metadata_view__["b" /* ViewEncapsulation */].None, [], {});
var View_BarchartComponent_Host0 = (function (_super) {
    __extends(View_BarchartComponent_Host0, _super);
    function View_BarchartComponent_Host0(viewUtils, parentView, parentIndex, parentElement) {
        _super.call(this, View_BarchartComponent_Host0, renderType_BarchartComponent_Host, __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__["a" /* ViewType */].HOST, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways);
    }
    View_BarchartComponent_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["selectOrCreateRenderHostElement"](this.renderer, 'app-barchart', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], rootSelector, null);
        this.compView_0 = new View_BarchartComponent0(this.viewUtils, this, 0, this._el_0);
        this._BarchartComponent_0_3 = new Wrapper_BarchartComponent(this.injectorGet(__WEBPACK_IMPORTED_MODULE_7__angular_router_src_router__["a" /* Router */], this.parentIndex), this.injectorGet(__WEBPACK_IMPORTED_MODULE_8__angular_router_src_router_state__["a" /* ActivatedRoute */], this.parentIndex), this.injectorGet(__WEBPACK_IMPORTED_MODULE_9__app_services_auth_service__["a" /* AuthService */], this.parentIndex));
        this.compView_0.create(this._BarchartComponent_0_3.context);
        this.init(this._el_0, (this.renderer.directRenderer ? null : [this._el_0]), null);
        return new __WEBPACK_IMPORTED_MODULE_6__angular_core_src_linker_component_factory__["a" /* ComponentRef_ */](0, this, this._el_0, this._BarchartComponent_0_3.context);
    };
    View_BarchartComponent_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === __WEBPACK_IMPORTED_MODULE_0__app_components_barchart_barchart_component__["a" /* BarchartComponent */]) && (0 === requestNodeIndex))) {
            return this._BarchartComponent_0_3.context;
        }
        return notFoundResult;
    };
    View_BarchartComponent_Host0.prototype.detectChangesInternal = function (throwOnChange) {
        this._BarchartComponent_0_3.ngDoCheck(this, this._el_0, throwOnChange);
        this.compView_0.internalDetectChanges(throwOnChange);
    };
    View_BarchartComponent_Host0.prototype.destroyInternal = function () {
        this.compView_0.destroy();
    };
    View_BarchartComponent_Host0.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    return View_BarchartComponent_Host0;
}(__WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__["a" /* AppView */]));
var BarchartComponentNgFactory = new __WEBPACK_IMPORTED_MODULE_6__angular_core_src_linker_component_factory__["b" /* ComponentFactory */]('app-barchart', View_BarchartComponent_Host0, __WEBPACK_IMPORTED_MODULE_0__app_components_barchart_barchart_component__["a" /* BarchartComponent */]);
var styles_BarchartComponent = [__WEBPACK_IMPORTED_MODULE_10__barchart_component_css_ngstyle__["a" /* styles */]];
var View_BarchartComponent1 = (function (_super) {
    __extends(View_BarchartComponent1, _super);
    function View_BarchartComponent1(viewUtils, parentView, parentIndex, parentElement, declaredViewContainer) {
        _super.call(this, View_BarchartComponent1, renderType_BarchartComponent, __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__["a" /* ViewType */].EMBEDDED, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways, declaredViewContainer);
        this._expr_5 = __WEBPACK_IMPORTED_MODULE_12__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
    }
    View_BarchartComponent1.prototype.createInternal = function (rootSelector) {
        this._el_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, null, 'div', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], null);
        this._text_1 = this.renderer.createText(this._el_0, '\n      ', null);
        this._el_2 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_0, 'button', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'btn btn-primary btn-lg'), null);
        this._text_3 = this.renderer.createText(this._el_2, '', null);
        this._text_4 = this.renderer.createText(this._el_0, '\n    ', null);
        var disposable_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["subscribeToRenderElement"](this, this._el_2, new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'click', null), this.eventHandler(this.handleEvent_2));
        this.init(this._el_0, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._text_4
        ]), [disposable_0]);
        return null;
    };
    View_BarchartComponent1.prototype.detectChangesInternal = function (throwOnChange) {
        var currVal_5 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["inlineInterpolate"](1, ' ', this.parentView.context.inputAll['views'][0]['name'], ' ');
        if (__WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_5, currVal_5)) {
            this.renderer.setText(this._text_3, currVal_5);
            this._expr_5 = currVal_5;
        }
    };
    View_BarchartComponent1.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    View_BarchartComponent1.prototype.handleEvent_2 = function (eventName, $event) {
        this.markPathToRootAsCheckOnce();
        var result = true;
        if ((eventName == 'click')) {
            var pd_sub_0 = (this.parentView.context.onButtonOneClick() !== false);
            result = (pd_sub_0 && result);
        }
        return result;
    };
    return View_BarchartComponent1;
}(__WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__["a" /* AppView */]));
var View_BarchartComponent2 = (function (_super) {
    __extends(View_BarchartComponent2, _super);
    function View_BarchartComponent2(viewUtils, parentView, parentIndex, parentElement, declaredViewContainer) {
        _super.call(this, View_BarchartComponent2, renderType_BarchartComponent, __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__["a" /* ViewType */].EMBEDDED, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways, declaredViewContainer);
        this._expr_5 = __WEBPACK_IMPORTED_MODULE_12__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
    }
    View_BarchartComponent2.prototype.createInternal = function (rootSelector) {
        this._el_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, null, 'div', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], null);
        this._text_1 = this.renderer.createText(this._el_0, '\n      ', null);
        this._el_2 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_0, 'button', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'btn btn-primary btn-lg'), null);
        this._text_3 = this.renderer.createText(this._el_2, '', null);
        this._text_4 = this.renderer.createText(this._el_0, '\n    ', null);
        var disposable_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["subscribeToRenderElement"](this, this._el_2, new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'click', null), this.eventHandler(this.handleEvent_2));
        this.init(this._el_0, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._text_4
        ]), [disposable_0]);
        return null;
    };
    View_BarchartComponent2.prototype.detectChangesInternal = function (throwOnChange) {
        var currVal_5 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["inlineInterpolate"](1, ' ', this.parentView.context.inputAll['views'][1]['name'], ' ');
        if (__WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_5, currVal_5)) {
            this.renderer.setText(this._text_3, currVal_5);
            this._expr_5 = currVal_5;
        }
    };
    View_BarchartComponent2.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    View_BarchartComponent2.prototype.handleEvent_2 = function (eventName, $event) {
        this.markPathToRootAsCheckOnce();
        var result = true;
        if ((eventName == 'click')) {
            var pd_sub_0 = (this.parentView.context.onButtonTwoClick() !== false);
            result = (pd_sub_0 && result);
        }
        return result;
    };
    return View_BarchartComponent2;
}(__WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__["a" /* AppView */]));
var View_BarchartComponent3 = (function (_super) {
    __extends(View_BarchartComponent3, _super);
    function View_BarchartComponent3(viewUtils, parentView, parentIndex, parentElement, declaredViewContainer) {
        _super.call(this, View_BarchartComponent3, renderType_BarchartComponent, __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__["a" /* ViewType */].EMBEDDED, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways, declaredViewContainer);
        this._expr_5 = __WEBPACK_IMPORTED_MODULE_12__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
    }
    View_BarchartComponent3.prototype.createInternal = function (rootSelector) {
        this._el_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, null, 'div', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], null);
        this._text_1 = this.renderer.createText(this._el_0, '\n      ', null);
        this._el_2 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_0, 'button', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'btn btn-primary btn-lg'), null);
        this._text_3 = this.renderer.createText(this._el_2, '', null);
        this._text_4 = this.renderer.createText(this._el_0, '\n    ', null);
        var disposable_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["subscribeToRenderElement"](this, this._el_2, new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'click', null), this.eventHandler(this.handleEvent_2));
        this.init(this._el_0, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._text_4
        ]), [disposable_0]);
        return null;
    };
    View_BarchartComponent3.prototype.detectChangesInternal = function (throwOnChange) {
        var currVal_5 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["inlineInterpolate"](1, ' ', this.parentView.context.inputAll['views'][2]['name'], ' ');
        if (__WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_5, currVal_5)) {
            this.renderer.setText(this._text_3, currVal_5);
            this._expr_5 = currVal_5;
        }
    };
    View_BarchartComponent3.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    View_BarchartComponent3.prototype.handleEvent_2 = function (eventName, $event) {
        this.markPathToRootAsCheckOnce();
        var result = true;
        if ((eventName == 'click')) {
            var pd_sub_0 = (this.parentView.context.onButtonThreeClick() !== false);
            result = (pd_sub_0 && result);
        }
        return result;
    };
    return View_BarchartComponent3;
}(__WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__["a" /* AppView */]));
var View_BarchartComponent4 = (function (_super) {
    __extends(View_BarchartComponent4, _super);
    function View_BarchartComponent4(viewUtils, parentView, parentIndex, parentElement, declaredViewContainer) {
        _super.call(this, View_BarchartComponent4, renderType_BarchartComponent, __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__["a" /* ViewType */].EMBEDDED, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways, declaredViewContainer);
        this._expr_5 = __WEBPACK_IMPORTED_MODULE_12__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
    }
    View_BarchartComponent4.prototype.createInternal = function (rootSelector) {
        this._el_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, null, 'div', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], null);
        this._text_1 = this.renderer.createText(this._el_0, '\n      ', null);
        this._el_2 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_0, 'button', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'btn btn-primary btn-lg'), null);
        this._text_3 = this.renderer.createText(this._el_2, '', null);
        this._text_4 = this.renderer.createText(this._el_0, '\n    ', null);
        var disposable_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["subscribeToRenderElement"](this, this._el_2, new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'click', null), this.eventHandler(this.handleEvent_2));
        this.init(this._el_0, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._text_4
        ]), [disposable_0]);
        return null;
    };
    View_BarchartComponent4.prototype.detectChangesInternal = function (throwOnChange) {
        var currVal_5 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["inlineInterpolate"](1, ' ', this.parentView.context.inputAll['views'][3]['name'], ' ');
        if (__WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_5, currVal_5)) {
            this.renderer.setText(this._text_3, currVal_5);
            this._expr_5 = currVal_5;
        }
    };
    View_BarchartComponent4.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    View_BarchartComponent4.prototype.handleEvent_2 = function (eventName, $event) {
        this.markPathToRootAsCheckOnce();
        var result = true;
        if ((eventName == 'click')) {
            var pd_sub_0 = (this.parentView.context.onButtonFourClick() !== false);
            result = (pd_sub_0 && result);
        }
        return result;
    };
    return View_BarchartComponent4;
}(__WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__["a" /* AppView */]));
var View_BarchartComponent5 = (function (_super) {
    __extends(View_BarchartComponent5, _super);
    function View_BarchartComponent5(viewUtils, parentView, parentIndex, parentElement, declaredViewContainer) {
        _super.call(this, View_BarchartComponent5, renderType_BarchartComponent, __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__["a" /* ViewType */].EMBEDDED, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways, declaredViewContainer);
        this._expr_5 = __WEBPACK_IMPORTED_MODULE_12__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
    }
    View_BarchartComponent5.prototype.createInternal = function (rootSelector) {
        this._el_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, null, 'div', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], null);
        this._text_1 = this.renderer.createText(this._el_0, '\n      ', null);
        this._el_2 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_0, 'button', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'btn btn-primary btn-lg'), null);
        this._text_3 = this.renderer.createText(this._el_2, '', null);
        this._text_4 = this.renderer.createText(this._el_0, '\n    ', null);
        var disposable_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["subscribeToRenderElement"](this, this._el_2, new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'click', null), this.eventHandler(this.handleEvent_2));
        this.init(this._el_0, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._text_4
        ]), [disposable_0]);
        return null;
    };
    View_BarchartComponent5.prototype.detectChangesInternal = function (throwOnChange) {
        var currVal_5 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["inlineInterpolate"](1, ' ', this.parentView.context.inputAll['views'][4]['name'], ' ');
        if (__WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_5, currVal_5)) {
            this.renderer.setText(this._text_3, currVal_5);
            this._expr_5 = currVal_5;
        }
    };
    View_BarchartComponent5.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    View_BarchartComponent5.prototype.handleEvent_2 = function (eventName, $event) {
        this.markPathToRootAsCheckOnce();
        var result = true;
        if ((eventName == 'click')) {
            var pd_sub_0 = (this.parentView.context.onButtonFiveClick() !== false);
            result = (pd_sub_0 && result);
        }
        return result;
    };
    return View_BarchartComponent5;
}(__WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__["a" /* AppView */]));
var View_BarchartComponent7 = (function (_super) {
    __extends(View_BarchartComponent7, _super);
    function View_BarchartComponent7(viewUtils, parentView, parentIndex, parentElement, declaredViewContainer) {
        _super.call(this, View_BarchartComponent7, renderType_BarchartComponent, __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__["a" /* ViewType */].EMBEDDED, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways, declaredViewContainer);
        this._expr_8 = __WEBPACK_IMPORTED_MODULE_12__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
        this._expr_9 = __WEBPACK_IMPORTED_MODULE_12__angular_core_src_change_detection_change_detection_util__["b" /* UNINITIALIZED */];
    }
    View_BarchartComponent7.prototype.createInternal = function (rootSelector) {
        this._el_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, null, 'div', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], null);
        this._text_1 = this.renderer.createText(this._el_0, '\n        ', null);
        this._el_2 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_0, 'h6', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], null);
        this._text_3 = this.renderer.createText(this._el_2, '', null);
        this._el_4 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_2, 'span', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'blue-font'), null);
        this._text_5 = this.renderer.createText(this._el_4, '', null);
        this._text_6 = this.renderer.createText(this._el_2, ' ', null);
        this._text_7 = this.renderer.createText(this._el_0, '\n      ', null);
        this.init(this._el_0, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._el_4,
            this._text_5,
            this._text_6,
            this._text_7
        ]), null);
        return null;
    };
    View_BarchartComponent7.prototype.detectChangesInternal = function (throwOnChange) {
        var currVal_8 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["inlineInterpolate"](1, '', this.context.$implicit.url, ' ');
        if (__WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_8, currVal_8)) {
            this.renderer.setText(this._text_3, currVal_8);
            this._expr_8 = currVal_8;
        }
        var currVal_9 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["inlineInterpolate"](1, ' (', this.context.$implicit.views, ' Pageviews) ');
        if (__WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["checkBinding"](throwOnChange, this._expr_9, currVal_9)) {
            this.renderer.setText(this._text_5, currVal_9);
            this._expr_9 = currVal_9;
        }
    };
    View_BarchartComponent7.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    return View_BarchartComponent7;
}(__WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__["a" /* AppView */]));
var View_BarchartComponent6 = (function (_super) {
    __extends(View_BarchartComponent6, _super);
    function View_BarchartComponent6(viewUtils, parentView, parentIndex, parentElement, declaredViewContainer) {
        _super.call(this, View_BarchartComponent6, renderType_BarchartComponent, __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__["a" /* ViewType */].EMBEDDED, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways, declaredViewContainer);
    }
    View_BarchartComponent6.prototype.createInternal = function (rootSelector) {
        this._el_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, null, 'div', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], null);
        this._text_1 = this.renderer.createText(this._el_0, '\n\n  ', null);
        this._el_2 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_0, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'flex-container1'), null);
        this._text_3 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_4 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_2, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray4"](4, 'class', 'flex-item1', 'id', 'barchart1'), null);
        this._text_5 = this.renderer.createText(this._el_4, '\n    ', null);
        this._text_6 = this.renderer.createText(this._el_2, '\n  ', null);
        this._text_7 = this.renderer.createText(this._el_0, '\n\n  ', null);
        this._el_8 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_0, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'flex-container1'), null);
        this._text_9 = this.renderer.createText(this._el_8, '\n    ', null);
        this._el_10 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_8, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'flex-item1'), null);
        this._text_11 = this.renderer.createText(this._el_10, '\n      ', null);
        this._el_12 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_10, 'h6', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'grey-font'), null);
        this._text_13 = this.renderer.createText(this._el_12, 'Total pageviews this month and 5 previous months (thousands)', null);
        this._text_14 = this.renderer.createText(this._el_10, '\n    ', null);
        this._text_15 = this.renderer.createText(this._el_8, '\n  ', null);
        this._text_16 = this.renderer.createText(this._el_0, '\n\n  ', null);
        this._el_17 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_0, 'hr', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], null);
        this._text_18 = this.renderer.createText(this._el_0, '\n\n  ', null);
        this._el_19 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_0, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'flex-container1'), null);
        this._text_20 = this.renderer.createText(this._el_19, '\n    ', null);
        this._el_21 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_19, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'flex-item1'), null);
        this._text_22 = this.renderer.createText(this._el_21, '\n      ', null);
        this._el_23 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_21, 'h3', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], null);
        this._text_24 = this.renderer.createText(this._el_23, 'Top Pages This Month', null);
        this._text_25 = this.renderer.createText(this._el_21, '\n    ', null);
        this._text_26 = this.renderer.createText(this._el_19, '\n  ', null);
        this._text_27 = this.renderer.createText(this._el_0, '\n\n  \n\n  ', null);
        this._el_28 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_0, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'flex-container1'), null);
        this._text_29 = this.renderer.createText(this._el_28, '\n    ', null);
        this._el_30 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_28, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'flex-item2'), null);
        this._text_31 = this.renderer.createText(this._el_30, '\n      ', null);
        this._anchor_32 = this.renderer.createTemplateAnchor(this._el_30, null);
        this._vc_32 = new __WEBPACK_IMPORTED_MODULE_11__angular_core_src_linker_view_container__["a" /* ViewContainer */](32, 30, this, this._anchor_32);
        this._TemplateRef_32_5 = new __WEBPACK_IMPORTED_MODULE_14__angular_core_src_linker_template_ref__["a" /* TemplateRef_ */](this, 32, this._anchor_32);
        this._NgFor_32_6 = new __WEBPACK_IMPORTED_MODULE_13__gendir_node_modules_angular_common_src_directives_ng_for_ngfactory__["a" /* Wrapper_NgFor */](this._vc_32.vcRef, this._TemplateRef_32_5, this.parentView.injectorGet(__WEBPACK_IMPORTED_MODULE_15__angular_core_src_change_detection_differs_iterable_differs__["a" /* IterableDiffers */], this.parentIndex), this.parentView.ref);
        this._text_33 = this.renderer.createText(this._el_30, '\n    ', null);
        this._text_34 = this.renderer.createText(this._el_28, '\n  ', null);
        this._text_35 = this.renderer.createText(this._el_0, '\n\n', null);
        this.init(this._el_0, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._el_4,
            this._text_5,
            this._text_6,
            this._text_7,
            this._el_8,
            this._text_9,
            this._el_10,
            this._text_11,
            this._el_12,
            this._text_13,
            this._text_14,
            this._text_15,
            this._text_16,
            this._el_17,
            this._text_18,
            this._el_19,
            this._text_20,
            this._el_21,
            this._text_22,
            this._el_23,
            this._text_24,
            this._text_25,
            this._text_26,
            this._text_27,
            this._el_28,
            this._text_29,
            this._el_30,
            this._text_31,
            this._anchor_32,
            this._text_33,
            this._text_34,
            this._text_35
        ]), null);
        return null;
    };
    View_BarchartComponent6.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === __WEBPACK_IMPORTED_MODULE_14__angular_core_src_linker_template_ref__["b" /* TemplateRef */]) && (32 === requestNodeIndex))) {
            return this._TemplateRef_32_5;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_16__angular_common_src_directives_ng_for__["a" /* NgFor */]) && (32 === requestNodeIndex))) {
            return this._NgFor_32_6.context;
        }
        return notFoundResult;
    };
    View_BarchartComponent6.prototype.detectChangesInternal = function (throwOnChange) {
        var currVal_32_0_0 = this.parentView.context.topPages;
        this._NgFor_32_6.check_ngForOf(currVal_32_0_0, throwOnChange, false);
        this._NgFor_32_6.ngDoCheck(this, this._anchor_32, throwOnChange);
        this._vc_32.detectChangesInNestedViews(throwOnChange);
    };
    View_BarchartComponent6.prototype.destroyInternal = function () {
        this._vc_32.destroyNestedViews();
    };
    View_BarchartComponent6.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    View_BarchartComponent6.prototype.createEmbeddedViewInternal = function (nodeIndex) {
        if ((nodeIndex == 32)) {
            return new View_BarchartComponent7(this.viewUtils, this, 32, this._anchor_32, this._vc_32);
        }
        return null;
    };
    return View_BarchartComponent6;
}(__WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__["a" /* AppView */]));
var renderType_BarchartComponent = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderComponentType"]('', 0, __WEBPACK_IMPORTED_MODULE_3__angular_core_src_metadata_view__["b" /* ViewEncapsulation */].None, styles_BarchartComponent, {});
var View_BarchartComponent0 = (function (_super) {
    __extends(View_BarchartComponent0, _super);
    function View_BarchartComponent0(viewUtils, parentView, parentIndex, parentElement) {
        _super.call(this, View_BarchartComponent0, renderType_BarchartComponent, __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__["a" /* ViewType */].COMPONENT, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways);
    }
    View_BarchartComponent0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.parentElement);
        this._el_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, parentRenderNode, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray4"](4, 'class', 'd3-chart', 'id', 'chart1'), null);
        this._text_1 = this.renderer.createText(parentRenderNode, '\n\n', null);
        this._el_2 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, parentRenderNode, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'flex-container1'), null);
        this._text_3 = this.renderer.createText(this._el_2, '\n  ', null);
        this._el_4 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_2, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'flex-item1'), null);
        this._text_5 = this.renderer.createText(this._el_4, '\n    ', null);
        this._el_6 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_4, 'h6', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'grey-font'), null);
        this._text_7 = this.renderer.createText(this._el_6, 'Select webpage to view analytics', null);
        this._text_8 = this.renderer.createText(this._el_4, '\n  ', null);
        this._text_9 = this.renderer.createText(this._el_2, '\n', null);
        this._text_10 = this.renderer.createText(parentRenderNode, '\n\n', null);
        this._el_11 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, parentRenderNode, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'flex-container1'), null);
        this._text_12 = this.renderer.createText(this._el_11, '\n\n  ', null);
        this._el_13 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_11, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'flex-item2'), null);
        this._text_14 = this.renderer.createText(this._el_13, '\n    ', null);
        this._anchor_15 = this.renderer.createTemplateAnchor(this._el_13, null);
        this._vc_15 = new __WEBPACK_IMPORTED_MODULE_11__angular_core_src_linker_view_container__["a" /* ViewContainer */](15, 13, this, this._anchor_15);
        this._TemplateRef_15_5 = new __WEBPACK_IMPORTED_MODULE_14__angular_core_src_linker_template_ref__["a" /* TemplateRef_ */](this, 15, this._anchor_15);
        this._NgIf_15_6 = new __WEBPACK_IMPORTED_MODULE_17__gendir_node_modules_angular_common_src_directives_ng_if_ngfactory__["a" /* Wrapper_NgIf */](this._vc_15.vcRef, this._TemplateRef_15_5);
        this._text_16 = this.renderer.createText(this._el_13, '\n  ', null);
        this._text_17 = this.renderer.createText(this._el_11, '\n\n  ', null);
        this._el_18 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_11, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'flex-item2'), null);
        this._text_19 = this.renderer.createText(this._el_18, '\n    ', null);
        this._anchor_20 = this.renderer.createTemplateAnchor(this._el_18, null);
        this._vc_20 = new __WEBPACK_IMPORTED_MODULE_11__angular_core_src_linker_view_container__["a" /* ViewContainer */](20, 18, this, this._anchor_20);
        this._TemplateRef_20_5 = new __WEBPACK_IMPORTED_MODULE_14__angular_core_src_linker_template_ref__["a" /* TemplateRef_ */](this, 20, this._anchor_20);
        this._NgIf_20_6 = new __WEBPACK_IMPORTED_MODULE_17__gendir_node_modules_angular_common_src_directives_ng_if_ngfactory__["a" /* Wrapper_NgIf */](this._vc_20.vcRef, this._TemplateRef_20_5);
        this._text_21 = this.renderer.createText(this._el_18, '\n  ', null);
        this._text_22 = this.renderer.createText(this._el_11, '\n\n  ', null);
        this._el_23 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_11, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'flex-item2'), null);
        this._text_24 = this.renderer.createText(this._el_23, '\n    ', null);
        this._anchor_25 = this.renderer.createTemplateAnchor(this._el_23, null);
        this._vc_25 = new __WEBPACK_IMPORTED_MODULE_11__angular_core_src_linker_view_container__["a" /* ViewContainer */](25, 23, this, this._anchor_25);
        this._TemplateRef_25_5 = new __WEBPACK_IMPORTED_MODULE_14__angular_core_src_linker_template_ref__["a" /* TemplateRef_ */](this, 25, this._anchor_25);
        this._NgIf_25_6 = new __WEBPACK_IMPORTED_MODULE_17__gendir_node_modules_angular_common_src_directives_ng_if_ngfactory__["a" /* Wrapper_NgIf */](this._vc_25.vcRef, this._TemplateRef_25_5);
        this._text_26 = this.renderer.createText(this._el_23, '\n  ', null);
        this._text_27 = this.renderer.createText(this._el_11, '\n\n  ', null);
        this._el_28 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_11, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'flex-item2'), null);
        this._text_29 = this.renderer.createText(this._el_28, '\n    ', null);
        this._anchor_30 = this.renderer.createTemplateAnchor(this._el_28, null);
        this._vc_30 = new __WEBPACK_IMPORTED_MODULE_11__angular_core_src_linker_view_container__["a" /* ViewContainer */](30, 28, this, this._anchor_30);
        this._TemplateRef_30_5 = new __WEBPACK_IMPORTED_MODULE_14__angular_core_src_linker_template_ref__["a" /* TemplateRef_ */](this, 30, this._anchor_30);
        this._NgIf_30_6 = new __WEBPACK_IMPORTED_MODULE_17__gendir_node_modules_angular_common_src_directives_ng_if_ngfactory__["a" /* Wrapper_NgIf */](this._vc_30.vcRef, this._TemplateRef_30_5);
        this._text_31 = this.renderer.createText(this._el_28, '\n  ', null);
        this._text_32 = this.renderer.createText(this._el_11, '\n\n  ', null);
        this._el_33 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_11, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'flex-item2'), null);
        this._text_34 = this.renderer.createText(this._el_33, '\n    ', null);
        this._anchor_35 = this.renderer.createTemplateAnchor(this._el_33, null);
        this._vc_35 = new __WEBPACK_IMPORTED_MODULE_11__angular_core_src_linker_view_container__["a" /* ViewContainer */](35, 33, this, this._anchor_35);
        this._TemplateRef_35_5 = new __WEBPACK_IMPORTED_MODULE_14__angular_core_src_linker_template_ref__["a" /* TemplateRef_ */](this, 35, this._anchor_35);
        this._NgIf_35_6 = new __WEBPACK_IMPORTED_MODULE_17__gendir_node_modules_angular_common_src_directives_ng_if_ngfactory__["a" /* Wrapper_NgIf */](this._vc_35.vcRef, this._TemplateRef_35_5);
        this._text_36 = this.renderer.createText(this._el_33, '\n  ', null);
        this._text_37 = this.renderer.createText(this._el_11, '\n\n', null);
        this._text_38 = this.renderer.createText(parentRenderNode, '\n\n\n', null);
        this._anchor_39 = this.renderer.createTemplateAnchor(parentRenderNode, null);
        this._vc_39 = new __WEBPACK_IMPORTED_MODULE_11__angular_core_src_linker_view_container__["a" /* ViewContainer */](39, null, this, this._anchor_39);
        this._TemplateRef_39_5 = new __WEBPACK_IMPORTED_MODULE_14__angular_core_src_linker_template_ref__["a" /* TemplateRef_ */](this, 39, this._anchor_39);
        this._NgIf_39_6 = new __WEBPACK_IMPORTED_MODULE_17__gendir_node_modules_angular_common_src_directives_ng_if_ngfactory__["a" /* Wrapper_NgIf */](this._vc_39.vcRef, this._TemplateRef_39_5);
        this._text_40 = this.renderer.createText(parentRenderNode, '\n\n\n\n\n\n\n\n\n\n\n', null);
        this.init(null, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._el_4,
            this._text_5,
            this._el_6,
            this._text_7,
            this._text_8,
            this._text_9,
            this._text_10,
            this._el_11,
            this._text_12,
            this._el_13,
            this._text_14,
            this._anchor_15,
            this._text_16,
            this._text_17,
            this._el_18,
            this._text_19,
            this._anchor_20,
            this._text_21,
            this._text_22,
            this._el_23,
            this._text_24,
            this._anchor_25,
            this._text_26,
            this._text_27,
            this._el_28,
            this._text_29,
            this._anchor_30,
            this._text_31,
            this._text_32,
            this._el_33,
            this._text_34,
            this._anchor_35,
            this._text_36,
            this._text_37,
            this._text_38,
            this._anchor_39,
            this._text_40
        ]), null);
        return null;
    };
    View_BarchartComponent0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === __WEBPACK_IMPORTED_MODULE_14__angular_core_src_linker_template_ref__["b" /* TemplateRef */]) && (15 === requestNodeIndex))) {
            return this._TemplateRef_15_5;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_18__angular_common_src_directives_ng_if__["a" /* NgIf */]) && (15 === requestNodeIndex))) {
            return this._NgIf_15_6.context;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_14__angular_core_src_linker_template_ref__["b" /* TemplateRef */]) && (20 === requestNodeIndex))) {
            return this._TemplateRef_20_5;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_18__angular_common_src_directives_ng_if__["a" /* NgIf */]) && (20 === requestNodeIndex))) {
            return this._NgIf_20_6.context;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_14__angular_core_src_linker_template_ref__["b" /* TemplateRef */]) && (25 === requestNodeIndex))) {
            return this._TemplateRef_25_5;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_18__angular_common_src_directives_ng_if__["a" /* NgIf */]) && (25 === requestNodeIndex))) {
            return this._NgIf_25_6.context;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_14__angular_core_src_linker_template_ref__["b" /* TemplateRef */]) && (30 === requestNodeIndex))) {
            return this._TemplateRef_30_5;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_18__angular_common_src_directives_ng_if__["a" /* NgIf */]) && (30 === requestNodeIndex))) {
            return this._NgIf_30_6.context;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_14__angular_core_src_linker_template_ref__["b" /* TemplateRef */]) && (35 === requestNodeIndex))) {
            return this._TemplateRef_35_5;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_18__angular_common_src_directives_ng_if__["a" /* NgIf */]) && (35 === requestNodeIndex))) {
            return this._NgIf_35_6.context;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_14__angular_core_src_linker_template_ref__["b" /* TemplateRef */]) && (39 === requestNodeIndex))) {
            return this._TemplateRef_39_5;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_18__angular_common_src_directives_ng_if__["a" /* NgIf */]) && (39 === requestNodeIndex))) {
            return this._NgIf_39_6.context;
        }
        return notFoundResult;
    };
    View_BarchartComponent0.prototype.detectChangesInternal = function (throwOnChange) {
        var currVal_15_0_0 = this.context.inputAll['views'][0]['name'];
        this._NgIf_15_6.check_ngIf(currVal_15_0_0, throwOnChange, false);
        this._NgIf_15_6.ngDoCheck(this, this._anchor_15, throwOnChange);
        var currVal_20_0_0 = this.context.inputAll['views'][1]['name'];
        this._NgIf_20_6.check_ngIf(currVal_20_0_0, throwOnChange, false);
        this._NgIf_20_6.ngDoCheck(this, this._anchor_20, throwOnChange);
        var currVal_25_0_0 = this.context.inputAll['views'][2]['name'];
        this._NgIf_25_6.check_ngIf(currVal_25_0_0, throwOnChange, false);
        this._NgIf_25_6.ngDoCheck(this, this._anchor_25, throwOnChange);
        var currVal_30_0_0 = this.context.inputAll['views'][3]['name'];
        this._NgIf_30_6.check_ngIf(currVal_30_0_0, throwOnChange, false);
        this._NgIf_30_6.ngDoCheck(this, this._anchor_30, throwOnChange);
        var currVal_35_0_0 = this.context.inputAll['views'][4]['name'];
        this._NgIf_35_6.check_ngIf(currVal_35_0_0, throwOnChange, false);
        this._NgIf_35_6.ngDoCheck(this, this._anchor_35, throwOnChange);
        var currVal_39_0_0 = this.context.showData;
        this._NgIf_39_6.check_ngIf(currVal_39_0_0, throwOnChange, false);
        this._NgIf_39_6.ngDoCheck(this, this._anchor_39, throwOnChange);
        this._vc_15.detectChangesInNestedViews(throwOnChange);
        this._vc_20.detectChangesInNestedViews(throwOnChange);
        this._vc_25.detectChangesInNestedViews(throwOnChange);
        this._vc_30.detectChangesInNestedViews(throwOnChange);
        this._vc_35.detectChangesInNestedViews(throwOnChange);
        this._vc_39.detectChangesInNestedViews(throwOnChange);
    };
    View_BarchartComponent0.prototype.destroyInternal = function () {
        this._vc_15.destroyNestedViews();
        this._vc_20.destroyNestedViews();
        this._vc_25.destroyNestedViews();
        this._vc_30.destroyNestedViews();
        this._vc_35.destroyNestedViews();
        this._vc_39.destroyNestedViews();
    };
    View_BarchartComponent0.prototype.createEmbeddedViewInternal = function (nodeIndex) {
        if ((nodeIndex == 15)) {
            return new View_BarchartComponent1(this.viewUtils, this, 15, this._anchor_15, this._vc_15);
        }
        if ((nodeIndex == 20)) {
            return new View_BarchartComponent2(this.viewUtils, this, 20, this._anchor_20, this._vc_20);
        }
        if ((nodeIndex == 25)) {
            return new View_BarchartComponent3(this.viewUtils, this, 25, this._anchor_25, this._vc_25);
        }
        if ((nodeIndex == 30)) {
            return new View_BarchartComponent4(this.viewUtils, this, 30, this._anchor_30, this._vc_30);
        }
        if ((nodeIndex == 35)) {
            return new View_BarchartComponent5(this.viewUtils, this, 35, this._anchor_35, this._vc_35);
        }
        if ((nodeIndex == 39)) {
            return new View_BarchartComponent6(this.viewUtils, this, 39, this._anchor_39, this._vc_39);
        }
        return null;
    };
    return View_BarchartComponent0;
}(__WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__["a" /* AppView */]));
//# sourceMappingURL=/Users/Collier/Documents/Projects/analytics/angular-src/src/barchart.component.ngfactory.js.map

/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
/* tslint:disable */
var styles = ['.margin-bottom[_ngcontent-%COMP%] {\n	margin-bottom:15px;\n}\n\n.blackfont[_ngcontent-%COMP%] {\n  color: black;\n}\n\n.font-red[_ngcontent-%COMP%] {\n	color:red;\n}\n\n.font-lightgrey[_ngcontent-%COMP%] {\n	color:lightgrey;\n}\n\n.font-grey[_ngcontent-%COMP%] {\n	color:grey;\n}\n\n.background-grey[_ngcontent-%COMP%] {\n	background-color:grey;\n}\n\n.margin-left[_ngcontent-%COMP%] {\n	margin-left:15px;\n}\n\n.icon-nolink[_ngcontent-%COMP%] {\n  \n  color: black;\n\n  :link {\n      color: black;\n  }\n\n  :visited {\n      color: black;\n  }\n\n  :hover {\n      color: black;\n  }\n\n  :active {\n      color: black;\n  }\n\n}'];
//# sourceMappingURL=/Users/Collier/Documents/Projects/analytics/angular-src/src/enterkey.component.css.shim.ngstyle.js.map

/***/ }),

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_components_enterkey_enterkey_component__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core_src_metadata_view__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core_src_linker_component_factory__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_services_validate_service__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angular2_flash_messages_module_flash_messages_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angular2_flash_messages_module_flash_messages_service___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_angular2_flash_messages_module_flash_messages_service__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_services_auth_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_router_src_router__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_router_src_router_state__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__enterkey_component_css_shim_ngstyle__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__gendir_node_modules_angular_forms_src_directives_ng_form_ngfactory__ = __webpack_require__(411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__gendir_node_modules_angular_forms_src_directives_ng_control_status_ngfactory__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__gendir_node_modules_angular_forms_src_directives_default_value_accessor_ngfactory__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__gendir_node_modules_angular_forms_src_directives_ng_model_ngfactory__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_core_src_linker_element_ref__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__angular_forms_src_directives_default_value_accessor__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_forms_src_directives_control_value_accessor__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__angular_forms_src_directives_ng_model__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__angular_forms_src_directives_ng_control__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__angular_forms_src_directives_ng_control_status__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__angular_forms_src_directives_ng_form__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__angular_forms_src_directives_control_container__ = __webpack_require__(36);
/* unused harmony export Wrapper_EnterkeyComponent */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnterkeyComponentNgFactory; });
/* unused harmony export View_EnterkeyComponent0 */
/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
/* tslint:disable */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

























var Wrapper_EnterkeyComponent = (function () {
    function Wrapper_EnterkeyComponent(p0, p1, p2, p3, p4) {
        this._changed = false;
        this.context = new __WEBPACK_IMPORTED_MODULE_0__app_components_enterkey_enterkey_component__["a" /* EnterkeyComponent */](p0, p1, p2, p3, p4);
    }
    Wrapper_EnterkeyComponent.prototype.ngOnDetach = function (view, componentView, el) {
    };
    Wrapper_EnterkeyComponent.prototype.ngOnDestroy = function () {
    };
    Wrapper_EnterkeyComponent.prototype.ngDoCheck = function (view, el, throwOnChange) {
        var changed = this._changed;
        this._changed = false;
        if (!throwOnChange) {
            if ((view.numberOfChecks === 0)) {
                this.context.ngOnInit();
            }
        }
        return changed;
    };
    Wrapper_EnterkeyComponent.prototype.checkHost = function (view, componentView, el, throwOnChange) {
    };
    Wrapper_EnterkeyComponent.prototype.handleEvent = function (eventName, $event) {
        var result = true;
        return result;
    };
    Wrapper_EnterkeyComponent.prototype.subscribe = function (view, _eventHandler) {
        this._eventHandler = _eventHandler;
    };
    return Wrapper_EnterkeyComponent;
}());
var renderType_EnterkeyComponent_Host = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderComponentType"]('', 0, __WEBPACK_IMPORTED_MODULE_3__angular_core_src_metadata_view__["b" /* ViewEncapsulation */].None, [], {});
var View_EnterkeyComponent_Host0 = (function (_super) {
    __extends(View_EnterkeyComponent_Host0, _super);
    function View_EnterkeyComponent_Host0(viewUtils, parentView, parentIndex, parentElement) {
        _super.call(this, View_EnterkeyComponent_Host0, renderType_EnterkeyComponent_Host, __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__["a" /* ViewType */].HOST, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways);
    }
    View_EnterkeyComponent_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["selectOrCreateRenderHostElement"](this.renderer, 'app-enterkey', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], rootSelector, null);
        this.compView_0 = new View_EnterkeyComponent0(this.viewUtils, this, 0, this._el_0);
        this._EnterkeyComponent_0_3 = new Wrapper_EnterkeyComponent(this.injectorGet(__WEBPACK_IMPORTED_MODULE_7__app_services_validate_service__["a" /* ValidateService */], this.parentIndex), this.injectorGet(__WEBPACK_IMPORTED_MODULE_8_angular2_flash_messages_module_flash_messages_service__["FlashMessagesService"], this.parentIndex), this.injectorGet(__WEBPACK_IMPORTED_MODULE_9__app_services_auth_service__["a" /* AuthService */], this.parentIndex), this.injectorGet(__WEBPACK_IMPORTED_MODULE_10__angular_router_src_router__["a" /* Router */], this.parentIndex), this.injectorGet(__WEBPACK_IMPORTED_MODULE_11__angular_router_src_router_state__["a" /* ActivatedRoute */], this.parentIndex));
        this.compView_0.create(this._EnterkeyComponent_0_3.context);
        this.init(this._el_0, (this.renderer.directRenderer ? null : [this._el_0]), null);
        return new __WEBPACK_IMPORTED_MODULE_6__angular_core_src_linker_component_factory__["a" /* ComponentRef_ */](0, this, this._el_0, this._EnterkeyComponent_0_3.context);
    };
    View_EnterkeyComponent_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === __WEBPACK_IMPORTED_MODULE_0__app_components_enterkey_enterkey_component__["a" /* EnterkeyComponent */]) && (0 === requestNodeIndex))) {
            return this._EnterkeyComponent_0_3.context;
        }
        return notFoundResult;
    };
    View_EnterkeyComponent_Host0.prototype.detectChangesInternal = function (throwOnChange) {
        this._EnterkeyComponent_0_3.ngDoCheck(this, this._el_0, throwOnChange);
        this.compView_0.internalDetectChanges(throwOnChange);
    };
    View_EnterkeyComponent_Host0.prototype.destroyInternal = function () {
        this.compView_0.destroy();
    };
    View_EnterkeyComponent_Host0.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    return View_EnterkeyComponent_Host0;
}(__WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__["a" /* AppView */]));
var EnterkeyComponentNgFactory = new __WEBPACK_IMPORTED_MODULE_6__angular_core_src_linker_component_factory__["b" /* ComponentFactory */]('app-enterkey', View_EnterkeyComponent_Host0, __WEBPACK_IMPORTED_MODULE_0__app_components_enterkey_enterkey_component__["a" /* EnterkeyComponent */]);
var styles_EnterkeyComponent = [__WEBPACK_IMPORTED_MODULE_12__enterkey_component_css_shim_ngstyle__["a" /* styles */]];
var renderType_EnterkeyComponent = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderComponentType"]('', 0, __WEBPACK_IMPORTED_MODULE_3__angular_core_src_metadata_view__["b" /* ViewEncapsulation */].Emulated, styles_EnterkeyComponent, {});
var View_EnterkeyComponent0 = (function (_super) {
    __extends(View_EnterkeyComponent0, _super);
    function View_EnterkeyComponent0(viewUtils, parentView, parentIndex, parentElement) {
        _super.call(this, View_EnterkeyComponent0, renderType_EnterkeyComponent, __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__["a" /* ViewType */].COMPONENT, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways);
    }
    View_EnterkeyComponent0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.parentElement);
        this._el_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, parentRenderNode, 'h2', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], null);
        this._text_1 = this.renderer.createText(this._el_0, 'Enter Month', null);
        this._text_2 = this.renderer.createText(parentRenderNode, '\n\n', null);
        this._el_3 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, parentRenderNode, 'form', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], null);
        this._NgForm_3_3 = new __WEBPACK_IMPORTED_MODULE_13__gendir_node_modules_angular_forms_src_directives_ng_form_ngfactory__["a" /* Wrapper_NgForm */](null, null);
        this._ControlContainer_3_4 = this._NgForm_3_3.context;
        this._NgControlStatusGroup_3_5 = new __WEBPACK_IMPORTED_MODULE_14__gendir_node_modules_angular_forms_src_directives_ng_control_status_ngfactory__["a" /* Wrapper_NgControlStatusGroup */](this._ControlContainer_3_4);
        this._text_4 = this.renderer.createText(this._el_3, '\n  ', null);
        this._el_5 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_3, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'form-group'), null);
        this._text_6 = this.renderer.createText(this._el_5, '\n\n  ', null);
        this._text_7 = this.renderer.createText(this._el_5, '\n\n    ', null);
        this._el_8 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_5, 'p', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'text-primary'), null);
        this._text_9 = this.renderer.createText(this._el_8, 'First Day (format YYYY-MM-DD)', null);
        this._text_10 = this.renderer.createText(this._el_5, '\n    ', null);
        this._el_11 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_5, 'input', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray8"](6, 'class', 'form-control margin-bottom', 'name', 'startDate', 'type', 'text'), null);
        this._DefaultValueAccessor_11_3 = new __WEBPACK_IMPORTED_MODULE_15__gendir_node_modules_angular_forms_src_directives_default_value_accessor_ngfactory__["a" /* Wrapper_DefaultValueAccessor */](this.renderer, new __WEBPACK_IMPORTED_MODULE_17__angular_core_src_linker_element_ref__["a" /* ElementRef */](this._el_11));
        this._NG_VALUE_ACCESSOR_11_4 = [this._DefaultValueAccessor_11_3.context];
        this._NgModel_11_5 = new __WEBPACK_IMPORTED_MODULE_16__gendir_node_modules_angular_forms_src_directives_ng_model_ngfactory__["a" /* Wrapper_NgModel */](this._ControlContainer_3_4, null, null, this._NG_VALUE_ACCESSOR_11_4);
        this._NgControl_11_6 = this._NgModel_11_5.context;
        this._NgControlStatus_11_7 = new __WEBPACK_IMPORTED_MODULE_14__gendir_node_modules_angular_forms_src_directives_ng_control_status_ngfactory__["b" /* Wrapper_NgControlStatus */](this._NgControl_11_6);
        this._text_12 = this.renderer.createText(this._el_5, '\n    ', null);
        this._el_13 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_5, 'p', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'text-primary'), null);
        this._text_14 = this.renderer.createText(this._el_13, 'Last Day (format YYYY-MM-DD)', null);
        this._text_15 = this.renderer.createText(this._el_5, '\n    ', null);
        this._el_16 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_5, 'input', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray8"](6, 'class', 'form-control margin-bottom', 'name', 'endDate', 'type', 'text'), null);
        this._DefaultValueAccessor_16_3 = new __WEBPACK_IMPORTED_MODULE_15__gendir_node_modules_angular_forms_src_directives_default_value_accessor_ngfactory__["a" /* Wrapper_DefaultValueAccessor */](this.renderer, new __WEBPACK_IMPORTED_MODULE_17__angular_core_src_linker_element_ref__["a" /* ElementRef */](this._el_16));
        this._NG_VALUE_ACCESSOR_16_4 = [this._DefaultValueAccessor_16_3.context];
        this._NgModel_16_5 = new __WEBPACK_IMPORTED_MODULE_16__gendir_node_modules_angular_forms_src_directives_ng_model_ngfactory__["a" /* Wrapper_NgModel */](this._ControlContainer_3_4, null, null, this._NG_VALUE_ACCESSOR_16_4);
        this._NgControl_16_6 = this._NgModel_16_5.context;
        this._NgControlStatus_16_7 = new __WEBPACK_IMPORTED_MODULE_14__gendir_node_modules_angular_forms_src_directives_ng_control_status_ngfactory__["b" /* Wrapper_NgControlStatus */](this._NgControl_16_6);
        this._text_17 = this.renderer.createText(this._el_5, '\n    ', null);
        this._el_18 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_5, 'input', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray8"](6, 'class', 'btn btn-primary', 'type', 'submit', 'value', 'Submit'), null);
        this._text_19 = this.renderer.createText(this._el_5, '\n  ', null);
        this._text_20 = this.renderer.createText(this._el_3, '\n', null);
        var disposable_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["subscribeToRenderElement"](this, this._el_3, new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray4"](4, 'submit', null, 'reset', null), this.eventHandler(this.handleEvent_3));
        var disposable_1 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["subscribeToRenderElement"](this, this._el_11, new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray8"](6, 'ngModelChange', null, 'input', null, 'blur', null), this.eventHandler(this.handleEvent_11));
        this._NgModel_11_5.subscribe(this, this.eventHandler(this.handleEvent_11), true);
        var disposable_2 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["subscribeToRenderElement"](this, this._el_16, new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray8"](6, 'ngModelChange', null, 'input', null, 'blur', null), this.eventHandler(this.handleEvent_16));
        this._NgModel_16_5.subscribe(this, this.eventHandler(this.handleEvent_16), true);
        this.init(null, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1,
            this._text_2,
            this._el_3,
            this._text_4,
            this._el_5,
            this._text_6,
            this._text_7,
            this._el_8,
            this._text_9,
            this._text_10,
            this._el_11,
            this._text_12,
            this._el_13,
            this._text_14,
            this._text_15,
            this._el_16,
            this._text_17,
            this._el_18,
            this._text_19,
            this._text_20
        ]), [
            disposable_0,
            disposable_1,
            disposable_2
        ]);
        return null;
    };
    View_EnterkeyComponent0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === __WEBPACK_IMPORTED_MODULE_18__angular_forms_src_directives_default_value_accessor__["a" /* DefaultValueAccessor */]) && (11 === requestNodeIndex))) {
            return this._DefaultValueAccessor_11_3.context;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_19__angular_forms_src_directives_control_value_accessor__["a" /* NG_VALUE_ACCESSOR */]) && (11 === requestNodeIndex))) {
            return this._NG_VALUE_ACCESSOR_11_4;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_20__angular_forms_src_directives_ng_model__["a" /* NgModel */]) && (11 === requestNodeIndex))) {
            return this._NgModel_11_5.context;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_21__angular_forms_src_directives_ng_control__["a" /* NgControl */]) && (11 === requestNodeIndex))) {
            return this._NgControl_11_6;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_22__angular_forms_src_directives_ng_control_status__["a" /* NgControlStatus */]) && (11 === requestNodeIndex))) {
            return this._NgControlStatus_11_7.context;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_18__angular_forms_src_directives_default_value_accessor__["a" /* DefaultValueAccessor */]) && (16 === requestNodeIndex))) {
            return this._DefaultValueAccessor_16_3.context;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_19__angular_forms_src_directives_control_value_accessor__["a" /* NG_VALUE_ACCESSOR */]) && (16 === requestNodeIndex))) {
            return this._NG_VALUE_ACCESSOR_16_4;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_20__angular_forms_src_directives_ng_model__["a" /* NgModel */]) && (16 === requestNodeIndex))) {
            return this._NgModel_16_5.context;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_21__angular_forms_src_directives_ng_control__["a" /* NgControl */]) && (16 === requestNodeIndex))) {
            return this._NgControl_16_6;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_22__angular_forms_src_directives_ng_control_status__["a" /* NgControlStatus */]) && (16 === requestNodeIndex))) {
            return this._NgControlStatus_16_7.context;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_23__angular_forms_src_directives_ng_form__["a" /* NgForm */]) && ((3 <= requestNodeIndex) && (requestNodeIndex <= 20)))) {
            return this._NgForm_3_3.context;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_24__angular_forms_src_directives_control_container__["a" /* ControlContainer */]) && ((3 <= requestNodeIndex) && (requestNodeIndex <= 20)))) {
            return this._ControlContainer_3_4;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_22__angular_forms_src_directives_ng_control_status__["b" /* NgControlStatusGroup */]) && ((3 <= requestNodeIndex) && (requestNodeIndex <= 20)))) {
            return this._NgControlStatusGroup_3_5.context;
        }
        return notFoundResult;
    };
    View_EnterkeyComponent0.prototype.detectChangesInternal = function (throwOnChange) {
        this._NgForm_3_3.ngDoCheck(this, this._el_3, throwOnChange);
        this._NgControlStatusGroup_3_5.ngDoCheck(this, this._el_3, throwOnChange);
        this._DefaultValueAccessor_11_3.ngDoCheck(this, this._el_11, throwOnChange);
        var currVal_11_1_0 = 'startDate';
        this._NgModel_11_5.check_name(currVal_11_1_0, throwOnChange, false);
        var currVal_11_1_1 = this.context.startDate;
        this._NgModel_11_5.check_model(currVal_11_1_1, throwOnChange, false);
        this._NgModel_11_5.ngDoCheck(this, this._el_11, throwOnChange);
        this._NgControlStatus_11_7.ngDoCheck(this, this._el_11, throwOnChange);
        this._DefaultValueAccessor_16_3.ngDoCheck(this, this._el_16, throwOnChange);
        var currVal_16_1_0 = 'endDate';
        this._NgModel_16_5.check_name(currVal_16_1_0, throwOnChange, false);
        var currVal_16_1_1 = this.context.endDate;
        this._NgModel_16_5.check_model(currVal_16_1_1, throwOnChange, false);
        this._NgModel_16_5.ngDoCheck(this, this._el_16, throwOnChange);
        this._NgControlStatus_16_7.ngDoCheck(this, this._el_16, throwOnChange);
        this._NgControlStatusGroup_3_5.checkHost(this, this, this._el_3, throwOnChange);
        this._NgControlStatus_11_7.checkHost(this, this, this._el_11, throwOnChange);
        this._NgControlStatus_16_7.checkHost(this, this, this._el_16, throwOnChange);
    };
    View_EnterkeyComponent0.prototype.destroyInternal = function () {
        this._NgModel_11_5.ngOnDestroy();
        this._NgModel_16_5.ngOnDestroy();
        this._NgForm_3_3.ngOnDestroy();
    };
    View_EnterkeyComponent0.prototype.handleEvent_3 = function (eventName, $event) {
        this.markPathToRootAsCheckOnce();
        var result = true;
        result = (this._NgForm_3_3.handleEvent(eventName, $event) && result);
        if ((eventName == 'submit')) {
            var pd_sub_0 = (this.context.onIdSubmit() !== false);
            result = (pd_sub_0 && result);
        }
        return result;
    };
    View_EnterkeyComponent0.prototype.handleEvent_11 = function (eventName, $event) {
        this.markPathToRootAsCheckOnce();
        var result = true;
        result = (this._DefaultValueAccessor_11_3.handleEvent(eventName, $event) && result);
        if ((eventName == 'ngModelChange')) {
            var pd_sub_0 = ((this.context.startDate = $event) !== false);
            result = (pd_sub_0 && result);
        }
        return result;
    };
    View_EnterkeyComponent0.prototype.handleEvent_16 = function (eventName, $event) {
        this.markPathToRootAsCheckOnce();
        var result = true;
        result = (this._DefaultValueAccessor_16_3.handleEvent(eventName, $event) && result);
        if ((eventName == 'ngModelChange')) {
            var pd_sub_0 = ((this.context.endDate = $event) !== false);
            result = (pd_sub_0 && result);
        }
        return result;
    };
    return View_EnterkeyComponent0;
}(__WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__["a" /* AppView */]));
//# sourceMappingURL=/Users/Collier/Documents/Projects/analytics/angular-src/src/enterkey.component.ngfactory.js.map

/***/ }),

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
/* tslint:disable */
var styles = ['body[_ngcontent-%COMP%] {\n  background-color: black;\n}\n\nh1[_ngcontent-%COMP%] {\n  font-size: 50px;\n}\n\n#wrapper[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100px;\n  border: 1px solid black;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.margin-bottom[_ngcontent-%COMP%] {\n	margin-bottom:15px;\n}\n\n.font-red[_ngcontent-%COMP%] {\n	color:red;\n}\n\n.font-lightgrey[_ngcontent-%COMP%] {\n	color:lightgrey;\n}\n\n.font-grey[_ngcontent-%COMP%] {\n	color:grey;\n}\n\n.background-grey[_ngcontent-%COMP%] {\n	background-color:grey;\n}\n\n.margin-left[_ngcontent-%COMP%] {\n	margin-left:15px;\n}\n\n.icon-nolink[_ngcontent-%COMP%] {\n  \n  color: black;\n\n  :link {\n      color: black;\n  }\n\n  :visited {\n      color: black;\n  }\n\n  :hover {\n      color: black;\n  }\n\n  :active {\n      color: black;\n  }\n\n}'];
//# sourceMappingURL=/Users/Collier/Documents/Projects/analytics/angular-src/src/home.component.css.shim.ngstyle.js.map

/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_components_home_home_component__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core_src_metadata_view__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core_src_linker_component_factory__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_services_auth_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_core_src_linker_element_ref__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_router_src_router__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__home_component_css_shim_ngstyle__ = __webpack_require__(404);
/* unused harmony export Wrapper_HomeComponent */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponentNgFactory; });
/* unused harmony export View_HomeComponent0 */
/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
/* tslint:disable */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};











var Wrapper_HomeComponent = (function () {
    function Wrapper_HomeComponent(p0, p1, p2) {
        this._changed = false;
        this.context = new __WEBPACK_IMPORTED_MODULE_0__app_components_home_home_component__["a" /* HomeComponent */](p0, p1, p2);
    }
    Wrapper_HomeComponent.prototype.ngOnDetach = function (view, componentView, el) {
    };
    Wrapper_HomeComponent.prototype.ngOnDestroy = function () {
    };
    Wrapper_HomeComponent.prototype.ngDoCheck = function (view, el, throwOnChange) {
        var changed = this._changed;
        this._changed = false;
        return changed;
    };
    Wrapper_HomeComponent.prototype.checkHost = function (view, componentView, el, throwOnChange) {
    };
    Wrapper_HomeComponent.prototype.handleEvent = function (eventName, $event) {
        var result = true;
        return result;
    };
    Wrapper_HomeComponent.prototype.subscribe = function (view, _eventHandler) {
        this._eventHandler = _eventHandler;
    };
    return Wrapper_HomeComponent;
}());
var renderType_HomeComponent_Host = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderComponentType"]('', 0, __WEBPACK_IMPORTED_MODULE_3__angular_core_src_metadata_view__["b" /* ViewEncapsulation */].None, [], {});
var View_HomeComponent_Host0 = (function (_super) {
    __extends(View_HomeComponent_Host0, _super);
    function View_HomeComponent_Host0(viewUtils, parentView, parentIndex, parentElement) {
        _super.call(this, View_HomeComponent_Host0, renderType_HomeComponent_Host, __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__["a" /* ViewType */].HOST, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways);
    }
    View_HomeComponent_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["selectOrCreateRenderHostElement"](this.renderer, 'app-home', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], rootSelector, null);
        this.compView_0 = new View_HomeComponent0(this.viewUtils, this, 0, this._el_0);
        this._HomeComponent_0_3 = new Wrapper_HomeComponent(this.injectorGet(__WEBPACK_IMPORTED_MODULE_7__app_services_auth_service__["a" /* AuthService */], this.parentIndex), new __WEBPACK_IMPORTED_MODULE_8__angular_core_src_linker_element_ref__["a" /* ElementRef */](this._el_0), this.injectorGet(__WEBPACK_IMPORTED_MODULE_9__angular_router_src_router__["a" /* Router */], this.parentIndex));
        this.compView_0.create(this._HomeComponent_0_3.context);
        this.init(this._el_0, (this.renderer.directRenderer ? null : [this._el_0]), null);
        return new __WEBPACK_IMPORTED_MODULE_6__angular_core_src_linker_component_factory__["a" /* ComponentRef_ */](0, this, this._el_0, this._HomeComponent_0_3.context);
    };
    View_HomeComponent_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === __WEBPACK_IMPORTED_MODULE_0__app_components_home_home_component__["a" /* HomeComponent */]) && (0 === requestNodeIndex))) {
            return this._HomeComponent_0_3.context;
        }
        return notFoundResult;
    };
    View_HomeComponent_Host0.prototype.detectChangesInternal = function (throwOnChange) {
        this._HomeComponent_0_3.ngDoCheck(this, this._el_0, throwOnChange);
        this.compView_0.internalDetectChanges(throwOnChange);
        if (!throwOnChange) {
            if ((this.numberOfChecks === 0)) {
                this._HomeComponent_0_3.context.ngAfterViewInit();
            }
        }
    };
    View_HomeComponent_Host0.prototype.destroyInternal = function () {
        this.compView_0.destroy();
    };
    View_HomeComponent_Host0.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    return View_HomeComponent_Host0;
}(__WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__["a" /* AppView */]));
var HomeComponentNgFactory = new __WEBPACK_IMPORTED_MODULE_6__angular_core_src_linker_component_factory__["b" /* ComponentFactory */]('app-home', View_HomeComponent_Host0, __WEBPACK_IMPORTED_MODULE_0__app_components_home_home_component__["a" /* HomeComponent */]);
var styles_HomeComponent = [__WEBPACK_IMPORTED_MODULE_10__home_component_css_shim_ngstyle__["a" /* styles */]];
var renderType_HomeComponent = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderComponentType"]('', 0, __WEBPACK_IMPORTED_MODULE_3__angular_core_src_metadata_view__["b" /* ViewEncapsulation */].Emulated, styles_HomeComponent, {});
var View_HomeComponent0 = (function (_super) {
    __extends(View_HomeComponent0, _super);
    function View_HomeComponent0(viewUtils, parentView, parentIndex, parentElement) {
        _super.call(this, View_HomeComponent0, renderType_HomeComponent, __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__["a" /* ViewType */].COMPONENT, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways);
    }
    View_HomeComponent0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.parentElement);
        this._el_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, parentRenderNode, 'body', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], null);
        this._text_1 = this.renderer.createText(this._el_0, '  \n\n    ', null);
        this._el_2 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_0, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'text-center'), null);
        this._text_3 = this.renderer.createText(this._el_2, '\n      ', null);
        this._el_4 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_2, 'h1', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'text-center margin-bottom'), null);
        this._text_5 = this.renderer.createText(this._el_4, ' Google Analytics Dashboard', null);
        this._text_6 = this.renderer.createText(this._el_2, '\n      ', null);
        this._el_7 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_2, 'h5', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'text-center margin-bottom'), null);
        this._text_8 = this.renderer.createText(this._el_7, 'Fetch and Display Google Analytic Data', null);
        this._text_9 = this.renderer.createText(this._el_2, '\n    ', null);
        this._text_10 = this.renderer.createText(this._el_0, '\n\n    ', null);
        this._el_11 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_0, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'id', 'wrapper'), null);
        this._text_12 = this.renderer.createText(this._el_11, '\n      ', null);
        this._el_13 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_11, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray16"](12, 'class', 'g-signin2', 'data-height', '50', 'data-longtitle', 'true', 'data-onsuccess', 'onSignIn', 'data-theme', 'dark', 'data-width', '300'), null);
        this._text_14 = this.renderer.createText(this._el_13, '\n      ', null);
        this._text_15 = this.renderer.createText(this._el_11, '\n    ', null);
        this._text_16 = this.renderer.createText(this._el_0, '\n\n', null);
        this._text_17 = this.renderer.createText(parentRenderNode, '\n', null);
        this.init(null, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._el_4,
            this._text_5,
            this._text_6,
            this._el_7,
            this._text_8,
            this._text_9,
            this._text_10,
            this._el_11,
            this._text_12,
            this._el_13,
            this._text_14,
            this._text_15,
            this._text_16,
            this._text_17
        ]), null);
        return null;
    };
    return View_HomeComponent0;
}(__WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__["a" /* AppView */]));
//# sourceMappingURL=/Users/Collier/Documents/Projects/analytics/angular-src/src/home.component.ngfactory.js.map

/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
/* tslint:disable */
var styles = [''];
//# sourceMappingURL=/Users/Collier/Documents/Projects/analytics/angular-src/src/navbar.component.css.shim.ngstyle.js.map

/***/ }),

/***/ 407:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_components_navbar_navbar_component__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core_src_metadata_view__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core_src_linker_component_factory__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_services_auth_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_router_src_router__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angular2_flash_messages_module_flash_messages_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angular2_flash_messages_module_flash_messages_service___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_angular2_flash_messages_module_flash_messages_service__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__navbar_component_css_shim_ngstyle__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__gendir_node_modules_angular_common_src_directives_ng_class_ngfactory__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__gendir_node_modules_angular_router_src_directives_router_link_active_ngfactory__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_core_src_linker_query_list__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__gendir_node_modules_angular_router_src_directives_router_link_ngfactory__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_core_src_change_detection_differs_iterable_differs__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_core_src_change_detection_differs_keyvalue_differs__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_core_src_linker_element_ref__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__angular_router_src_router_state__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_common_src_location_location_strategy__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__angular_router_src_directives_router_link__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__angular_router_src_directives_router_link_active__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__angular_common_src_directives_ng_class__ = __webpack_require__(146);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Wrapper_NavbarComponent; });
/* unused harmony export NavbarComponentNgFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return View_NavbarComponent0; });
/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
/* tslint:disable */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};























var Wrapper_NavbarComponent = (function () {
    function Wrapper_NavbarComponent(p0, p1, p2) {
        this._changed = false;
        this.context = new __WEBPACK_IMPORTED_MODULE_0__app_components_navbar_navbar_component__["a" /* NavbarComponent */](p0, p1, p2);
    }
    Wrapper_NavbarComponent.prototype.ngOnDetach = function (view, componentView, el) {
    };
    Wrapper_NavbarComponent.prototype.ngOnDestroy = function () {
    };
    Wrapper_NavbarComponent.prototype.ngDoCheck = function (view, el, throwOnChange) {
        var changed = this._changed;
        this._changed = false;
        if (!throwOnChange) {
            if ((view.numberOfChecks === 0)) {
                this.context.ngOnInit();
            }
        }
        return changed;
    };
    Wrapper_NavbarComponent.prototype.checkHost = function (view, componentView, el, throwOnChange) {
    };
    Wrapper_NavbarComponent.prototype.handleEvent = function (eventName, $event) {
        var result = true;
        return result;
    };
    Wrapper_NavbarComponent.prototype.subscribe = function (view, _eventHandler) {
        this._eventHandler = _eventHandler;
    };
    return Wrapper_NavbarComponent;
}());
var renderType_NavbarComponent_Host = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderComponentType"]('', 0, __WEBPACK_IMPORTED_MODULE_3__angular_core_src_metadata_view__["b" /* ViewEncapsulation */].None, [], {});
var View_NavbarComponent_Host0 = (function (_super) {
    __extends(View_NavbarComponent_Host0, _super);
    function View_NavbarComponent_Host0(viewUtils, parentView, parentIndex, parentElement) {
        _super.call(this, View_NavbarComponent_Host0, renderType_NavbarComponent_Host, __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__["a" /* ViewType */].HOST, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways);
    }
    View_NavbarComponent_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["selectOrCreateRenderHostElement"](this.renderer, 'app-navbar', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], rootSelector, null);
        this.compView_0 = new View_NavbarComponent0(this.viewUtils, this, 0, this._el_0);
        this._NavbarComponent_0_3 = new Wrapper_NavbarComponent(this.injectorGet(__WEBPACK_IMPORTED_MODULE_7__app_services_auth_service__["a" /* AuthService */], this.parentIndex), this.injectorGet(__WEBPACK_IMPORTED_MODULE_8__angular_router_src_router__["a" /* Router */], this.parentIndex), this.injectorGet(__WEBPACK_IMPORTED_MODULE_9_angular2_flash_messages_module_flash_messages_service__["FlashMessagesService"], this.parentIndex));
        this.compView_0.create(this._NavbarComponent_0_3.context);
        this.init(this._el_0, (this.renderer.directRenderer ? null : [this._el_0]), null);
        return new __WEBPACK_IMPORTED_MODULE_6__angular_core_src_linker_component_factory__["a" /* ComponentRef_ */](0, this, this._el_0, this._NavbarComponent_0_3.context);
    };
    View_NavbarComponent_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === __WEBPACK_IMPORTED_MODULE_0__app_components_navbar_navbar_component__["a" /* NavbarComponent */]) && (0 === requestNodeIndex))) {
            return this._NavbarComponent_0_3.context;
        }
        return notFoundResult;
    };
    View_NavbarComponent_Host0.prototype.detectChangesInternal = function (throwOnChange) {
        this._NavbarComponent_0_3.ngDoCheck(this, this._el_0, throwOnChange);
        this.compView_0.internalDetectChanges(throwOnChange);
    };
    View_NavbarComponent_Host0.prototype.destroyInternal = function () {
        this.compView_0.destroy();
    };
    View_NavbarComponent_Host0.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    return View_NavbarComponent_Host0;
}(__WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__["a" /* AppView */]));
var NavbarComponentNgFactory = new __WEBPACK_IMPORTED_MODULE_6__angular_core_src_linker_component_factory__["b" /* ComponentFactory */]('app-navbar', View_NavbarComponent_Host0, __WEBPACK_IMPORTED_MODULE_0__app_components_navbar_navbar_component__["a" /* NavbarComponent */]);
var styles_NavbarComponent = [__WEBPACK_IMPORTED_MODULE_10__navbar_component_css_shim_ngstyle__["a" /* styles */]];
var renderType_NavbarComponent = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderComponentType"]('', 0, __WEBPACK_IMPORTED_MODULE_3__angular_core_src_metadata_view__["b" /* ViewEncapsulation */].Emulated, styles_NavbarComponent, {});
var View_NavbarComponent0 = (function (_super) {
    __extends(View_NavbarComponent0, _super);
    function View_NavbarComponent0(viewUtils, parentView, parentIndex, parentElement) {
        _super.call(this, View_NavbarComponent0, renderType_NavbarComponent, __WEBPACK_IMPORTED_MODULE_4__angular_core_src_linker_view_type__["a" /* ViewType */].COMPONENT, viewUtils, parentView, parentIndex, parentElement, __WEBPACK_IMPORTED_MODULE_5__angular_core_src_change_detection_constants__["b" /* ChangeDetectorStatus */].CheckAlways);
        this._map_49 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["pureProxy1"](function (p0) {
            return { in: p0 };
        });
        this._map_50 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["pureProxy1"](function (p0) {
            return { exact: p0 };
        });
        this._arr_51 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["pureProxy1"](function (p0) {
            return [p0];
        });
        this._arr_52 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["pureProxy1"](function (p0) {
            return [p0];
        });
        this._map_53 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["pureProxy1"](function (p0) {
            return { exact: p0 };
        });
        this._arr_54 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["pureProxy1"](function (p0) {
            return [p0];
        });
        this._arr_55 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["pureProxy1"](function (p0) {
            return [p0];
        });
    }
    View_NavbarComponent0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.parentElement);
        this._el_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, parentRenderNode, 'nav', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'navbar navbar-default'), null);
        this._text_1 = this.renderer.createText(this._el_0, '\n      ', null);
        this._el_2 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_0, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'container-fluid'), null);
        this._text_3 = this.renderer.createText(this._el_2, '\n        ', null);
        this._el_4 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_2, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'navbar-header'), null);
        this._text_5 = this.renderer.createText(this._el_4, '\n          ', null);
        this._el_6 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_4, 'button', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray16"](12, 'aria-controls', 'navbar', 'aria-expanded', 'false', 'class', 'navbar-toggle collapsed', 'data-target', '#navbar', 'data-toggle', 'collapse', 'type', 'button'), null);
        this._text_7 = this.renderer.createText(this._el_6, '\n            ', null);
        this._el_8 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_6, 'span', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'sr-only'), null);
        this._text_9 = this.renderer.createText(this._el_8, 'Toggle navigation', null);
        this._text_10 = this.renderer.createText(this._el_6, '\n            ', null);
        this._el_11 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_6, 'span', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'icon-bar'), null);
        this._text_12 = this.renderer.createText(this._el_6, '\n            ', null);
        this._el_13 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_6, 'span', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'icon-bar'), null);
        this._text_14 = this.renderer.createText(this._el_6, '\n            ', null);
        this._el_15 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_6, 'span', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'icon-bar'), null);
        this._text_16 = this.renderer.createText(this._el_6, '\n          ', null);
        this._text_17 = this.renderer.createText(this._el_4, '\n          ', null);
        this._el_18 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_4, 'a', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray4"](4, 'class', 'navbar-brand', 'href', ' '), null);
        this._text_19 = this.renderer.createText(this._el_18, 'Google Analytics Dashboard', null);
        this._text_20 = this.renderer.createText(this._el_4, '\n        ', null);
        this._text_21 = this.renderer.createText(this._el_2, '\n        ', null);
        this._el_22 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_2, 'div', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray4"](4, 'class', 'collapse navbar-collapse', 'id', 'navbar'), null);
        this._NgClass_22_3 = new __WEBPACK_IMPORTED_MODULE_11__gendir_node_modules_angular_common_src_directives_ng_class_ngfactory__["a" /* Wrapper_NgClass */](this.parentView.injectorGet(__WEBPACK_IMPORTED_MODULE_15__angular_core_src_change_detection_differs_iterable_differs__["a" /* IterableDiffers */], this.parentIndex), this.parentView.injectorGet(__WEBPACK_IMPORTED_MODULE_16__angular_core_src_change_detection_differs_keyvalue_differs__["a" /* KeyValueDiffers */], this.parentIndex), new __WEBPACK_IMPORTED_MODULE_17__angular_core_src_linker_element_ref__["a" /* ElementRef */](this._el_22), this.renderer);
        this._text_23 = this.renderer.createText(this._el_22, '\n          \n          ', null);
        this._el_24 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_22, 'ul', new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'class', 'nav navbar-nav navbar-right'), null);
        this._text_25 = this.renderer.createText(this._el_24, '\n            ', null);
        this._el_26 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_24, 'li', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], null);
        this._RouterLinkActive_26_3 = new __WEBPACK_IMPORTED_MODULE_12__gendir_node_modules_angular_router_src_directives_router_link_active_ngfactory__["a" /* Wrapper_RouterLinkActive */](this.parentView.injectorGet(__WEBPACK_IMPORTED_MODULE_8__angular_router_src_router__["a" /* Router */], this.parentIndex), new __WEBPACK_IMPORTED_MODULE_17__angular_core_src_linker_element_ref__["a" /* ElementRef */](this._el_26), this.renderer, this.ref);
        this._query_RouterLink_26_0 = new __WEBPACK_IMPORTED_MODULE_13__angular_core_src_linker_query_list__["a" /* QueryList */]();
        this._query_RouterLinkWithHref_26_1 = new __WEBPACK_IMPORTED_MODULE_13__angular_core_src_linker_query_list__["a" /* QueryList */]();
        this._text_27 = this.renderer.createText(this._el_26, ' ', null);
        this._el_28 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_26, 'a', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], null);
        this._RouterLinkWithHref_28_3 = new __WEBPACK_IMPORTED_MODULE_14__gendir_node_modules_angular_router_src_directives_router_link_ngfactory__["a" /* Wrapper_RouterLinkWithHref */](this.parentView.injectorGet(__WEBPACK_IMPORTED_MODULE_8__angular_router_src_router__["a" /* Router */], this.parentIndex), this.parentView.injectorGet(__WEBPACK_IMPORTED_MODULE_18__angular_router_src_router_state__["a" /* ActivatedRoute */], this.parentIndex), this.parentView.injectorGet(__WEBPACK_IMPORTED_MODULE_19__angular_common_src_location_location_strategy__["b" /* LocationStrategy */], this.parentIndex));
        this._text_29 = this.renderer.createText(this._el_28, 'Home', null);
        this._text_30 = this.renderer.createText(this._el_24, '\n            ', null);
        this._text_31 = this.renderer.createText(this._el_24, '\n            ', null);
        this._el_32 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_24, 'li', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], null);
        this._RouterLinkActive_32_3 = new __WEBPACK_IMPORTED_MODULE_12__gendir_node_modules_angular_router_src_directives_router_link_active_ngfactory__["a" /* Wrapper_RouterLinkActive */](this.parentView.injectorGet(__WEBPACK_IMPORTED_MODULE_8__angular_router_src_router__["a" /* Router */], this.parentIndex), new __WEBPACK_IMPORTED_MODULE_17__angular_core_src_linker_element_ref__["a" /* ElementRef */](this._el_32), this.renderer, this.ref);
        this._query_RouterLink_32_0 = new __WEBPACK_IMPORTED_MODULE_13__angular_core_src_linker_query_list__["a" /* QueryList */]();
        this._query_RouterLinkWithHref_32_1 = new __WEBPACK_IMPORTED_MODULE_13__angular_core_src_linker_query_list__["a" /* QueryList */]();
        this._text_33 = this.renderer.createText(this._el_32, ' ', null);
        this._el_34 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["createRenderElement"](this.renderer, this._el_32, 'a', __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["EMPTY_INLINE_ARRAY"], null);
        this._RouterLinkWithHref_34_3 = new __WEBPACK_IMPORTED_MODULE_14__gendir_node_modules_angular_router_src_directives_router_link_ngfactory__["a" /* Wrapper_RouterLinkWithHref */](this.parentView.injectorGet(__WEBPACK_IMPORTED_MODULE_8__angular_router_src_router__["a" /* Router */], this.parentIndex), this.parentView.injectorGet(__WEBPACK_IMPORTED_MODULE_18__angular_router_src_router_state__["a" /* ActivatedRoute */], this.parentIndex), this.parentView.injectorGet(__WEBPACK_IMPORTED_MODULE_19__angular_common_src_location_location_strategy__["b" /* LocationStrategy */], this.parentIndex));
        this._text_35 = this.renderer.createText(this._el_34, 'About', null);
        this._text_36 = this.renderer.createText(this._el_24, '\n          ', null);
        this._text_37 = this.renderer.createText(this._el_22, '\n        ', null);
        this._text_38 = this.renderer.createText(this._el_2, '\n      ', null);
        this._text_39 = this.renderer.createText(this._el_0, '\n    ', null);
        var disposable_0 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["subscribeToRenderElement"](this, this._el_6, new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'click', null), this.eventHandler(this.handleEvent_6));
        var disposable_1 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["subscribeToRenderElement"](this, this._el_18, new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'click', null), this.eventHandler(this.handleEvent_18));
        var disposable_2 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["subscribeToRenderElement"](this, this._el_28, new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'click', null), this.eventHandler(this.handleEvent_28));
        var disposable_3 = __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["subscribeToRenderElement"](this, this._el_34, new __WEBPACK_IMPORTED_MODULE_2__angular_core_src_linker_view_utils__["InlineArray2"](2, 'click', null), this.eventHandler(this.handleEvent_34));
        this.init(null, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._el_4,
            this._text_5,
            this._el_6,
            this._text_7,
            this._el_8,
            this._text_9,
            this._text_10,
            this._el_11,
            this._text_12,
            this._el_13,
            this._text_14,
            this._el_15,
            this._text_16,
            this._text_17,
            this._el_18,
            this._text_19,
            this._text_20,
            this._text_21,
            this._el_22,
            this._text_23,
            this._el_24,
            this._text_25,
            this._el_26,
            this._text_27,
            this._el_28,
            this._text_29,
            this._text_30,
            this._text_31,
            this._el_32,
            this._text_33,
            this._el_34,
            this._text_35,
            this._text_36,
            this._text_37,
            this._text_38,
            this._text_39
        ]), [
            disposable_0,
            disposable_1,
            disposable_2,
            disposable_3
        ]);
        return null;
    };
    View_NavbarComponent0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === __WEBPACK_IMPORTED_MODULE_20__angular_router_src_directives_router_link__["b" /* RouterLinkWithHref */]) && ((28 <= requestNodeIndex) && (requestNodeIndex <= 29)))) {
            return this._RouterLinkWithHref_28_3.context;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_21__angular_router_src_directives_router_link_active__["a" /* RouterLinkActive */]) && ((26 <= requestNodeIndex) && (requestNodeIndex <= 29)))) {
            return this._RouterLinkActive_26_3.context;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_20__angular_router_src_directives_router_link__["b" /* RouterLinkWithHref */]) && ((34 <= requestNodeIndex) && (requestNodeIndex <= 35)))) {
            return this._RouterLinkWithHref_34_3.context;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_21__angular_router_src_directives_router_link_active__["a" /* RouterLinkActive */]) && ((32 <= requestNodeIndex) && (requestNodeIndex <= 35)))) {
            return this._RouterLinkActive_32_3.context;
        }
        if (((token === __WEBPACK_IMPORTED_MODULE_22__angular_common_src_directives_ng_class__["a" /* NgClass */]) && ((22 <= requestNodeIndex) && (requestNodeIndex <= 37)))) {
            return this._NgClass_22_3.context;
        }
        return notFoundResult;
    };
    View_NavbarComponent0.prototype.detectChangesInternal = function (throwOnChange) {
        var currVal_22_0_0 = 'collapse navbar-collapse';
        this._NgClass_22_3.check_klass(currVal_22_0_0, throwOnChange, false);
        var currVal_22_0_1 = this._map_49(this.context.isIn);
        this._NgClass_22_3.check_ngClass(currVal_22_0_1, throwOnChange, false);
        this._NgClass_22_3.ngDoCheck(this, this._el_22, throwOnChange);
        var currVal_26_0_0 = this._map_50(true);
        this._RouterLinkActive_26_3.check_routerLinkActiveOptions(currVal_26_0_0, throwOnChange, false);
        var currVal_26_0_1 = this._arr_51('active');
        this._RouterLinkActive_26_3.check_routerLinkActive(currVal_26_0_1, throwOnChange, false);
        this._RouterLinkActive_26_3.ngDoCheck(this, this._el_26, throwOnChange);
        var currVal_28_0_0 = this._arr_52('/dummy');
        this._RouterLinkWithHref_28_3.check_routerLink(currVal_28_0_0, throwOnChange, false);
        this._RouterLinkWithHref_28_3.ngDoCheck(this, this._el_28, throwOnChange);
        var currVal_32_0_0 = this._map_53(true);
        this._RouterLinkActive_32_3.check_routerLinkActiveOptions(currVal_32_0_0, throwOnChange, false);
        var currVal_32_0_1 = this._arr_54('active');
        this._RouterLinkActive_32_3.check_routerLinkActive(currVal_32_0_1, throwOnChange, false);
        this._RouterLinkActive_32_3.ngDoCheck(this, this._el_32, throwOnChange);
        var currVal_34_0_0 = this._arr_55('/about');
        this._RouterLinkWithHref_34_3.check_routerLink(currVal_34_0_0, throwOnChange, false);
        this._RouterLinkWithHref_34_3.ngDoCheck(this, this._el_34, throwOnChange);
        if (!throwOnChange) {
            if (this._query_RouterLink_26_0.dirty) {
                this._query_RouterLink_26_0.reset([]);
                this._RouterLinkActive_26_3.context.links = this._query_RouterLink_26_0;
                this._query_RouterLink_26_0.notifyOnChanges();
            }
            if (this._query_RouterLinkWithHref_26_1.dirty) {
                this._query_RouterLinkWithHref_26_1.reset([this._RouterLinkWithHref_28_3.context]);
                this._RouterLinkActive_26_3.context.linksWithHrefs = this._query_RouterLinkWithHref_26_1;
                this._query_RouterLinkWithHref_26_1.notifyOnChanges();
            }
            if (this._query_RouterLink_32_0.dirty) {
                this._query_RouterLink_32_0.reset([]);
                this._RouterLinkActive_32_3.context.links = this._query_RouterLink_32_0;
                this._query_RouterLink_32_0.notifyOnChanges();
            }
            if (this._query_RouterLinkWithHref_32_1.dirty) {
                this._query_RouterLinkWithHref_32_1.reset([this._RouterLinkWithHref_34_3.context]);
                this._RouterLinkActive_32_3.context.linksWithHrefs = this._query_RouterLinkWithHref_32_1;
                this._query_RouterLinkWithHref_32_1.notifyOnChanges();
            }
            if ((this.numberOfChecks === 0)) {
                this._RouterLinkActive_26_3.context.ngAfterContentInit();
            }
            if ((this.numberOfChecks === 0)) {
                this._RouterLinkActive_32_3.context.ngAfterContentInit();
            }
        }
        this._RouterLinkWithHref_28_3.checkHost(this, this, this._el_28, throwOnChange);
        this._RouterLinkWithHref_34_3.checkHost(this, this, this._el_34, throwOnChange);
    };
    View_NavbarComponent0.prototype.destroyInternal = function () {
        this._RouterLinkWithHref_28_3.ngOnDestroy();
        this._RouterLinkActive_26_3.ngOnDestroy();
        this._RouterLinkWithHref_34_3.ngOnDestroy();
        this._RouterLinkActive_32_3.ngOnDestroy();
    };
    View_NavbarComponent0.prototype.handleEvent_6 = function (eventName, $event) {
        this.markPathToRootAsCheckOnce();
        var result = true;
        if ((eventName == 'click')) {
            var pd_sub_0 = (this.context.toggleState() !== false);
            result = (pd_sub_0 && result);
        }
        return result;
    };
    View_NavbarComponent0.prototype.handleEvent_18 = function (eventName, $event) {
        this.markPathToRootAsCheckOnce();
        var result = true;
        if ((eventName == 'click')) {
            var pd_sub_0 = (this.context.onRefreshHome() !== false);
            result = (pd_sub_0 && result);
        }
        return result;
    };
    View_NavbarComponent0.prototype.handleEvent_28 = function (eventName, $event) {
        this.markPathToRootAsCheckOnce();
        var result = true;
        result = (this._RouterLinkWithHref_28_3.handleEvent(eventName, $event) && result);
        if ((eventName == 'click')) {
            var pd_sub_0 = (this.context.onRefreshHome() !== false);
            result = (pd_sub_0 && result);
        }
        return result;
    };
    View_NavbarComponent0.prototype.handleEvent_34 = function (eventName, $event) {
        this.markPathToRootAsCheckOnce();
        var result = true;
        result = (this._RouterLinkWithHref_34_3.handleEvent(eventName, $event) && result);
        return result;
    };
    return View_NavbarComponent0;
}(__WEBPACK_IMPORTED_MODULE_1__angular_core_src_linker_view__["a" /* AppView */]));
//# sourceMappingURL=/Users/Collier/Documents/Projects/analytics/angular-src/src/navbar.component.ngfactory.js.map

/***/ }),

/***/ 417:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    return AppComponent;
}());
//# sourceMappingURL=/Users/Collier/Documents/Projects/analytics/angular-src/src/app.component.js.map

/***/ }),

/***/ 418:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_home_home_component__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_about_about_component__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_enterkey_enterkey_component__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_barchart_barchart_component__ = __webpack_require__(187);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });




var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_0__components_home_home_component__["a" /* HomeComponent */] },
    { path: 'about', component: __WEBPACK_IMPORTED_MODULE_1__components_about_about_component__["a" /* AboutComponent */] },
    { path: 'enterkey', component: __WEBPACK_IMPORTED_MODULE_2__components_enterkey_enterkey_component__["a" /* EnterkeyComponent */] },
    { path: 'barchart', component: __WEBPACK_IMPORTED_MODULE_3__components_barchart_barchart_component__["a" /* BarchartComponent */] }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
//# sourceMappingURL=/Users/Collier/Documents/Projects/analytics/angular-src/src/app.module.js.map

/***/ }),

/***/ 419:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(24);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });


var AuthGuard = (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (this.authService.loggedIn()) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    };
    AuthGuard.ctorParameters = function () { return [{ type: __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* Router */] }]; };
    return AuthGuard;
}());
//# sourceMappingURL=/Users/Collier/Documents/Projects/analytics/angular-src/src/auth.guard.js.map

/***/ }),

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/Users/Collier/Documents/Projects/analytics/angular-src/src/environment.js.map

/***/ }),

/***/ 601:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(324);


/***/ })

},[601]);
//# sourceMappingURL=main.bundle.js.map