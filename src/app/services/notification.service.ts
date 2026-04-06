import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export type NotificationType = 'success' | 'error' | 'info';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  
  config: MatSnackBarConfig = {
    duration: 1000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  };
  constructor(private snackBar: MatSnackBar) { }

  success(message: string) {
    this.snackBar.open(message, '', {
      ...this.config,
      panelClass: ['notification', 'success']
    });
  }

  error(message: string) {
    this.snackBar.open(message, '', {
      ...this.config,
      panelClass: ['notification', 'error']
    });
  }

  info(message: string) {
    this.snackBar.open(message, '', {
      ...this.config,
      panelClass: ['notification', 'info']
    });
  }


}
