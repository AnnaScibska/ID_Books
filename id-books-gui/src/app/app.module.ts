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
import {
  BooksListComponent,
  DetailsDialComponent,
} from './content/books/books-list/books-list.component';
import { ShowBookComponent } from './content/books/show-book/show-book.component';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './authorization/register/register.component';
import { LoginComponent } from './authorization/login/login.component';
import {
  FlashMessagesModule,
  FlashMessagesService,
} from 'angular2-flash-messages';
import { ValidateService } from './core/services/validate.service';
import { AuthService } from './core/services/auth.service';
import { HttpModule } from '@angular/http';
import { FavouriteService } from './core/services/favourite.service';
import { SearchService } from './core/services/search.service';
import { BooksService } from './core/services/books.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DetailsBookComponent } from './content/books/details-book/details-book.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    IntroComponent,
    NotFoundComponent,
    BooksListComponent,
    ShowBookComponent,
    RegisterComponent,
    LoginComponent,
    DetailsDialComponent,
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
    MatInputModule,
    FormsModule,
    HttpModule,
    FormsModule,
    FlashMessagesModule,
    HttpModule,
    MatDialogModule,
  ],
  // entryComponents: [BooksListComponent, DetailsBookComponent],
  // declarations: [BooksListComponent, DetailsBookComponent],
  // bootstrap: [BooksListComponent],
  providers: [
    ValidateService,
    FlashMessagesService,
    AuthService,
    FavouriteService,
    SearchService,
    BooksService,
    // {
    //   provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    //   useValue: { appearance: 'fill' },
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch((err) => console.error(err));
