import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Button } from '../../../sharedComponents/button/button';
import { ApiService } from '../../../services/api.service';
import { NotificationService } from '../../../services/notification.service';


@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, Button, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  buttonData = {
    value: 'Log In',
    type: 'secondary'
  };

  username = '';
  password = '';

  constructor(
    private router: Router, 
    private apiService: ApiService,
    private notify: NotificationService
  ) { }

  public handleButtonClick(event: any) {
    if (!this.username || !this.password) {
      this.notify.info('Please fill in both email and password.');
      return;
    }

    const payload = {
      username: this.username,
      password: this.password
    };

    this.apiService.login(payload).subscribe({
      next: (res) => {
        if (res && res.data && res.data.token) {
          localStorage.setItem('token', res.data.token);
          if (res.data.userId) localStorage.setItem('userId', res.data.userId);
          if (res.data.name) localStorage.setItem('name', res.data.name);
          this.router.navigate(['/admin']);
        }
      },
      error: (err) => {
        this.notify.error(err.error.message);
      }
    });
  }
}
