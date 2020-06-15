import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleSearchService } from '../../../core/services/googleSearch.service';
@Component({
  selector: 'app-details-book',
  templateUrl: './details-book.component.html',
  styleUrls: ['./details-book.component.css'],
})
export class DetailsBookComponent implements OnInit {
  book;

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: GoogleSearchService
  ) {}

  ngOnInit() {
    const isbn = this.activatedRoute.snapshot.params['isbn'];

    this.searchService.SearchByISBN(isbn).subscribe((data) => {
      this.book = data['items'][0];
    });
  }
}
