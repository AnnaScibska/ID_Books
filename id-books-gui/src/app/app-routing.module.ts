import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './content/intro/intro.component';
import { NotFoundComponent } from './content/not-found/not-found.component';
import { BooksListComponent } from './content/books/books-list/books-list.component';
import { ShowBookComponent } from './content/books/show-book/show-book.component';

const routes: Routes = [
  {
    path: 'intro',
    component: IntroComponent,
  },
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full',
  },
  {
    path: 'books',
    component: BooksListComponent,
  },
  {
    path: 'books/:bookId',
    component: ShowBookComponent,
  },
  {
    path: 'favoris',
    component: ShowBookComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
