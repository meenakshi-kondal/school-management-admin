import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Homepage } from './components/homepage/homepage';
import { Dashboard } from './components/dashboard/dashboard';
import { Teachers } from './components/teachers/teachers';
import { Classes } from './components/classes/classes';
import { Students } from './components/students/students';
import { Admission } from './components/admission/admission';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    {
        path: 'admin',
        component: Homepage,
        children: [
            { path: '', component: Dashboard },
            { path: 'teachers', component: Teachers },
            { path: 'classes', component: Classes },
            { path: 'students', component: Students },
            { path: 'admission', component: Admission },
        ]
    }
];
