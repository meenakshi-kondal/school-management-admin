import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {

  activeModule: {name: string, icon: string} | null = null;
  adminName: string = 'Admin';
  moduleList = [
      { name: 'Dashboard', path: '/admin', icon: 'fa-gauge' },
      { name: 'Teachers', path: '/admin/teachers', icon: 'fa-chalkboard-user' },
      { name: 'Students', path: '/admin/students', icon: 'fa-users' },
      { name: 'Classes', path: '/admin/classes', icon: 'fa-school' },
      { name: 'Admission', path: '/admin/admission', icon: 'fa-book' },
  ];

  notices: any[] = [];
  unreadCount: number = 0;
  isNoticeOpen: boolean = false;
  isAddingNotice: boolean = false;
  newNotice = { title: '', description: '' };
  currentUserId: string | null = null;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private notify: NotificationService
  ) {}

  ngOnInit() {
    this.currentUserId = localStorage.getItem('userId');
    const storedName = localStorage.getItem('name');
    if (storedName) this.adminName = storedName;

    this.updateActiveModule(this.router.url);

  
  }

  updateActiveModule(url: string) {
    const urlWithoutQuery = url.split('?')[0];
    
    // Best match wins (longest path match)
    let matchedModule = this.moduleList[0];
    let maxMatchLen = -1;
    
    for (const mod of this.moduleList) {
        if (urlWithoutQuery === mod.path || urlWithoutQuery.startsWith(mod.path + '/')) {
            if (mod.path.length > maxMatchLen) {
                maxMatchLen = mod.path.length;
                matchedModule = mod;
            }
        }
    }
    
    this.activeModule = matchedModule;
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    this.router.navigate(['/login']);
  }
}
