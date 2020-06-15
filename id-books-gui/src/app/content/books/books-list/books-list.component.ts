import { Component, OnInit } from '@angular/core';
import { GoogleBook } from '../../../core/models/GoogleBook';
import { PageEvent } from '@angular/material/paginator';
import { GoogleSearchService } from '../../../core/services/googleSearch.service';
import { MatDialog } from '@angular/material/dialog';
import { BooksApiService } from '../../../core/services/booksApi.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit {
  perPage: 10;
  total: number;
  booksList: GoogleBook[] = [];
  searchString = '';
  note = '';
  currentSearch = '';

  constructor(
    private searchService: GoogleSearchService,
    private booksApiService: BooksApiService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  search() {
    this.searchService
      .search(this.searchString, 0)
      .subscribe((res: GoogleBook[]) => {
        this.booksList = res['items'];
        this.currentSearch = this.searchString;
        this.searchString = '';
        this.note = '';
        this.total = res['totalItems'];
      });
  }

  addToFavourite(book: GoogleBook) {
    this.booksApiService.saveBook(book).subscribe((response) => {
      this.snackBar.open('Book added to favourites', 'Close');
    });
  }

  updateBooksList(page: PageEvent) {
    this.searchService
      .search(this.currentSearch, page.pageIndex)
      .subscribe((res: GoogleBook[]) => {
        this.booksList = res['items'];
      });
  }
}
