import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  loggedIn()
  {
    return tokenNotExpired('id_token');
  }

  registerUser(user)
  {
    const headers = new Headers();
    headers.append('Content-type', 'application/json' );
    return this.http.post('http://localhost:5000/api/users', user, { headers })
      .pipe(map(res => res.json()));
  }

  authenticateUser(user)
  {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:5000/api/auth', user, {headers})
      .pipe(map(res => res.json()));
  }

  storeUserData(token, user)
  {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken()
  {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logOut()
  {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
