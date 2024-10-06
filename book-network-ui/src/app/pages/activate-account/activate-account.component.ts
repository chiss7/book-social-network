import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent {
  message: string = '';
  isOkay: boolean = true;
  submitted: boolean = false; // to track if the user already submitted the activation code

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  private confirmAccount(token: string) {
    this.authService.confirm({
      token
    }).subscribe({
      next: () => {
        this.message = 'Your account has been successfully activated.\nNow you can proceed to login.';
        this.submitted = true;
        this.isOkay = true;
      },
      error: (err) => {
        this.message = 'Activation Token has expired or is invalid. A new token has been sent.';
        this.submitted = true;
        this.isOkay = false;
      }
    });
  }
}
