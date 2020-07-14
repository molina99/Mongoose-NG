import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {environment} from '../../environments/environment';
import {User} from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get(`${environment.API_URL}/getUsers`);
  }

  postUser(user: Object) {
    return this.http.post(`${environment.API_URL}/postUser`, user);
  }

  putUser(id: String, user: User) {
    return this.http.put(`${environment.API_URL}/putUser/:${id}`, user);
  }

  deleteUser(id: String) {
    return this.http.delete(`${environment.API_URL}/deleteUser/${id}`);
  }

  loginUser(user: Object) {
    return this.http.post(`${environment.API_URL}/login`, user)
  }
}
