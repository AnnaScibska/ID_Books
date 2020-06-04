import { Component, OnInit } from '@angular/core';
import { Book } from '../../../core/models/book';
import { BooksService } from '../../../core/services/books.service';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../../core/services/search.service';
@Component({
  selector: 'app-details-book',
  templateUrl: './details-book.component.html',
  styleUrls: ['./details-book.component.css'],
})
export class DetailsBookComponent implements OnInit {
  book;

  constructor(
    private userService: BooksService,
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    let isbn = this.activatedRoute.snapshot.params['isbn'];

    this.searchService.SearchByISBN(isbn).subscribe((data) => {
      console.log(data);
      console.log('heeeeeeeeeerrrrrrreeeeeee', data.items);
      this.book = data.items[0];
    });
  }
}
