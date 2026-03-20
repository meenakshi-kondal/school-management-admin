import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Button } from '../../../sharedComponents/button/button';
import { ApiService } from '../../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, Button],
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
    private snackBar: MatSnackBar
  ) { }

  private showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  public handleButtonClick(event: any) {
    if (!this.username || !this.password) {
      this.showMessage('Please fill in both email and password.');
      return;
    }

    const payload = {
      username: this.username,
      password: this.password
    };

    this.apiService.login(payload).subscribe({
      next: (res) => {
        if (res && res.data && res.data.token) {
          // Store token in local storage
          localStorage.setItem('token', res.data.token);
          if (res.data.user_id) localStorage.setItem('user_id', res.data.user_id);
          if (res.data.name) localStorage.setItem('name', res.data.name);

          // Navigate to admin
          console.log('Login successful');
          this.router.navigate(['/admin']);
        }
      },
      error: (err) => {
        console.error('Login error', err);
        this.showMessage(err.error?.message || 'Login failed. Please check your credentials.');
      }
    });
  }
}
