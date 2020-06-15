import { Component, OnInit } from '@angular/core';
import { GoogleBook } from '../../../core/models/GoogleBook';
import { BooksService } from '../../../core/services/google/books.service';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../../core/services/google/search.service';
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
    const isbn = this.activatedRoute.snapshot.params['isbn'];

    this.searchService.SearchByISBN(isbn).subscribe((data) => {
      console.log(data);
      console.log('heeeeeeeeeerrrrrrreeeeeee', data);
      this.book = data['items'][0];
    });
  }
}
