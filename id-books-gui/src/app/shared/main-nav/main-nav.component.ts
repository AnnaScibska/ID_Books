import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivationEnd, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  isNavHidden: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {}

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
  }

}
