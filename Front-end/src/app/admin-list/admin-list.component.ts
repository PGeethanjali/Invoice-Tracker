import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../models/user.model";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  invoices: User[];
  sums:any;
  filterForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      from_date: ['', Validators.required],
      to_date: ['', Validators.required]
    });

    if(!window.localStorage.getItem('token')) {
      this.router.navigate(['sign-in']);
      return;
    }
    else if(window.localStorage.getItem('token') && window.localStorage.getItem('role') != "Admin"){
      this.router.navigate(['sign-in']);
      return;
    }
    this.apiService.getadminlist()
      .subscribe( data => {
        this.invoices = data.result.data;
        this.sums = data.result.sum[0].total;
      });
  }
  onSubmit() {
    if (this.filterForm.invalid) {
      return;
    }
    if(this.filterForm.controls.from_date.value && this.filterForm.controls.to_date.value){
      if(this.filterForm.controls.from_date.value < this.filterForm.controls.to_date.value ){
    this.apiService.getadminlistbydate(this.filterForm.value)
      .subscribe( data => {
        console.log(data.result);
        this.invoices = data.result.data;
        this.sums = data.result.sum[0].total;
      });
    }
    else{
      alert('From date should be lesser than To date');
    }
    }
    else{
      alert("Enter Proper Date");
    }
  }

}
