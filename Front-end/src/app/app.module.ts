import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { SipnUpComponent } from './sipn-up/sipn-up.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './invoice/list/list.component';
import { AddComponent } from './invoice/add/add.component';
import { EditComponent } from './invoice/edit/edit.component';
import { UserBarComponent } from './user-bar/user-bar.component';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { Adminbar1Component } from './adminbar1/adminbar1.component';
import { Adminbar2Component } from './adminbar2/adminbar2.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    SipnUpComponent,
    NavbarComponent,
    LoginComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    UserBarComponent,
    Adminbar1Component,
    Adminbar2Component,
    AdminListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [ThemeService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
