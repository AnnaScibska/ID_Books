import { Component, OnInit } from '@angular/core';
import { Book } from '../../../core/models/book';
import { BooksService } from '../../../core/services/google/books.service';
import { ActivatedRoute } from '@angular/router';
import { FavouriteService } from '../../../core/services/google/favourite.service';

@Component({
  selector: 'app-show-book',
  templateUrl: './show-book.component.html',
  styleUrls: ['./show-book.component.css'],
})
export class ShowBookComponent implements OnInit {
  book: Book;
  bookId: number;
  ///////
  favouriteBooks: Book[] = [];

  books: Book[];
  pageNumber = 0;
  per_page: number;
  total: number;

  LocalStorage = localStorage;
  json = JSON;
  booksList: Book[] = [];
  searchString = '';

  constructor(
    private userService: BooksService,
    private activatedRoute: ActivatedRoute,
    private favouriteService: FavouriteService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.bookId = Number(params.get('bookId'));
    });
    this.userService.getBook(this.bookId).subscribe((result: Book) => {
      // TODO: fix ts-lint
      this.book = result['data'];
    });

    for (let i = 0; i < localStorage.length; i++) {
      this.favouriteBooks.push(
        JSON.parse(localStorage.getItem(localStorage.key(i)))
      );
    }
  }

  deleteFromFavourite(book) {
    this.favouriteService.deleteFromFavourite(book);
    this.favouriteBooks = this.favouriteService.getFavouriteBooks();
  }
}
