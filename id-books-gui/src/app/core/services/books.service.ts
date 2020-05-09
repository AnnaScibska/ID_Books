import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}

  getBooks(pageNumber: number): Observable<Book[]> {
    pageNumber++;
    const url = 'https://reqres.in/api/users?page=' + pageNumber;
    return this.http.get<Book[]>(url);
  }

  getBook(bookId: number): Observable<Book> {
    const url = 'https://reqres.in/api/books/' + bookId;
    return this.http.get<Book>(url);
  }
}
