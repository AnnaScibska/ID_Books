import { Injectable } from '@angular/core';
import { Book } from '../../core/models/book';

@Injectable()
export class FavouriteService {
  favouriteBooks: Book[] = [];

  constructor() {}

  addToFavourite(book: Book[]) {
    if (localStorage.getItem(book['id'])) {
      localStorage.removeItem(book['id']);
    } else {
      const data = {
        id: book['id'],
        title: book['volumeInfo']['title'],
        infoLink: book['volumeInfo']['infoLink'],
        categories: book['volumeInfo']['categories'],
        authors: book['volumeInfo']['authors'],
        previewLink: book['volumeInfo']['previewLink'],
      };
      localStorage.setItem(book['id'], JSON.stringify(data));
    }
  }

  deleteFromFavourite(book: Book[]) {
    localStorage.removeItem(book['id']);
    this.favouriteBooks = [];
    for (let i = 0; i < localStorage.length; i++) {
      this.favouriteBooks.push(
        JSON.parse(localStorage.getItem(localStorage.key(i)))
      );
    }
  }

  getFavouriteBooks() {
    return this.favouriteBooks;
  }
}
