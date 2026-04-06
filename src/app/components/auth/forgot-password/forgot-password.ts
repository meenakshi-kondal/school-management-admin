import { Component } from '@angular/core';
import { Form } from '../../../sharedComponents/form/form';
import { FORM } from '../../../interfaces/common';
import { NotificationService } from '../../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [Form],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss'
})
export class ForgotPassword {
  forgotPasswordConfig: FORM = {
    sections: [
      {
        fields: [
          {
            key: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Enter your email',
            colSpan: 4,
            required: true
          }
        ]
      }
    ],
    submitButton: {
      value: 'Send',
      type: 'primary'
    }
  };

  constructor(
    private notify: NotificationService,
    private router: Router
  ) { }

  handleFormSubmit(formData: any) {
    this.notify.success('Password reset link sent to your email.');
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
