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
		{ name: 'Dashboard', path: '/admin' },
		{ name: 'Teachers', path: '/admin/teachers' },
		{ name: 'Students', path: '/admin/students' },
		{ name: 'Classes ', path: '/admin/classes' },
		{ name: 'Admission', path: '//admin/admission' },
	];
	isSidebarOpen: Boolean = true;

	public logout() {
		// logic for logut and redirect to login page
	}

	public toggleSidebar() {
		this.isSidebarOpen = !this.isSidebarOpen;
	}
}
