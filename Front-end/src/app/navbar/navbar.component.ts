import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { ServiceService } from '../service.service';
import {ApiService} from "../services/api.service";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user:any;
  constructor(private Service: ServiceService, private router: Router,route: ActivatedRoute,private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getusername(window.localStorage.getItem('user_id'))
      .subscribe( data => {
        this.user = data.result[0].username;
      });

  }
  gotolist(){
    if(window.localStorage.getItem('role') == 'Admin'){
      this.router.navigate(['adminlist']);
    }
    else if(window.localStorage.getItem('role') == 'User'){
    this.router.navigate(['list']);
    }
    else{
      this.router.navigate(['sign-in']);
    }
  }
  logout()
  { 
   window.localStorage.removeItem('token');
   window.localStorage.removeItem('user_id');
   window.localStorage.removeItem('role');
   this.router.navigate(['sign-in']);
    
  }
  gotograph(){
    if(window.localStorage.getItem('role') == 'Admin'){
      this.router.navigate(['adminChart']);
    }
    else if(window.localStorage.getItem('role') == 'User'){
    this.router.navigate(['userChart']);
    }
    else{
      this.router.navigate(['sign-in']);
    }
  }
}
