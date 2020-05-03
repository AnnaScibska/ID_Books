import { Component, OnInit } from '@angular/core';
import { Book } from '../../../core/models/book';
import { BooksService } from '../../../core/services/books.service';
import { PageEvent } from '@angular/material/paginator';
import { SearchService } from '../../../core/services/search.service';
import { FavouriteService } from '../../../core/services/favourite.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit {
  books: Book[];
  pageNumber = 0;
  per_page: number;
  total: number;

  LocalStorage = localStorage;
  json = JSON;
  booksList: Book[] = [];
  searchString = '';
  constructor(
    private booksService: BooksService,
    private searchService: SearchService,
    private favouriteService: FavouriteService
  ) {}

  ngOnInit(): void {
    this.booksService.getBooks(this.pageNumber).subscribe((result: Book[]) => {
      // TODO: fix ts-lit
      this.books = result['data'];
      this.per_page = result['per_page'];
      this.total = result['total'];
      //
      this.search();
    });
  }

  search() {
    this.searchService.search(this.searchString).subscribe((res: Book[]) => {
      this.booksList = res['items'];
      this.searchString = '';
      console.log(this.booksList);
    });
  }

  addToFavourite(book: Book[]) {
    this.favouriteService.addToFavourite(book);
  }

  updateUsersList(page: PageEvent) {
    this.booksService.getBooks(page.pageIndex).subscribe((result: Book[]) => {
      // TODO: fix ts-lit
      this.books = result['data'];
      return this.books;
    });
  }
}
