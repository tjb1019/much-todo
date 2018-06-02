import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(body: any): Promise<Object> {
    return this.http.post(`${environment.apiPath}/login`, body).toPromise();
  }

  signup(body: any): Promise<Object> {
    return this.http.post(`${environment.apiPath}/users`, body).toPromise();
  }
}
