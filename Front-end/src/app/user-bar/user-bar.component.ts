import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Router } from '@angular/router';
import {ApiService} from "../services/api.service";
import {User} from "../models/user.model";
import { title } from 'process';

@Component({
  selector: 'app-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.css']
})
export class UserBarComponent implements OnInit {

  invoices: User[];
  
  invoiceArray:any = [];
  dateArray:any;
  
  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if(!window.localStorage.getItem('token')) {
      this.router.navigate(['sign-in']);
      return;
    }
    else if(window.localStorage.getItem('token') && window.localStorage.getItem('role') != "User"){
      this.router.navigate(['sign-in']);
      return;
    }
    this.apiService.getuserbar(window.localStorage.getItem('user_id'))
    .subscribe( data => {
      
      this.invoices = data.result;
      this.invoiceArray = this.invoices.map(function(a) {return Number(a["invoices"]);});
      this.dateArray = this.invoices.map(function(a)  {var current_datetime = new Date(a["date"]);
      let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
        return formatted_date;});
      this.barChartLabels = this.dateArray;
      this.barChartData =[ {data: this.invoiceArray,label:'Invoices'}];
    });
  }
  
  
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{scaleLabel:{display:true,labelString:'Invoice Date'}}], yAxes: [{scaleLabel:{display:true,labelString:'Invoice count'}, ticks:{stepSize:1,min:0}}] },
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
