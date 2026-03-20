import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-sidebar',
	imports: [RouterModule],
	templateUrl: './sidebar.html',
	styleUrl: './sidebar.scss'
})
export class Sidebar {
	moduleList = [
		{ name: 'Dashboard', path: '/admin', icon: 'fa-gauge' },
		{ name: 'Teachers', path: '/admin/teachers', icon: 'fa-chalkboard-user' },
		{ name: 'Students', path: '/admin/students', icon: 'fa-users' },
		{ name: 'Classes', path: '/admin/classes', icon: 'fa-school' },
		{ name: 'Admission', path: '/admin/admission', icon: 'fa-book' },
	];
	isSidebarOpen: Boolean = true;

	public logout() {
		// logic for logut and redirect to login page
	}

	public toggleSidebar() {
		this.isSidebarOpen = !this.isSidebarOpen;
	}
}
