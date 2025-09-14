import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      // Adicione headers de autenticação se necessário
    });
  }

  // Exemplo para Tasks (ajuste conforme seus endpoints)
  getTasks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks`, {
      headers: this.getHeaders(),
    });
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks/${id}`, {
      headers: this.getHeaders(),
    });
  }

  createTask(task: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks`, task, {
      headers: this.getHeaders(),
    });
  }

  updateTask(id: number, task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/tasks/${id}`, task, {
      headers: this.getHeaders(),
    });
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tasks/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
