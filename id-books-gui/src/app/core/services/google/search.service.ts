import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
@Injectable()
export class SearchService {
  constructor(private httpC: HttpClient, private http: Http) {}

  search(search: string) {
    return this.httpC.get(
      'https://www.googleapis.com/books/v1/volumes?q=' + search
    );

    console.log();
  }

  // searchById(id: string) {
  //   return this.http.get('https://www.googleapis.com/books/v1/volumes?q=id');

  //   console.log();
  // }

  SearchByISBN(isbn) {
    var encodedURI = encodeURI(
      'https://www.googleapis.com/books/v1/volumes?q=isbn:' +
        isbn +
        '&maxResults=1'
    );
    return this.http
      .get(encodedURI)
      .map((response: Response) => response.json());
  }
}