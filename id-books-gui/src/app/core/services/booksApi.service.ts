import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiBook } from '../models/ApiBook';
import { GoogleBook } from '../models/GoogleBook';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BooksApiService {
  authToken: any;
  book: ApiBook;
  url = environment.baseUrl;
  books: any;
  note = '';

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

  deleteBook(id: string) {
    let headers = new HttpHeaders();
    this.loadToken();
    headers = headers.append('x-auth-token', this.authToken);
    headers = headers.append('Content-Type', 'application/json');
    const httpOptions = { headers };
    return this.httpClient
      .delete<any>(this.url + `/api/books/${id}`, httpOptions)
      .pipe();
  }

  getBooks() {
    let headers = new HttpHeaders();
    this.loadToken();
    headers = headers.append('x-auth-token', this.authToken);
    headers = headers.append('Content-Type', 'application/json');
    const httpOptions = { headers };

    this.books = this.httpClient
      .get<any>(this.url + '/api/books', httpOptions)
      .pipe();
    console.log('get bookSSSS', this.books);

    return this.books;
  }

  updateBook(bookId: string, comment: string) {
    let headers = new HttpHeaders();
    this.loadToken();
    headers = headers.append('x-auth-token', this.authToken);
    headers = headers.append('Content-Type', 'application/json');
    const httpOptions = { headers };
    this.books = this.httpClient
      .put<any>(this.url + `/api/books/${bookId}`, { comment }, httpOptions)
      .pipe();
    console.log('book update', this.books);

    return this.books;
  }

  adaptApiBookFromGoogleBook(book: GoogleBook): ApiBook {
    const apiBook = new ApiBook();
    apiBook.title = book.volumeInfo.title;
    apiBook.author = book.volumeInfo.authors[0];
    apiBook.year = book.volumeInfo.publishedDate;
    apiBook.isbn = book.volumeInfo.industryIdentifiers.identifier;
    apiBook.description = book.volumeInfo.description;
    apiBook.imageUrl = book.volumeInfo.imageLinks.thumbnail;
    apiBook.comment = this.note;
    return apiBook;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
