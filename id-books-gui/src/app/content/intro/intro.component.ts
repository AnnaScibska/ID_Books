import { Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import {ValidateService} from '../../core/services/validate.service';

export interface DialogData {
  email: string;
  password: string;
}

export interface DialogDataSignUp {
  name: string;
  email: string;
  password: string;
}

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
    const dialogRef = this.dialog.open(LoginDialog, {
      width: '350px',
      height: '280px',
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
    const dialogRef = this.dialog.open(SignupDialog, {
      width: '350px',
      height: '350px',
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

@Component({
  selector: 'login-dialog',
  templateUrl: 'login-dialog.html',
})
export class LoginDialog {

  constructor(
    public dialogRef: MatDialogRef<LoginDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData

  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'signup-dialog',
  templateUrl: 'signup-dialog.html',
})
export class SignupDialog {

  constructor(
    public dialogRef: MatDialogRef<SignupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataSignUp

  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
