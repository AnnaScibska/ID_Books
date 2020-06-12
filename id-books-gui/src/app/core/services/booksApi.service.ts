import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiBook } from '../models/ApiBook';
import { GoogleBook } from '../models/GoogleBook';

@Injectable({
  providedIn: 'root',
})
export class BooksApiService {
  authToken: any;
  book: ApiBook;

  url = 'http://localhost:5000';

  constructor(private httpClient: HttpClient) {}

  saveBook(book: GoogleBook) {
    const apiBook = this.adaptApiBookFromGoogleBook(book);
    let headers = new HttpHeaders();
    this.loadToken();
    headers = headers.append('x-auth-token', this.authToken);
    headers = headers.append('Content-Type', 'application/json');
    const httpOptions = { headers };
    return this.httpClient
      .post<any>(this.url + '/api/books', apiBook, httpOptions)
      .pipe();
  }

  getBooks() {
    let headers = new HttpHeaders();
    this.loadToken();
    headers = headers.append('x-auth-token', this.authToken);
    headers = headers.append('Content-Type', 'application/json');
    const httpOptions = { headers };

    return this.httpClient
      .get<any>(this.url + '/api/books', httpOptions)
      .pipe();
  }

  adaptApiBookFromGoogleBook(book: GoogleBook): ApiBook {
    const apiBook = new ApiBook();
    apiBook.title = book.volumeInfo.title;
    apiBook.author = book.volumeInfo.authors[0];
    apiBook.year = book.volumeInfo.publishedDate;
    apiBook.isbn = book.volumeInfo.industryIdentifiers.identifier;
    apiBook.description = book.volumeInfo.description;
    apiBook.imageUrl = book.volumeInfo.imageLinks.thumbnail;
    apiBook.comment = 'try';
    return apiBook;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
