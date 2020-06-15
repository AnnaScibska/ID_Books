import { Component, OnInit } from '@angular/core';
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
  favouriteBooks: ApiBook[] = [];

  constructor(
    private booksApiService: BooksApiService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.booksApiService.getBooks().subscribe((response) => {
      this.favouriteBooks = response;
    });
  }

  deleteBook(bookId: string) {
    this.booksApiService.deleteBook(bookId).subscribe(response => {
      this.getBooks();
      this.snackBar.open('Book removed from favourites', 'Close');
    });
  }

  addNote(book: ApiBook) {
    book.edited = true;
  }

  updateBook(book: ApiBook, comment: string) {
    this.booksApiService.updateBook(book._id, comment).subscribe(response => {
      this.getBooks();
      this.snackBar.open('Book updated', 'Close');
    });
  }

}
