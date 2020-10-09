import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private Service: ServiceService, private router: Router,route: ActivatedRoute) { }

  ngOnInit() {

  }
  gotolist(){
    this.router.navigate(['list']);
  }
  logout()
  { 
   window.localStorage.removeItem('token');
   window.localStorage.removeItem('user_id');
   this.router.navigate(['sign-in']);
    
  }
  gotograph(){
    this.router.navigate(['home']);
  }
}
