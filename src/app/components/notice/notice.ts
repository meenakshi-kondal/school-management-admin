import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notice.html',
  styleUrl: './notice.scss'
})
export class Notice implements OnInit {

  notices: any[] = [];
  isAddingNotice: boolean = false;
  newNotice = { title: '', description: '' };
  currentUserId: string | null = null;

  constructor(
    private apiService: ApiService, 
    private notify: NotificationService
  ) {}

  ngOnInit() {
    this.currentUserId = localStorage.getItem('userId');
    this.fetchNotices();
  }

  fetchNotices() {
    this.apiService.getAllNotices().subscribe({
      next: (res) => {
        this.notices = res?.data || [];
      },
      error: (err) => {
      this.notify.error(err.error.message);
      }
    });
  }

  markAsRead(noticeId: string) {
    this.apiService.markNoticeAsRead(noticeId).subscribe({
      next: () => {
        this.fetchNotices();
      },
      error: (err) => {
        this.notify.error(err.error.message);
      }
    });
  }

  submitNotice() {
    if (!this.newNotice.title || !this.newNotice.description) {
      this.notify.error('Please fill all fields');
      return;
    }

    this.apiService.addNotice(this.newNotice).subscribe({
      next: () => {
        this.notify.success('Notice added successfully');
        this.newNotice = { title: '', description: '' };
        this.isAddingNotice = false;
        this.fetchNotices();
      },
      error: (err) => {
        this.notify.error(err.error.message);
      }
    });
  }

  deleteNotice(id: string) {
    if(confirm('Are you sure you want to delete this notice?')) {
      this.apiService.deleteNotice(id).subscribe({
        next: () => {
          this.notify.success('Notice deleted successfully');
          this.fetchNotices();
        },
        error: (err) => {
          this.notify.error(err.error.message);
        }
      });
    }
  }

  toggleAddForm() {
    this.isAddingNotice = !this.isAddingNotice;
  }
}
