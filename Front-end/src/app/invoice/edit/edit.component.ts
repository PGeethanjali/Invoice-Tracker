import { Component, OnInit , Inject} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {User} from "../../models/user.model";
import {ApiService} from "../../services/api.service";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  date:any;
  latest:any;
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService,public datepipe: DatePipe) { }

  ngOnInit() {
    let InvoiceId = window.localStorage.getItem("editInvoiceId");
    if(!InvoiceId) {
      alert("Invalid action.")
      this.router.navigate(['list']);
      return;
    }
    if(!window.localStorage.getItem('token')) {
      this.router.navigate(['sign-in']);
      return;
    }
    else if(window.localStorage.getItem('token') && window.localStorage.getItem('role') != "User"){
      this.router.navigate(['sign-in']);
      return;
    }
    this.editForm = this.formBuilder.group({
      invoice_id: ['', Validators.required],
      invoice_name: ['', Validators.required],
      invoice_date: ['', Validators.required],
      invoice_price: ['', [Validators.required,Validators.pattern("^[0-9]*$")]]
    });

    this.apiService.getuserinvoice(InvoiceId)
      .subscribe( data => {
        
        this.date = new Date(data.result[0].invoice_date);
        this.latest = this.datepipe.transform(this.date,'yyyy-MM-dd');
        data.result[0].invoice_date = this.latest;
        this.editForm.setValue(data.result[0]);
      });
  }

  onSubmit() {
    if (this.editForm.invalid) {
      return;
    }
    this.apiService.updateinvoice(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if(data.status === 200) {
            alert('Invoice updated successfully.');
            this.router.navigate(['list']);
          }else {
            alert(data.message);
          }
        },
        error => {
          alert(error);
        });
  }

}


