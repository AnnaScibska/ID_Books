import { Component, OnInit } from '@angular/core';
import { GoogleBook } from '../../../core/models/GoogleBook';
import { BooksService } from '../../../core/services/google/books.service';
import { SearchService } from '../../../core/services/google/search.service';
import { ActivatedRoute } from '@angular/router';
import { FavouriteService } from '../../../core/services/google/favourite.service';
import { BooksApiService } from '../../../core/services/booksApi.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiBook } from '../../../core/models/ApiBook';
@Component({
  selector: 'app-show-book',
  templateUrl: './show-book.component.html',
  styleUrls: ['./show-book.component.css'],
})
export class ShowBookComponent implements OnInit {
  book: GoogleBook;
  bookId: number;
  ///////
  favouriteBooks: GoogleBook[] = [];

  books: GoogleBook[];
  pageNumber = 0;
  per_page: number;
  total: number;

  LocalStorage = localStorage;
  json = JSON;
  booksList: GoogleBook[] = [];
  searchString = '';
  essai: ApiBook[] = [];
  note = '';

  constructor(
    private userService: BooksService,
    private activatedRoute: ActivatedRoute,
    private favouriteService: FavouriteService,
    private booksService: BooksService,
    private searchService: SearchService,
    private booksApiService: BooksApiService,
    private apiBookService: BooksApiService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.apiBookService.getBooks().subscribe((response) => {
      //this.apiBookService.adaptApiBookFromGoogleBook(book: GoogleBook);
      console.log('getbooks', response);
      this.essai = response;
    });

    // function notePerso() {
    //   let note = document.getElementById('note').value;
    //   alert(note);
    // }

    // ngOnInit() {
    //   this.apiBookService.getBooks().subscribe((res: ApiBook[]) => {
    //     //this.apiBookService.adaptApiBookFromGoogleBook(book: GoogleBook);
    //     console.log('getbooks', res);
    //     this.essai = res['apiBook'];
    //     console.log('this.essai', this.essai);
    //     return this.essai;
    //   });

    // this.activatedRoute.paramMap.subscribe((params) => {
    //   this.bookId = Number(params.get('bookId'));
    // });

    // this.userService.getBook(this.bookId).subscribe((result: GoogleBook) => {
    //   // TODO: fix ts-lint
    //   this.book = result['data'];
    // });

    //   for (let i = 0; i < localStorage.length; i++) {
    //     this.favouriteBooks.push(
    //       JSON.parse(localStorage.getItem(localStorage.key(i)))
    //     );
    //   }
  }

  delete() {
    //   this.apiBookService.deleteBook(book).subscribe((response) => {
    //     this.apiBookService.adaptApiBookFromGoogleBook(book);
    //     console.log('getbooks', response);
    //     this.essai = response;
    //   });
  }

  deleteFromFavourite(book) {
    //   this.favouriteService.deleteFromFavourite(book);
    //   this.favouriteBooks = this.favouriteService.getFavouriteBooks();
  }
}
