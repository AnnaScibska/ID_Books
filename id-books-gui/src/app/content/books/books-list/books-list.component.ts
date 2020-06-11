import { Component, OnInit } from '@angular/core';
import { Book } from '../../../core/models/book';
import { BooksService } from '../../../core/services/google/books.service';
import { PageEvent } from '@angular/material/paginator';
import { SearchService } from '../../../core/services/google/search.service';
import { FavouriteService } from '../../../core/services/google/favourite.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailsBookComponent } from '../details-book/details-book.component';
import { ActivatedRoute } from '@angular/router';

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
    private favouriteService: FavouriteService,
    public dialog: MatDialog
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

  openDialog(book: Book[]): void {
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
  books: Book[];
  booksList: Book[] = [];
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
