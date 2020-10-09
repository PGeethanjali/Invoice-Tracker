import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import {SipnUpComponent} from './sipn-up/sipn-up.component';
import {LoginComponent} from './login/login.component';
import {ListComponent} from './invoice/list/list.component';
import{AddComponent} from './invoice/add/add.component';
import {EditComponent} from './invoice/edit/edit.component';

const routes: Routes = [
  {path:  '', component : SignInComponent },
  {path:  'home', component : HomeComponent },
  {path:'sign-up', component: SipnUpComponent},
  {path:'sign-in', component : SignInComponent },
  {path: 'login', component: LoginComponent},
  {path:'list', component:ListComponent},
  {path:'add', component:AddComponent},
  {path: 'edit', component:EditComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
