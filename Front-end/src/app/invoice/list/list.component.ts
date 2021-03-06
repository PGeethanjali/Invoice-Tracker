import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user.model";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  invoices: User[];
  sums:any;
  filterForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      user_id :window.localStorage.getItem('user_id'),
      from_date: ['', Validators.required],
      to_date: ['', Validators.required]
    });

    if(!window.localStorage.getItem('token')) {
      this.router.navigate(['sign-in']);
      return;
    }
    else if(window.localStorage.getItem('token') && window.localStorage.getItem('role') != "User"){
      this.router.navigate(['sign-in']);
      return;
    }
    this.apiService.getlist(window.localStorage.getItem('user_id'))
      .subscribe( data => {
        this.invoices = data.result.data;
        this.sums = data.result.sum[0].total;
      });
  }
  deleteinvoice(invoice: User): void {
    this.apiService.deleteinvoice(invoice.invoice_id)
      .subscribe( data => {
        this.invoices = this.invoices.filter(u => u !== invoice);
        this.sums = Number(this.sums) - invoice.invoice_price;
    
      });
  };

  editinvoice(invoice: User): void {
    window.localStorage.removeItem("editInvoiceId");
    window.localStorage.setItem("editInvoiceId", invoice.invoice_id.toString());
    if(!window.localStorage.getItem("editInvoiceId")) {
      this.router.navigate(['sign-in']);
      return;
    }
    this.router.navigate(['edit']);
  };

  addinvoice(): void {
    this.router.navigate(['add']);
  };

  onSubmit() {
    if (this.filterForm.invalid) {
      return;
    }
    if(this.filterForm.controls.from_date.value && this.filterForm.controls.to_date.value){
      if(this.filterForm.controls.from_date.value < this.filterForm.controls.to_date.value ){
    this.apiService.getlistbydate(this.filterForm.value)
      .subscribe( data => {
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


