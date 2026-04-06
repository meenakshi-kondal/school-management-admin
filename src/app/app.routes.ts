import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { ForgotPassword } from './components/auth/forgot-password/forgot-password';
import { Homepage } from './components/homepage/homepage';
import { Dashboard } from './components/dashboard/dashboard';
import { Teachers } from './components/teachers/teachers';
import { Classes } from './components/classes/classes';
import { Students } from './components/students/students';
import { Admission } from './components/admission/admission';
import { Timetable } from './components/timetable/timetable';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'forgot-password', component: ForgotPassword },
    {
        path: 'admin',
        component: Homepage,
        canActivate: [authGuard],
        children: [
            { path: '', component: Dashboard },
            { path: 'teachers', component: Teachers },
            { path: 'classes', component: Classes },
            { path: 'students', component: Students },
            { path: 'admission', component: Admission },
            { path: 'timetable', component: Timetable },
        ]
    }
];
