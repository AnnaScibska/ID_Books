import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../core/services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string;
  email: string;
  password: string;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private authService: AuthService) { }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    };
    if (!this.validateService.validateRegister(user))
    {
      this.flashMessage.show('Please fill in all details', {cssClass: 'alert alert-danger', timeout: 3000});
      return false;
    }
    if (!this.validateService.validateEmail(user.email))
    {
      this.flashMessage.show('Please enter valid email', {cssClass: 'alert alert-danger', timeout: 3000});
      return false;
    }
    this.authService.registerUser(user).subscribe(data => {
      if (data.token)
      {
        this.flashMessage.show('You are now registered and can login', {cssClass: 'alert alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      }
      else
      {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });

  }

  ngOnInit(): void {
  }

}
