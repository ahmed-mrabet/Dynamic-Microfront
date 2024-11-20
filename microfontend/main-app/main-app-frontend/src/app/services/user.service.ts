import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:100/users';

  constructor(private http: HttpClient) { }

  getUsers():Observable<any>{
    return this.http.get<any>(this.baseUrl);
  }
  removeUserById(userId: string): Observable<void> {
    const url = `${this.baseUrl}/${userId}`;
    return this.http.delete<void>(url);
  }
}
