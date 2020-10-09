import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { User } from '../user';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-sipn-up',
  templateUrl: './sipn-up.component.html',
  styleUrls: ['./sipn-up.component.css']
})
export class SipnUpComponent implements OnInit {

  signupForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  user:User;
  roles:any = ["User","Admin"];
  
  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
    this.apiService.signup(this.signupForm.value).subscribe( data => {
      this.router.navigate(['sign-in']);
    });
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: [null, Validators.required]
    });
  }

  
}
