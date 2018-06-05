import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: HTMLFormElement;
  loggingIn: boolean;
  failed: boolean;
  errorMessage: string;

  constructor(private api: ApiService,
              private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.loginForm = document.forms['loginForm'];
  }

  login(): void {
    this.loggingIn = true;
    const username = this.loginForm.username.value;
    const password = this.loginForm.password.value;

    const body = {
      username: username,
      password: password
    }

    this.api.login(body)
      .then(response => {
        localStorage.setItem('token', response['token']);
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.errorMessage = error.error.message;
        this.failed = true;
      })
      .then(() => this.loggingIn = false);
  }

}
