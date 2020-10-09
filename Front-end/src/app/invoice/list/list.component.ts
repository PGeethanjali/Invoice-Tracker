import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../models/user.model";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  invoices: User[];
  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if(!window.localStorage.getItem('token')) {
      this.router.navigate(['sign-in']);
      return;
    }
    this.apiService.getlist(window.localStorage.getItem('user_id'))
      .subscribe( data => {
        this.invoices = data.result;
      });
  }
  deleteinvoice(invoice: User): void {
    this.apiService.deleteinvoice(invoice.invoice_id)
      .subscribe( data => {
        this.invoices = this.invoices.filter(u => u !== invoice);
      })
  };

  editinvoice(invoice: User): void {
    window.localStorage.removeItem("editInvoiceId");
    window.localStorage.setItem("editInvoiceId", invoice.invoice_id.toString());
    this.router.navigate(['edit']);
  };

  addinvoice(): void {
    this.router.navigate(['add']);
  };
}


