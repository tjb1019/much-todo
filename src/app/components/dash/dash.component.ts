import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Todo } from '@models/todo.model';

import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {

  todos: Todo[];
  selectedTodos: Todo[];
  filters = ['All', 'Active', 'Completed'];
  activeFilter: string;

  constructor(private router: Router,
              private api: ApiService) { }

  ngOnInit() {
    if (!localStorage.getItem('token')) this.router.navigate(['/login']); // improve

    this.activeFilter = this.filters[0];
    this.api.getTodos()
      .then(response => {
        this.todos = response['todos'];
        this.selectedTodos = this.todos;
      })
      .catch(response => console.error(response.error.message));
  }

  ngAfterViewInit() {
    this.initTodoInput();
  }

  initTodoInput(): void {
    const newTodo = <HTMLInputElement>document.getElementById('newTodo');
    newTodo.addEventListener('keyup', event => {
      if (event.key === 'Enter') {
        const todo = { description: newTodo.value, active: true };
        if (!this.todos.includes(todo)) {
          newTodo.value = null;
          this.todos.push(todo);
          this.selectedTodos = this.todos;
          this.api.createTodo({todo: todo})
            .then(response => console.log('saved todo to mongodb'))
            .catch(response => console.error('failed to save todo to mongodb'));
        } else {
          console.error('TODO already exists');
        }
      }
    });
  }

  deleteTodo(todo: Todo): void {
    const index = this.todos.indexOf(todo);
    this.todos[index].active = false;
    this.todos = this.todos.filter(todo => todo.active); // change this - not sure how to yet

    this.api.deleteTodo(todo.description)
      .then(response => console.log('backend was able to delete todo from mongo'))
      .catch(response => console.error(response.error.message));
  }

  activateFilter(filter: string): void {
    this.activeFilter = filter;
    if (filter == 'All') {
      this.selectedTodos = this.todos;
    } else if (filter == 'Active') {
      this.selectedTodos = this.todos.filter(todo => todo.active);
    } else if (filter == 'Completed') {
      this.selectedTodos = this.todos.filter(todo => !todo.active);
    }
  }

}
