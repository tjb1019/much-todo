import { Component, OnInit } from '@angular/core';

import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: HTMLFormElement;
  loggingIn: boolean;
  success: boolean;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  ngOnViewInit() {
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
      .then(response => localStorage.setItem('token', response['token']))
      .catch(error => this.success = false)
      .then(() => this.loggingIn = false);
  }

}
