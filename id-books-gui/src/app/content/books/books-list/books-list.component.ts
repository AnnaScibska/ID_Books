import { Component, OnInit } from '@angular/core';
import { Book } from '../../../core/models/book';
import { BooksService } from '../../../core/services/books.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  books: Book[];
  pageNumber = 0;
  per_page: number;
  total: number;

  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
    this.booksService.getBooks(this.pageNumber).subscribe( (result: Book[]) => {
      // TODO: fix ts-lit
      this.books = result['data'];
      this.per_page = result['per_page'];
      this.total = result['total'];
    });
  }

  updateUsersList(page: PageEvent) {
    this.booksService.getBooks(page.pageIndex).subscribe( (result: Book[]) => {
      // TODO: fix ts-lit
      this.books = result['data'];
      return this.books;
    });
  }
}
