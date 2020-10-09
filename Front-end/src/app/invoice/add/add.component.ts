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
  
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService,) {}

  
  
  ngOnInit() {
    
    this.addForm = this.formBuilder.group({
      user_id :window.localStorage.getItem('user_id'),
      invoice_name: ['', Validators.required],
      invoice_date: ['', Validators.required],
      invoice_price: ['', Validators.required]
    });

  }

  onSubmit() {
    this.apiService.addinvoice(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['list']);
      });
  }
  gotolist()
  {this.router.navigate(['list']);

  }
}
