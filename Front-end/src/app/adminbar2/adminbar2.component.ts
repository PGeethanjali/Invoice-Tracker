import { Label } from 'ng2-charts';
import { Router } from '@angular/router';
import {ApiService} from "../services/api.service";
import {User} from "../models/user.model";
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-adminbar2',
  templateUrl: './adminbar2.component.html',
  styleUrls: ['./adminbar2.component.css']
})
export class Adminbar2Component implements OnInit {

  invoices: User[];
  
  invoiceArray:any = [];
  dateArray:any;
  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if(!window.localStorage.getItem('token')) {
      this.router.navigate(['sign-in']);
      return;
    }
    else if(window.localStorage.getItem('token') && window.localStorage.getItem('role') != "Admin"){
      this.router.navigate(['sign-in']);
      return;
    }
    this.apiService.getadminbar2()
    .subscribe( data => {
      
      this.invoices = data.result;
      this.invoiceArray = this.invoices.map(function(a) {return Number(a["invoices"]);});
      this.dateArray = this.invoices.map(function(a) {return a["username"];});
      this.barChartLabels = this.dateArray;
      this.barChartData =[ {data: this.invoiceArray,label:'Invoices'}];
    });
  }
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{scaleLabel:{display:true,labelString:'User Name'}}], yAxes: [{scaleLabel:{display:true,labelString:'Invoice count'},ticks:{stepSize:1,min:0}}] },
    maintainAspectRatio: false
  };

  barChartLabels: Label[];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: '' }
  ];
}
