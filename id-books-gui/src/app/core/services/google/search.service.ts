import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
@Injectable()
export class SearchService {
  constructor(private httpClient: HttpClient, private http: Http) {}

  search(search: string, index: number) {
    index *= 10;
    index++;
    return this.httpClient.get(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=10&startIndex=${index}`
    );
  }

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
