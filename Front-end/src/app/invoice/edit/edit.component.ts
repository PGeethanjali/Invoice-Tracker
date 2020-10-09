import { Component, OnInit , Inject} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {User} from "../../models/user.model";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    let InvoiceId = window.localStorage.getItem("editInvoiceId");
    console.log(InvoiceId);
    if(!InvoiceId) {
      alert("Invalid action.")
      this.router.navigate(['list']);
      return;
    }
    this.editForm = this.formBuilder.group({
      invoice_id: ['', Validators.required],
      invoice_name: ['', Validators.required],
      invoice_date: ['', Validators.required],
      invoice_price: ['', Validators.required]
    });

    this.apiService.getuserinvoice(InvoiceId)
      .subscribe( data => {
        console.log(data.result);
        this.editForm.setValue(data.result[0]);
      });
  }

  onSubmit() {
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


