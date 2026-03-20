import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    // User is already logged in, redirect to admin
    router.navigate(['/admin']);
    return false;
  } else {
    // User is not logged in, allow them to view the guest page (e.g. login)
    return true;
  }
};
