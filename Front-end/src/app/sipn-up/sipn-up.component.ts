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
  name:any;
  
  
  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
    const loginPayload = {
      username: this.signupForm.controls.username.value
    }
    // this.name = this.signupForm.controls.username.value;
    this.apiService.checkuser(loginPayload).subscribe(data=>{

      if(data.result[0].exists == true){
        
       alert("User already exist");
      }
      else{
        this.apiService.signup(this.signupForm.value).subscribe( data => {
          this.router.navigate(['sign-in']);
        });
      }
     });
    
  }

  ngOnInit() {

    
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required,Validators.minLength(5)]],
      email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required,,Validators.minLength(5)]],
      role: [null, Validators.required]
    });
  }
 
 gotosignin()
 {this.router.navigate(['sign-in']);

 }
  
}
