import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(payload: Object): Promise<Object> {
    return this.http.post(`${environment.apiPath}/login`, payload).toPromise();
  }

  signup(payload: Object): Promise<Object> {
    return this.http.post(`${environment.apiPath}/users`, payload).toPromise();
  }

  getTodos(): Promise<Object> {
    return this.http.get(`${environment.apiPath}/todos`).toPromise();
  }

  createTodo(payload: Object): Promise<Object> {
    return this.http.post(`${environment.apiPath}/todos`, payload).toPromise();
  }

  deleteTodo(todo: string): Promise<Object> {
    return this.http.delete(`${environment.apiPath}/todos/${todo}`).toPromise();
  }

  completeTodo(todo: string): Promise<Object> {
    return this.http.put(`${environment.apiPath}/todos/${todo}`, {}).toPromise();
  }
}
