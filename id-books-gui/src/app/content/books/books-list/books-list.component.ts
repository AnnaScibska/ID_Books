import { Component, OnInit } from '@angular/core';
import { GoogleBook } from '../../../core/models/GoogleBook';
import { BooksService } from '../../../core/services/google/books.service';
import { PageEvent } from '@angular/material/paginator';
import { SearchService } from '../../../core/services/google/search.service';
import { FavouriteService } from '../../../core/services/google/favourite.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BooksApiService } from '../../../core/services/booksApi.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit {
  books: GoogleBook[];
  index = 0;
  perPage: 10;
  total: number;

  LocalStorage = localStorage;
  json = JSON;
  booksList: GoogleBook[] = [];
  searchString = '';
  note = '';
  currentSearch = '';

  constructor(
    private booksService: BooksService,
    private searchService: SearchService,
    private favouriteService: FavouriteService,
    private booksApiService: BooksApiService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  setValue() {
    this.note = '';
  }

  search() {
    this.searchService
      .search(this.searchString, 0)
      .subscribe((res: GoogleBook[]) => {
        this.booksList = res['items'];
        this.currentSearch = this.searchString;
        this.searchString = '';
        this.note = '';
        console.log('fromBookList', this.booksList);
        console.log(this.booksList);
        // console.log(res);
        this.total = res['totalItems'];
      });
  }

  addToFavourite(book: GoogleBook) {
    // this.favouriteService.addToFavourite(book);
    this.booksApiService.saveBook(book).subscribe((response) => {
      this.setValue();
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

  openDialog(book: GoogleBook[]): void {
    const dialogRef = this.dialog.open(DetailsDialComponent);

    console.log('ok hhhhhhhhhhhhhhheeeeeeeeeeeeereeeeeeeeee');
    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'details-dial',
  templateUrl: 'details-dial.html',
})
export class DetailsDialComponent {
  book;
  books: GoogleBook[];
  booksList: GoogleBook[] = [];
  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // let isbn = this.route.snapshot.params['isbn'];
    // this.searchService.SearchByISBN(isbn).subscribe((data) => {
    //   console.log(data.items);
    //   this.book = data.items[0];
    // });
  }
}
