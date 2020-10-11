import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  addForm: FormGroup;
  current_datetime:any;
  formatted_date:any;
  invoice_date;
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService,) {}

  
  
  ngOnInit() {
    if(!window.localStorage.getItem('token')) {
      this.router.navigate(['sign-in']);
      return;
    }
    else if(window.localStorage.getItem('token') && window.localStorage.getItem('role') != "User"){
      this.router.navigate(['sign-in']);
      return;
    }
    this.current_datetime = new Date();
    this.invoice_date = this.current_datetime.getDate() + "-" + (this.current_datetime.getMonth() + 1) + "-" + this.current_datetime.getFullYear();
    
    this.addForm = this.formBuilder.group({
      user_id :window.localStorage.getItem('user_id'),
      invoice_name: ['', Validators.required],
      invoice_date: [(new Date()).toISOString().substring(0,10), Validators.required],
      invoice_price: ['', [Validators.required,Validators.pattern("^[0-9]*$")]]
     
    });
    


  }

  onSubmit() {
    if (this.addForm.invalid) {
      return;
    }
    this.apiService.addinvoice(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['list']);
      });
  }
  gotolist()
  {this.router.navigate(['list']);

  }
}
