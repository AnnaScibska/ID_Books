import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './content/intro/intro.component';
import { NotFoundComponent } from './content/not-found/not-found.component';
import { BooksListComponent } from './content/books/books-list/books-list.component';
import { ShowBookComponent } from './content/books/show-book/show-book.component';
import { DetailsBookComponent } from './content/books/details-book/details-book.component';
import { AuthGuard } from './core/guards/auth.guard';

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

    canActivate: [AuthGuard],
  },
  {
    path: 'books/:isbn',
    component: DetailsBookComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'favoris',
    component: ShowBookComponent,
    canActivate: [AuthGuard],
  },

  {
    path: '**',
    component: NotFoundComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
