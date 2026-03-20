import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    // User is logged in
    return true;
  } else {
    // User is not logged in, redirect to login page
    router.navigate(['/login']);
    return false;
  }
};
