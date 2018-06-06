import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {

  todos: string[];

  constructor(private router: Router,
              private api: ApiService) { }

  ngOnInit() {
    if (!localStorage.getItem('token')) this.router.navigate(['/login']);

    this.api.getTodos()
      .then(response => this.todos = response['todos'])
      .catch(response => console.error(response.error.message));
  }

  ngAfterViewInit() {
    const newTodo = document.getElementById('newTodo');
    newTodo.addEventListener('keyup', event => {
      if (event.key === 'Enter') {
        const todo = event.target.value;
        event.target.value = null;
        this.todos.push(todo);
        this.api.createTodo({todo: todo})
          .then(response => console.log('saved todo to mongodb'))
          .catch(response => console.log('failed to save todo to mongodb'));
      }
    });
  }

}
