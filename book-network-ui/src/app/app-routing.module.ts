import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {ActivateAccountComponent} from "./pages/activate-account/activate-account.component";
import {authGuard} from "./services/guard/auth.guard";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent // eager loading
  },
  {
    path: "register",
    component: RegisterComponent // eager loading
  },
  {
    path: "activate-account",
    component: ActivateAccountComponent // eager loading
  },
  {
    path: "books",
    loadChildren: () => import('./modules/book/book.module').then(m => m.BookModule), // lazy loading
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
