import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ValidateService } from '../../core/services/google/validate.service';
import { LoginDialogComponent } from '../../authorization/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../../authorization/register-dialog/register-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessageService } from '../../core/services/google/error-message.service';

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
    private validateService: ValidateService,
    private snackBar: MatSnackBar,
    private errorMessageService: ErrorMessageService
    ) {}

  openDialogLogIn(): void {

    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '350px',
      height: '260px',
      data: {email: this.email, password: this.password}
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
      data: {name: this.name, email: this.email, password: this.password}
    });

    this.visibility = 'hidden';

    dialogRef.afterClosed().subscribe(result => {
      this.signUpData = result;
      this.visibility = 'visible';
      if (result) {
        const success = this.onRegisterSubmit();
        if (!success) {
          this.openDialogSignUp();
        }
      }
    });
  }

  onLoginSubmit() {

    const user = {
      email: this.loginData[0],
      password: this.loginData[1],
      avatar: ''
    };

    this.authService.authenticateUser(user).subscribe({
      next: data => {
        if (data.token)
        {
          user.avatar  = data.avatar;
          this.authService.storeUserData(data.token, user);
          this.snackBar.open('You are now logged in', 'Close');
          this.router.navigate(['/books']).then();
        }
      },
      error: err => {
        this.errorMessageService.displayError(err)
        this.openDialogLogIn();
      }
    });
  }

  onRegisterSubmit(): boolean {

    const user = {
      name: this.signUpData[0],
      email: this.signUpData[1],
      password: this.signUpData[2]
    };

    if (!this.validateService.validateRegister(user))
    {
      this.snackBar.open('Please fill in all details', 'Close');
      return false;
    }
    if (!this.validateService.validateEmail(user.email))
    {
      this.snackBar.open('Please enter valid email', 'Close');
      return false;
    }
    this.authService.registerUser(user).subscribe({
      next: data => {
        console.log(data);
        if (data.token)
        {
          this.snackBar.open('You are now registered and can login', 'Close');
          this.openDialogLogIn();
        }
      },
      error: err => {
        this.errorMessageService.displayError(err);
        this.openDialogSignUp();
      }
    });
    return true;
  }

}
