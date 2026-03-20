import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export type NotificationType = 'success' | 'error' | 'info';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  
  config: MatSnackBarConfig = {
    duration: 90000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  };
  constructor(private snackBar: MatSnackBar) { }

  success(message: string) {
    this.config.panelClass = ['notification', 'success'];
    this.snackBar.open(message, '', this.config);
  }

  error(message: string) {
    this.config.panelClass = ['notification', 'error'];
    this.snackBar.open(message, '', this.config);
  }

  info(message: string) {
    this.config.panelClass = ['notification', 'info'];
    this.snackBar.open(message, '', this.config);
  }

}
