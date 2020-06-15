import { Component, OnInit } from '@angular/core';
import { GoogleBook } from '../../../core/models/GoogleBook';
import { BooksService } from '../../../core/services/google/books.service';
import { SearchService } from '../../../core/services/google/search.service';
import { ActivatedRoute } from '@angular/router';
import { FavouriteService } from '../../../core/services/google/favourite.service';
import { BooksApiService } from '../../../core/services/booksApi.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiBook } from '../../../core/models/ApiBook';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-show-book',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css'],
})
export class FavouriteComponent implements OnInit {
  book: GoogleBook;
  bookId: number;
  ///////
  // favouriteBooks: GoogleBook[] = [];

  books: GoogleBook[];

  LocalStorage = localStorage;
  json = JSON;
  booksList: GoogleBook[] = [];
  searchString = '';
  favouriteBooks: ApiBook[] = [];
  note = '';

  constructor(
    private userService: BooksService,
    private activatedRoute: ActivatedRoute,
    private favouriteService: FavouriteService,
    private booksService: BooksService,
    private searchService: SearchService,
    private booksApiService: BooksApiService,
    private apiBookService: BooksApiService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.apiBookService.getBooks().subscribe((response) => {
      console.log('getbooks', response);
      this.favouriteBooks = response;

    });
  }

  deleteBook(bookId: string) {
    this.apiBookService.deleteBook(bookId).subscribe(response => {
      this.getBooks();
      this.snackBar.open('Book removed from favourites', 'Close');
    });
  }

  addNote(book: ApiBook) {
    book.edited = true;
  }

  updateBook(book: ApiBook, comment: string) {
    this.apiBookService.updateBook(book._id, comment).subscribe(response => {
      this.getBooks();
      this.snackBar.open('Book updated', 'Close');
    });
  }

}
