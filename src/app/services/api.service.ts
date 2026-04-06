import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000'; // Make sure the backend port matches Note: the backend is on PORT 5000 as per server.ts

  constructor(private http: HttpClient) { }

  admission(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/registration`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  addClass(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/class/add-class`, data);
  }

  updateClass(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/class/update-class/${id}`, data);
  }

  getClasses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/class/all-classes`);
  }

  getStudents(params: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/students-list`, { params });
  }

  getStudentDetails(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/student-details/${id}`);
  }

  getTeachers(params: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/teachers-list`, { params });
  }

  updateTeacher(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/update-teacher/${id}`, data);
  }

  addNotice(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/notice/add-notice`, data);
  }

  getAllNotices(): Observable<any> {
    return this.http.get(`${this.baseUrl}/notice/all-notices`);
  }

  deleteNotice(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/notice/delete-notice/${id}`);
  }

  markNoticeAsRead(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/notice/read-notice/${id}`, {});
  }

  saveTimetable(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/timetable/save-timetable`, data);
  }

  getTimetable(classId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/timetable/class-timetable/${classId}`);
  }

  deleteTimetable(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/timetable/delete-timetable/${id}`);
  }

  copyDayTimetable(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/timetable/copy-day`, data);
  }
}


