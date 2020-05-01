import { Component, OnInit } from '@angular/core';
import { Book } from '../../../core/models/book';
import {BooksService} from '../../../core/services/books.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-show-book',
  templateUrl: './show-book.component.html',
  styleUrls: ['./show-book.component.css']
})
export class ShowBookComponent implements OnInit {

  book: Book;
  bookId: number;

  constructor(private userService: BooksService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( params => {
      this.bookId = Number(params.get('bookId'));
    });
    this.userService.getBook(this.bookId).subscribe( (result: Book) => {
      // TODO: fix ts-lint
      this.book = result['data'];
    });
  }

}
