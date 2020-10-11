import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if(!window.localStorage.getItem('token')) {
      this.router.navigate(['sign-in']);
      return;
    }
    else if(window.localStorage.getItem('token') && window.localStorage.getItem('role') != "Admin"){
      this.router.navigate(['sign-in']);
      return;
    }
  }

}
