import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: HTMLFormElement;
  signingUp: boolean;
  failed: boolean;

  constructor(private api: ApiService,
              private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.signupForm = document.forms['signupForm'];
  }

  signup(): void {
    this.signingUp = true;
    const username = this.signupForm.username.value;
    const password = this.signupForm.password.value;

    const body = {
      username: username,
      password: password
    }

    this.api.signup(body)
      .then(response => {
        localStorage.setItem('token', response['token']);
        this.router.navigate(['/dash']);
      })
      .catch(error => this.failed = true)
      .then(() => this.signingUp = false);
  }

}
