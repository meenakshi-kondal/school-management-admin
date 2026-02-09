import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from '../../../sharedComponents/button/button';


@Component({
  selector: 'app-login',
  imports: [FormsModule, Button],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  buttonData = {
    value: 'Log In',
    type: 'auth'
  };

  constructor(private router: Router) { }

  public handleButtonClick(event: any) {
    this.router.navigate(['/admin']);
  }
}
