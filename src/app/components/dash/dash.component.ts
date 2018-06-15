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
    if (!localStorage.getItem('token')) this.router.navigate(['/login']); // improve

    this.api.getTodos()
      .then(response => this.todos = response['todos'])
      .catch(response => console.error(response.error.message));
  }

  ngAfterViewInit() {
    this.initTodoInput();
  }

  initTodoInput(): void {
    const newTodo = <HTMLInputElement>document.getElementById('newTodo');
    newTodo.addEventListener('keyup', event => {
      if (event.key === 'Enter') {
        const todo = newTodo.value;
        if (!this.todos.includes(todo)) {
          newTodo.value = null;
          this.todos.push(todo);
          this.api.createTodo({todo: todo})
            .then(response => console.log('saved todo to mongodb'))
            .catch(response => console.error('failed to save todo to mongodb'));
        } else {
          console.error('TODO already exists');
        }
      }
    });
  }

  deleteTodo(todoText: string): void {
    this.todos = this.todos.filter(todo => todo != todoText);
    this.api.deleteTodo(todoText)
      .then(response => console.log('backend was able to delete todo from mongo'))
      .catch(response => console.error(response.error.message));
  }

}
