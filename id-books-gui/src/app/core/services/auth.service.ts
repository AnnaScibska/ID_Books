import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

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
    return this.httpClient.post<ApiResponse>(this.url + '/api/users', user, { headers })
      .pipe();
  }

  authenticateUser(user)
  {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.httpClient.post<ApiResponse>(this.url + '/api/auth', user, {headers})
      .pipe();
  }

  storeUserData(token, user)
  {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));  // TODO: remove password
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
