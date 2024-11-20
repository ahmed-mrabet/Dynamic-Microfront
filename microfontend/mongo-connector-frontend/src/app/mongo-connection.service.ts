import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';
import config from '../../config.json';

@Injectable({
  providedIn: 'root'
})

export class MongoConnectionService {
  // @ts-ignore
  ApiUrl:any = config.ApiUrl;
  private baseUrl = this.ApiUrl;

  constructor(private http: HttpClient) {}

  connectDatabase(requestPayload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/connect`, requestPayload);
  }

  fetchData(pageNumber?: string, pageSize?: string, tableName?: string): Observable<any> {
    let params = new HttpParams();

    if (pageNumber) {
      params = params.set('pageNumber', pageNumber);
    }
    if (pageSize) {
      params = params.set('pageSize', pageSize);
    }
    if (tableName) {
      params = params.set('tableName', tableName);
    }

    return this.http.get(`${this.baseUrl}/tables`, { params });
  }
}
