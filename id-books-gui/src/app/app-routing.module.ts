import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './content/intro/intro.component';
import { NotFoundComponent } from './content/not-found/not-found.component';
import { BooksListComponent } from './content/books/books-list/books-list.component';
import { ShowBookComponent } from './content/books/show-book/show-book.component';
// import { RegisterComponent } from './authorization/register/register.component';
// import { LoginComponent } from './authorization/login/login.component';
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

    canActivate: [AuthGuard]

  },
  {
    path: 'books/:bookId',
    component: ShowBookComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'register',
  //   component: RegisterComponent
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent
  //
  // },
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
