import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000'; // Make sure the backend port matches Note: the backend is on PORT 5000 as per server.ts

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
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
}
