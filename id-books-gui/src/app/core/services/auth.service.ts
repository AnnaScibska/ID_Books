import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import { AuthResponse } from '../models/AuthResponse';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  avatar = '';

  private avatarSubject = new Subject<string>();
  avatarObservable = this.avatarSubject.asObservable();

  url = 'http://localhost:5000'

  constructor(private httpClient: HttpClient) { }

  loggedIn()
  {
    return tokenNotExpired('id_token');
  }

  registerUser(user)
  {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json' );
    return this.httpClient.post<AuthResponse>(this.url + '/api/users', user, { headers })
      .pipe();
  }

  authenticateUser(user)
  {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.httpClient.post<AuthResponse>(this.url + '/api/auth', user, {headers})
      .pipe();
  }

  storeUserData(token, user)
  {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user_avatar', user.avatar);
    this.authToken = token;
    this.user = user;
    this.avatar = user.avatar;
    this.avatarSubject.next(this.avatar);
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
    this.avatar = null;
    localStorage.clear();
  }
}
