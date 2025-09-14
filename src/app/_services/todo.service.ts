import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import {
  ToDoItem,
  CreateToDoItemRequest,
  UpdateToDoItemRequest,
} from '../_models/todo-item.model';
import { Guid } from '../_models/guid.model';
import { PaginatedResponse } from '../_models/response.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = `${environment.apiUrl}/ToDoItem`;

  constructor(private http: HttpClient) {}

  getAll(
    page: number = 1,
    pageSize: number = 20
  ): Observable<PaginatedResponse<ToDoItem>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PaginatedResponse<ToDoItem>>(this.apiUrl, { params });
  }

  getById(id: Guid): Observable<ToDoItem> {
    return this.http.get<ToDoItem>(`${this.apiUrl}/${id}`);
  }

  create(todo: CreateToDoItemRequest): Observable<ToDoItem> {
    return this.http.post<ToDoItem>(this.apiUrl, todo);
  }

  update(id: Guid, todo: UpdateToDoItemRequest): Observable<ToDoItem> {
    return this.http.put<ToDoItem>(`${this.apiUrl}/${id}`, todo);
  }

  delete(id: Guid): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  markAsComplete(todoId: Guid, userId?: Guid): Observable<ToDoItem> {
    const url = userId
      ? `${this.apiUrl}/${todoId}/complete?userId=${userId}`
      : `${this.apiUrl}/${todoId}/complete`;

    return this.http.patch<ToDoItem>(url, {});
  }

  getByUserId(
    userId: Guid,
    page: number = 1,
    pageSize: number = 20
  ): Observable<PaginatedResponse<ToDoItem>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PaginatedResponse<ToDoItem>>(
      `${this.apiUrl}/user/${userId}`,
      { params }
    );
  }
}
