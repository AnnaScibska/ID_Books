import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivationEnd, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  isNavHidden: boolean;
  avatar = '';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Hide Navbar if the router is 'intro'
    this.router.events.subscribe( value => {
      if (value instanceof ActivationEnd) {
        if (value.snapshot.url[0]) {
          if (value.snapshot.url[0].path === '' || value.snapshot.url[0].path === 'intro') {
            this.isNavHidden = true;
          } else {
            this.isNavHidden = false;
          }
        }
      }
    });
    this.isNavHidden = false;
    this.avatar = localStorage.getItem('user_avatar');
    this.authService.avatarObservable.subscribe((data) => {
      this.avatar = data;
    });
  }

  logOut() {
    this.authService.logOut();
    this.snackBar.open('You are now logged out', 'Close');
    this.router.navigate(['/intro']);
  }

}
