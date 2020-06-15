import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavComponent } from './shared/main-nav/main-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { IntroComponent } from './content/intro/intro.component';
import { NotFoundComponent } from './content/not-found/not-found.component';
import { BooksListComponent } from './content/books/books-list/books-list.component';
import { FavouriteComponent } from './content/books/show-book/favourite.component';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MatButtonModule } from '@angular/material/button';
import { ValidateService } from './core/services/validate.service';
import { AuthService } from './core/services/auth.service';
import { GoogleSearchService } from './core/services/googleSearch.service';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { LoginDialogComponent } from './authorization/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './authorization/register-dialog/register-dialog.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorMessageService } from './core/services/error-message.service';
import { DetailsBookComponent } from './content/books/details-book/details-book.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    IntroComponent,
    NotFoundComponent,
    BooksListComponent,
    FavouriteComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    DetailsBookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    HttpClientModule,
    MatButtonModule,
    HttpModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [
    ValidateService,
    AuthService,
    GoogleSearchService,
    ErrorMessageService,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 7000, verticalPosition: 'top' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
