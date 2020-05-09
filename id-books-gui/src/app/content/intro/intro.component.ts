import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../core/services/validate.service';
import { LoginDialogComponent } from '../../authorization/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../../authorization/register-dialog/register-dialog.component';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent {
  name: string;
  email: string;
  password: string;

  visibility = 'visible';

  loginData: number[];
  signUpData: number[];

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private validateService: ValidateService,
    ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '350px',
      height: '260px',
      data: {email: this.email, password: this.password},
      panelClass: 'custom-modalbox'
    });
    this.visibility = 'hidden';

    dialogRef.afterClosed().subscribe(result => {
      this.loginData = result;
      this.visibility = 'visible';
      if (result) {
        this.onLoginSubmit();
      }
    });
  }

  openDialogSignUp(): void {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '350px',
      height: '320px',
      data: {name: this.name, email: this.email, password: this.password},
      panelClass: 'custom-modalbox'
    });
    this.visibility = 'hidden';

    dialogRef.afterClosed().subscribe(result => {
      this.signUpData = result;
      this.visibility = 'visible';
      if (result) {
        const success = this.onRegisterSubmit(); // if false: reopen
        if (!success) {
          this.openDialogSignUp();
        }
      }
    });
  }

  onLoginSubmit() {
    const user = {
      email: this.loginData[0],
      password: this.loginData[1]
    };

    this.authService.authenticateUser(user).subscribe(data => {
      if (data.token)
      {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/books']);
      }
      else
      {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        // this.router.navigate(['/login']);
        this.openDialog();
      }
    });
  }

  onRegisterSubmit(): boolean {
    const user = {
      name: this.signUpData[0],
      email: this.signUpData[1],
      password: this.signUpData[2]
    };
    console.log(user);
    if (!this.validateService.validateRegister(user))
    {
      this.flashMessage.show('Please fill in all details', {cssClass: 'alert alert-danger', timeout: 3000});
      return false;
      // this.openDialogSignUp();
    }
    if (!this.validateService.validateEmail(user.email))
    {
      this.flashMessage.show('Please enter valid email', {cssClass: 'alert alert-danger', timeout: 3000});
      return false;
      // this.openDialogSignUp();
    }
    this.authService.registerUser(user).subscribe(data => {
      if (data.token)
      {
        this.flashMessage.show('You are now registered and can login', {cssClass: 'alert alert-success', timeout: 3000});
        // this.router.navigate(['/login']);
        this.openDialog();
      }
      else
      {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert alert-danger', timeout: 3000});
        // this.router.navigate(['/register']);
        // this.openDialogSignUp();
        // return false;
        // handle: errors: [{msg: "User already exists"}]
      }
    });
    return true;
  }

}
