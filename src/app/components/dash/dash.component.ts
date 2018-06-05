import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (!localStorage.getItem('token')) this.router.navigate(['/login']);
  }

}
