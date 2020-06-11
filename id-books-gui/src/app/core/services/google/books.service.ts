import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleBook } from '../../models/GoogleBook';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}

  getBooks(pageNumber: number): Observable<GoogleBook[]> {
    pageNumber++;
    const url = 'https://reqres.in/api/users?page=' + pageNumber;
    return this.http.get<GoogleBook[]>(url);
  }

  getBook(bookId: number): Observable<GoogleBook> {
    const url = 'https://reqres.in/api/books/' + bookId;
    return this.http.get<GoogleBook>(url);
  }
}
